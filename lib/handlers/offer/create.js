const log = require('../../logger')

const LoanModel = require('../../models/loan.table')
const CompanyModel = require('../../models/company.table')
const PayloadModel = require('../../models/create.payload')
const OpenKVKClient = require('../../api/openKvk')

const { send, error } = require('../../utils/response')
const { parseWith } = require('../../utils/request')

module.exports.handler = async event => {
    const parseJson = parseWith(JSON.parse)
    const input = parseJson(event.pathParameters)
    const { value: validPayload, error: validationError } = PayloadModel.validate(input)

    if (validationError) {
        return error(validationError)
    }

    const { amount, companyId } = validPayload
    let company

    try {
        company = await OpenKVKClient.getById(companyId)
        if (!company.actief) {
            log.warn(`company ${companyId} is inactive`)
            return error('company is not suitable for a loan')
        }
    } catch (openKvkClientError) {
        log.error(`impossible to retrieve company information for ${companyId}`, openKvkClientError)
        return error(openKvkClientError)
    }

    try {
        const loanTable = await LoanModel.initTable()
        const companyTable = await CompanyModel.initTable()
        const createdLoan = await loanTable({ amount }, 'create')
        const loanId = createdLoan.attrs.id

        companyTable(
            Object.assign(
                {
                    loanId,
                },
                company
            ),
            'create'
        )
        log.info('Loan created for company', { loanId, company: company.handelsnaam })
        return send(createdLoan)
    } catch (err) {
        log.error('loan creation failed', err)
        return error(err)
    }
}

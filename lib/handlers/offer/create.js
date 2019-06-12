const LoanModel = require('../../models/loan.table')
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
    let companyActive = false

    try {
        companyActive = await OpenKVKClient.isActive(companyId)
    } catch (openKvkClientError) {
        return error(openKvkClientError)
    }

    try {
        if (companyActive) {
            const loan = await LoanModel.initTable()
            const createdLoan = await loan({ amount }, 'create')
            return send(createdLoan)
        }
        return error('company is not suitable for a loan')
    } catch (err) {
        return error(err)
    }
}

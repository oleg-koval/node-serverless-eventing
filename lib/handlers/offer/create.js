const LoanModel = require('../../models/loan.table')
const PayloadModel = require('../../models/create.payload')

const { send, error } = require('../../utils/response')
const { parseWith } = require('../../utils/request')

module.exports.handler = async event => {
    const parseJson = parseWith(JSON.parse)
    const input = parseJson(event.pathParameters)
    const { value: validPayload, error: validationError } = PayloadModel.validate(input)

    if (validationError) {
        return error(validationError)
    }

    const { amount } = validPayload

    try {
        const loan = await LoanModel.initTable()
        const createdLoan = await loan({ amount }, 'create')
        return send(createdLoan)
    } catch (err) {
        return error(err)
    }
}

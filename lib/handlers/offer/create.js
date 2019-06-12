const LoanModel = require('../../models/loan')
const { send, error } = require('../../utils/response')
const { parseWith } = require('../../utils/request')

module.exports.handler = async event => {
    const parseJson = parseWith(JSON.parse)
    const input = parseJson(event.pathParameters)

    try {
        const loan = await LoanModel.initTable()
        const createdLoan = await loan(input, 'create')
        return send(createdLoan)
    } catch (err) {
        return error(err)
    }
}

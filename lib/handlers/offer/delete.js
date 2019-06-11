const LoanModel = require('../../models/loan')
const { send } = require('../../utils/response')
const { parseWith } = require('../../utils/request')

module.exports.handler = async event => {
    const parseJson = parseWith(JSON.parse)
    const { id } = parseJson(event.pathParameters)

    const loan = await LoanModel()
    loan(id, 'destroy')
    return send()
}

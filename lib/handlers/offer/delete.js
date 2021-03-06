const LoanModel = require('../../models/loan.table')
const { send } = require('../../utils/response')
const { parseWith } = require('../../utils/request')

module.exports.handler = async event => {
    const parseJson = parseWith(JSON.parse)
    const { id } = parseJson(event.pathParameters)

    const loan = await LoanModel.initTable()
    loan(id, 'destroy')
    return send()
}

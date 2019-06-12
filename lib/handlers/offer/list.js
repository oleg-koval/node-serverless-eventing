const { promisify } = require('util')

const { Loan } = require('../../models/loan.table')
const findAll = promisify(Loan.findAll)
const { send, error } = require('../../utils/response')

module.exports.handler = async () => {
    try {
        const { Items } = await findAll()
        return send(Items.length ? Items : [])
    } catch (err) {
        return error(err)
    }
}

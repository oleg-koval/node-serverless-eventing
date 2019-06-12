const Joi = require('joi')
const dynamo = require('dynamodb')

const { asyncWrapper, asyncCreateTables } = require('../utils/dynamo')
const config = require('../config')()

dynamo.log.level(process.env.DYNAMO_LOG_LEVEL)

dynamo.AWS.config.update({
    region: config.dynamo.region,
    endpoint: config.dynamo.endpoint,
})

const Loan = dynamo.define(
    'Loan',
    Object.assign(
        {
            hashKey: 'id',
            timestamps: true,
        },
        {
            schema: {
                id: dynamo.types.uuid(),
                amount: Joi.number().required(),
                status: Joi.string()
                    .default(config.constants.offered)
                    .allow(config.constants.offered, config.constants.disbursed),
            },
        }
    )
)

Loan.findAll = cb => {
    Loan.scan()
        .loadAll()
        .exec((err, data) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, data)
        })
}

/**
 * Defines Loan model with validation
 * Creates Loan table in DynamoDb
 * TODO: split/keep creation and define separately
 * @returns {object} - Loan model
 */
const initTable = async () => {
    const model = asyncWrapper(Loan)

    try {
        await asyncCreateTables(dynamo)
    } catch (err) {
        throw new Error(err)
    }

    return model
}

module.exports = {
    initTable,
    Loan,
}

const Joi = require('joi')
const dynamo = require('dynamodb')

const { asyncWrapper, asyncCreateTables } = require('../utils/dynamo')
const config = require('../config')()

dynamo.log.level(process.env.DYNAMO_LOG_LEVEL)

dynamo.AWS.config.update({
    region: config.dynamo.region,
    endpoint: config.dynamo.endpoint,
})

const Company = dynamo.define(
    'Company',
    Object.assign(
        {
            hashKey: 'id',
            timestamps: true,
        },
        {
            schema: Joi.object()
                .keys({
                    id: dynamo.types.uuid(),
                    loanId: Joi.string()
                        .guid()
                        .required(),
                    actief: Joi.boolean().invalid(false),
                })
                .unknown(true),
        }
    )
)

/**
 * Defines Loan model with validation
 * Creates Loan table in DynamoDb
 * TODO: split/keep creation and define separately
 * @returns {object} - Loan model
 */
const initTable = async () => {
    const model = asyncWrapper(Company)

    try {
        await asyncCreateTables(dynamo)
    } catch (err) {
        throw new Error(err)
    }

    return model
}

module.exports = {
    initTable,
    Company,
}

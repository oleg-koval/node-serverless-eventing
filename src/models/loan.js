const Joi = require('joi')
const dynamo = require('dynamodb')

const { asyncWrapper, asyncCreateTables } = require('../utils/dynamo')
const config = require('../config')()

dynamo.AWS.config.update({
    region: config.dynamo.region,
    endpoint: config.dynamo.endpoint,
})

/**
 * Defines Loan model with validation
 * Creates Loan table in DynamoDb
 * TODO: split/keep creation and define separately
 * @returns {object} - Loan model
 */
module.exports = async () => {
    const model = asyncWrapper(
        dynamo.define(
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
    )

    try {
        await asyncCreateTables(dynamo)
    } catch (err) {
        throw new Error(err)
    }

    return model
}

const OFFERED = 'offered'
const DISBURSED = 'disbursed'

module.exports.function1 = async event => {
    var dynamo = require('dynamodb')
    var Joi = require('joi')

    try {
        dynamo.AWS.config.update({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })

        var Loan = dynamo.define('Loan', {
            hashKey: 'id',
            timestamps: true,
            schema: {
                id: dynamo.types.uuid(),
                amount: Joi.number().required(),
                status: Joi.bool(),
            },
        })

        await new Promise((resolve, reject) => {
            dynamo.createTables(err => (err ? reject(err) : resolve()))
        })

        const { amount } = event.pathParameters
        return await new Promise((resolve, reject) => {
            Loan.create({ amount, status: OFFERED }, function(err, loan) {
                err && reject(err)

                resolve({
                    statusCode: 200,
                    body: JSON.stringify(loan),
                })
            })
        })
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}

module.exports.function2 = async event => {
    var dynamo = require('dynamodb')
    var Joi = require('joi')

    try {
        dynamo.AWS.config.update({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })

        var Loan = dynamo.define('Loan', {
            hashKey: 'id',
            timestamps: true,
            schema: {
                id: dynamo.types.uuid(),
                amount: Joi.number().required(),
                status: Joi.bool(),
            },
        })

        const { id } = event.pathParameters

        return await new Promise((resolve, reject) => {
            Loan.destroy(id, { ReturnValues: 'ALL_OLD' }, function(err, loan) {
                console.log('deleted', loan)
                console.error(err)

                if (!err) {
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(loan),
                    })
                } else {
                    resolve({
                        statusCode: 404,
                        body: 'Loan not found',
                    })
                }
            })
        })
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}

module.exports.function3 = async event => {
    var dynamo = require('dynamodb')
    var Joi = require('joi')

    try {
        dynamo.AWS.config.update({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })

        var Loan = dynamo.define('Loan', {
            hashKey: 'id',
            timestamps: true,
            schema: {
                id: dynamo.types.uuid(),
                amount: Joi.number().required(),
                status: Joi.bool(),
            },
        })

        let loans = await new Promise((resolve, reject) => {
            Loan.scan()
                .loadAll()
                .exec((err, loans) => {
                    return err ? reject(err) : resolve(loans.Items)
                })
        })

        return {
            statusCode: 200,
            body: JSON.stringify(loans),
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}

module.exports.function4 = async () => {
    return {
        statusCode: 501,
        body: 'Not Implemented',
    }
}

module.exports.function6 = async () => {
    // I'll make sure the status is set to disbursed given a LoanDisbursed event
}

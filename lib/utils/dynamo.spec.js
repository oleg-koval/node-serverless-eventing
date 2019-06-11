const dynamo = require('./dynamo')

describe('dynamo', () => {
    it('asyncWrapper', async () => {
        const input = { a: 1 }
        const model = {
            create: jest.fn(async data => {
                expect(data).toMatchObject(input)
            }),
        }
        const testModel = dynamo.asyncWrapper(model)
        await testModel(input, 'create')
    })
    it('asyncCreateTables', async () => {
        const dynamoDb = {
            createTables: jest.fn(async () => {}),
        }
        await dynamo.asyncCreateTables(dynamoDb)
        expect(dynamoDb.createTables).toBeCalled()
    })
})

jest.mock('../../models/loan')
const { handler } = require('./create')

const LoanModel = require('../../models/loan')

const internal = {
    init: LoanModel.initTable,
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe('create.handler', async () => {
    it('Should create a loan, correct amount', async () => {
        const resp = {
            amount: 1,
            createdAt: '2019-06-07T21:11:07.751Z',
            id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            status: 'offered',
        }

        internal.init.mockImplementation(async () => () => resp)

        const event = {
            pathParameters: {
                amount: 1,
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })

    it('Should not create a loan, incorrect amount', async () => {
        const event = {
            pathParameters: {
                amount: 'not-a-number-input',
            },
        }

        internal.init.mockImplementation(async () => () => {
            throw 'dynamo error'
        })

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })
})

jest.mock('../../models/loan')
const { handler } = require('./delete')

const LoanModel = require('../../models/loan')

const internal = {
    init: LoanModel,
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe('delete.handler', async () => {
    it('Should remove a loan', async () => {
        internal.init.mockImplementation(async () => () => {})

        const event = {
            pathParameters: {
                id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })
})

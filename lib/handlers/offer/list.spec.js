jest.mock('../../models/loan')

const { handler } = require('./list')
const LoanModel = require('../../models/loan')

beforeEach(() => {
    jest.resetAllMocks()
})

describe('list.handler', async () => {
    it('Should list loans', async () => {
        LoanModel.Loan.findAll.mockImplementation(cb => {
            cb(null, {
                Items: [
                    {
                        createdAt: '2019-06-12T00:11:44.898Z',
                        amount: 333,
                        id: '052258d8-670b-40b7-8658-82a9855b412a',
                        status: 'offered',
                    },
                    {
                        createdAt: '2019-06-12T00:11:02.473Z',
                        amount: 333,
                        id: 'f3f2beb4-c9f7-4329-8f71-faea34073d14',
                        status: 'offered',
                    },
                ],
            })
        })

        const result = await handler()
        expect(result).toMatchSnapshot()
    })
    it('Return error', async () => {
        LoanModel.Loan.findAll.mockImplementation(cb => {
            cb(new Error('problem with dynamo'))
        })

        const result = await handler()
        expect(result).toMatchSnapshot()
    })
    it('Return empty result', async () => {
        LoanModel.Loan.findAll.mockImplementation(cb => {
            cb(null, { Items: [] })
        })

        const result = await handler()
        expect(result).toMatchSnapshot()
    })
})

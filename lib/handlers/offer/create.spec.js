jest.mock('../../models/loan.table')
jest.mock('../../api/openKvk')
const { handler } = require('./create')

const LoanModel = require('../../models/loan.table')
const OpenKVKClient = require('../../api/openKvk')

const internal = {
    init: LoanModel.initTable,
}

const external = {
    isActive: OpenKVKClient.isActive,
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe('create.handler', async () => {
    const companyId = 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv'
    it('Should create a loan, correct amount', async () => {
        const resp = {
            amount: 1,
            createdAt: '2019-06-07T21:11:07.751Z',
            id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            status: 'offered',
        }

        internal.init.mockImplementation(async () => () => resp)
        external.isActive.mockImplementation(async payload => {
            expect(payload).toEqual(companyId)
            return true
        })

        const event = {
            pathParameters: {
                amount: 1,
                companyId,
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })
    it('Should not create a loan, company is not active', async () => {
        const resp = {
            amount: 1,
            createdAt: '2019-06-07T21:11:07.751Z',
            id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            status: 'offered',
        }

        internal.init.mockImplementation(async () => () => resp)
        external.isActive.mockImplementation(async payload => {
            expect(payload).toEqual(companyId)
            return false
        })

        const event = {
            pathParameters: {
                amount: 1,
                companyId,
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })

    it('Should not create a loan, error from openKvk', async () => {
        const resp = {
            amount: 1,
            createdAt: '2019-06-07T21:11:07.751Z',
            id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            status: 'offered',
        }

        internal.init.mockImplementation(async () => () => resp)
        external.isActive.mockImplementation(async payload => {
            expect(payload).toEqual(companyId)
            throw new Error('openKvk problem')
        })

        const event = {
            pathParameters: {
                amount: 1,
                companyId,
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })

    it('Should pass validation, throws error on dynamodb', async () => {
        internal.init.mockImplementation(async () => () => {
            throw new Error('db error')
        })
        external.isActive.mockImplementation(async payload => {
            expect(payload).toEqual(companyId)
            return true
        })

        const event = {
            pathParameters: {
                amount: 1,
                companyId: 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv',
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })

    it('Should not create a loan, incorrect amount, missing companyId', async () => {
        const event = {
            pathParameters: {
                amount: 'not-a-number-input',
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })

    it('Should not create a loan, incorrect amount, missing companyId', async () => {
        const event = {
            pathParameters: {
                amount: 1,
                companyId: 1,
            },
        }

        const result = await handler(event)
        expect(result).toMatchSnapshot()
    })
})

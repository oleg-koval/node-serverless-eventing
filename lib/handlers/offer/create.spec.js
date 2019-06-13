jest.mock('../../models/loan.table')
jest.mock('../../models/company.table')
jest.mock('../../api/openKvk')
const { handler } = require('./create')

const LoanModel = require('../../models/loan.table')
const CompanyModel = require('../../models/company.table')
const OpenKVKClient = require('../../api/openKvk')

const internal = {
    initLoan: LoanModel.initTable,
    initCompany: CompanyModel.initTable,
}

const external = {
    getById: OpenKVKClient.getById,
}

beforeEach(() => {
    jest.resetAllMocks()
})

describe('create.handler', async () => {
    const companyId = 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv'
    it('Should create a loan, correct amount', async () => {
        __initLoanMock()
        __initCompanyMock()
        __getByIdMock(companyId)

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
        __getByIdMock(companyId, false)

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
        __getByIdErrorMock(companyId)

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
        internal.initLoan.mockImplementation(async () => () => {
            throw new Error('db error')
        })
        __getByIdMock(companyId)

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

function __initLoanMock() {
    internal.initLoan.mockImplementation(async () => () => ({
        attrs: {
            amount: 1,
            createdAt: '2019-06-07T21:11:07.751Z',
            id: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            status: 'offered',
        },
    }))
}

function __initCompanyMock() {
    internal.initCompany.mockImplementation(async () => () => ({
        attrs: {
            actief: true,
            createdAt: '2019-06-07T21:11:07.751Z',
            handelsnaam: 'test name',
            loanId: 'b0667a9d-fa09-473e-87a5-f5753983b840',
            id: 'a0667a9d-fa09-473e-87a5-f5753983b841',
        },
    }))
}

function __getByIdMock(companyId, actief = true) {
    external.getById.mockImplementation(async payload => {
        expect(payload).toEqual(companyId)
        return {
            actief,
            handelsnaam: 'test name',
        }
    })
}

function __getByIdErrorMock(companyId) {
    external.getById.mockImplementation(async payload => {
        expect(payload).toEqual(companyId)
        throw new Error('openKvk problem')
    })
}

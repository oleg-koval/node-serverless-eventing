jest.mock('./config')
jest.mock('request-promised')

const request = require('request-promised')
const isActive = require('./company')
const { getApiParams } = require('./config')

describe('Checks if company is active', () => {
    it('should return true if company is active', async () => {
        getApiParams.mockReturnValue({
            headers: {
                'ovio-api-key': 'secret',
            },
            json: true,
            uri: 'https://example.com/42',
        })
        const fixtureResponse = {
            body: {
                actief: true,
            },
        }
        request.get.mockReturnValue(fixtureResponse)

        const result = await isActive('42')
        expect(result).toBeTruthy()
    })

    it('should return error if body is not valid', async () => {
        getApiParams.mockReturnValue({
            headers: {
                'ovio-api-key': 'secret',
            },
            json: true,
            uri: 'https://example.com/42',
        })
        const fixtureResponse = {
            body: undefined,
        }
        request.get.mockReturnValue(fixtureResponse)

        try {
            await isActive('42')
        } catch (error) {
            expect(error).toMatchSnapshot()
        }
    })

    it('should return error if missing active information', async () => {
        getApiParams.mockReturnValue({
            headers: {
                'ovio-api-key': 'secret',
            },
            json: true,
            uri: 'https://example.com/42',
        })
        const fixtureResponse = {
            body: {
                test: 1,
            },
        }
        request.get.mockReturnValue(fixtureResponse)

        try {
            await isActive('42')
        } catch (error) {
            expect(error).toMatchSnapshot()
        }
    })
})

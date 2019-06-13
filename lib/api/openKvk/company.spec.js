jest.mock('./config')
jest.mock('request-promised')

const request = require('request-promised')
const getById = require('./company')
const { getApiParams } = require('./config')

describe('Checks if company is active', () => {
    it('should call openKvk and return company', async () => {
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
                handelsnaam: 'test company',
            },
        }
        request.get.mockReturnValue(fixtureResponse)

        const result = await getById('42')
        expect(result).toMatchSnapshot()
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
            await getById('42')
        } catch (error) {
            expect(error).toMatchSnapshot()
        }
    })
})

jest.mock('./openKvk')
jest.mock('request-promised')

const request = require('request-promised')
const { getById } = require('./company')
const { getApiParams } = require('./openKvk')

describe.skip('Get company info by id api call', () => {
    it('should get company details by id', async () => {
        getApiParams.mockReturnValue({
            headers: {
                'ovio-api-key': 'secret',
            },
            json: true,
            uri: 'https://example.com/42',
        })
        const fixtureResponse = {
            headers: {
                accept: 'application/json',
                host: 'api.overheid.io',
                'ovio-api-key': '839b42dc7512d64aa8b5c2896353b34b9e4dff65fb5df71a9ccae30edf7cec00',
            },
            method: 'GET',
            uri: {
                auth: null,
                hash: null,
                host: 'api.overheid.io',
                hostname: 'api.overheid.io',
                href: 'https://api.overheid.io/openkvk/42',
                path: '/openkvk/42',
                pathname: '/openkvk/42',
                port: 443,
                protocol: 'https:',
                query: null,
                search: null,
                slashes: true,
            },
        }
        request.mockReturnValue(fixtureResponse)

        const client = getById('42')
        const result = await client()
        expect(result).toMatchSnapshot()
    })
})

const config = require('./')

const OLD_ENV = process.env

beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
})

afterEach(() => {
    process.env = OLD_ENV
})

describe('Gets configuration based on environment', () => {
    it('should get configuration for development env', () => {
        process.env.NODE_ENV = 'development'
        const result = config()

        expect(result).toMatchSnapshot()
    })
})

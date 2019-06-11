const config = require('./')

afterEach(() => {
    process.env.NODE_ENV = 'development'
})
describe('Gets configuration based on environment', () => {
    it('should get configuration for development env', () => {
        const result = config()

        expect(result).toMatchSnapshot()
    })
})

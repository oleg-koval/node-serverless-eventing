const config = require('./')

describe('Gets configuration based on environment', () => {
    it('should get configuration for development env', () => {
        process.env.NODE_ENV = 'development'
        const result = config()

        expect(result).toMatchSnapshot()
    })
})

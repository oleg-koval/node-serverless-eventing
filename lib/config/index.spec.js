const config = require('./')

describe('Gets configuration based on environment', () => {
    it('should get configuration for test env', () => {
        process.env.NODE_ENV = 'test'
        const result = config()

        expect(result).toMatchSnapshot()
    })
})

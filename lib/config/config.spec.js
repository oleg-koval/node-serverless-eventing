const config = require('./config')

describe('Gets configuration based on environment', () => {
    it('should get configuration for development env', () => {
        const result = config('development')

        expect(result).toMatchSnapshot()
    })
    it('should throw an error if env missing', () => {
        expect(() => config(undefined)).toThrowErrorMatchingSnapshot()
    })
})

const { parseWith } = require('./request')

describe('request data parser', () => {
    describe('with the parser', () => {
        const req = parseWith(JSON.parse)
        it('should work', () => {
            expect(
                req({
                    a: 1,
                })
            ).toMatchSnapshot()
        })
        it('no data', () => {
            expect(() => req()).toThrowErrorMatchingSnapshot()
        })
        it('valid JSON string', () => {
            expect(req('{"a": 1}')).toMatchSnapshot()
        })
    })

    describe('without the parser', () => {
        it('should throw an error', () => {
            expect(() => parseWith()('{"a": 1}')).toThrowErrorMatchingSnapshot()
        })
    })
})

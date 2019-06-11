const response = require('./response')

describe('respondWith', () => {
    it('with the parser', () => {
        expect(response.respondWith(200, { a: 1 })).toMatchSnapshot()
    })
    it('returns error if wrong status code', () => {
        expect(() => response.respondWith(99, { a: 1 })).toThrowErrorMatchingSnapshot()
    })
    it('w/o data', () => {
        expect(response.respondWith(200)).toMatchSnapshot()
    })
})

describe('send', () => {
    it('should return a response', () => {
        expect(response.send({ a: 1 })).toMatchSnapshot()
    })
})

describe('serverError', () => {
    it('should return a response', () => {
        expect(response.serverError({ a: 1 })).toMatchSnapshot()
    })
})

describe('error', () => {
    it('should return an error response', () => {
        expect(response.error({ a: 1 })).toMatchSnapshot()
    })
    it('should return a validation response', () => {
        expect(response.error({ isJoi: true, details: [{ message: 'test' }] })).toMatchSnapshot()
    })
})

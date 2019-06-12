const { getApiParams } = require('./openKvk')

describe('getApiParams', () => {
    it('should collect all params into one object', () => {
        const res = getApiParams('42')
        expect(res).toMatchSnapshot()
    })
})

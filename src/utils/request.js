const parseWith = parser => data => {
    if (!parser) {
        throw new Error('parser missing')
    }

    if (!data) {
        throw new Error('data missing')
    }

    if (typeof data === 'object') {
        return data
    }

    return parser(data)
}

module.exports = {
    parseWith,
}

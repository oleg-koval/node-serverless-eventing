const DEFAULT_HEADERS = {}

const respondWith = (statusCode, data, headers = {}) => {
    if (100 > statusCode || statusCode > 599) {
        throw new Error('status code out of range')
    }

    const response = {
        statusCode,
        headers: Object.assign(DEFAULT_HEADERS, headers),
    }

    if (data) {
        return Object.assign(response, {
            body: data,
        })
    }

    return JSON.stringify(response)
}

const send = data => respondWith(200, data)

const error = data => {
    if (!data.isJoi) {
        return respondWith(400, data)
    }

    return respondWith(400, {
        validationErrors: data.details.map(detail => ({
            message: detail.message,
        })),
    })
}

const serverError = data => respondWith(500, data)

module.exports = {
    send,
    error,
    serverError,
    respondWith,
}

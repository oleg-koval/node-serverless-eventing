const request = require('request-promised')

const { getApiParams } = require('./config')

/**
 * Checks if company is active
 * https://overheid.io/documentatie/openkvk#show
 * @param {string} id companyId
 * @returns {promise}
 */
const getById = async id => {
    const companyData = getApiParams(id)
    const { body } = await request.get(companyData)
    if (typeof body !== 'object') {
        throw new Error('no response from openKvk')
    }

    return body
}

module.exports = getById

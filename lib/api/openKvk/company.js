const request = require('request-promised')

const { getApiParams } = require('./config')

const ACTIVE = 'actief' // consistency: better to use english language

/**
 * Checks if company is active
 * https://overheid.io/documentatie/openkvk#show
 * @param {string} id companyId
 * @returns {promise}
 */
const isActive = async id => {
    const companyData = getApiParams(id)
    const { body } = await request.get(companyData)
    if (typeof body !== 'object') {
        throw new Error('no response from openKvk')
    }

    if (!body[ACTIVE] && body[ACTIVE] !== Boolean) {
        throw new Error('missing activity information')
    }

    return body[ACTIVE]
}

module.exports = isActive

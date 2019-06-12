const request = require('request-promised')

const { getApiParams } = require('./config')

/**
 * Gets company by id
 * https://overheid.io/documentatie/openkvk#show
 * @param {string} id companyId
 * @returns {promise}
 */
const getById = id => async () => {
    const companyData = getApiParams(id)
    return request(companyData)
}

module.exports = {
    getById,
}

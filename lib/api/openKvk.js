const config = require('../config')()

const openKvkConfiguration = config.api.openKvk

/**
 * Creates configuration for request promise to get openKvk company by id
 * @param {string} id
 * @returns {object}
 */
const getApiParams = id => ({
    uri: `${openKvkConfiguration.endpoint}/${id}`,
    headers: {
        [`${openKvkConfiguration.headerName}`]: openKvkConfiguration.apiKey,
    },
    json: true,
})

module.exports = {
    getApiParams,
}

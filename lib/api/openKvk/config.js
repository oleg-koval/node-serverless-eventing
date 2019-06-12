const config = require('../../config')()

const openKvkConfiguration = config.api.openKvk
const { endpoint, headerName, apiKey } = openKvkConfiguration

/**
 * Creates configuration for request promise to get openKvk company by id
 * @param {string} id
 * @returns {object}
 */
const getApiParams = id => ({
    uri: `${endpoint}/${id}`,
    headers: {
        [`${headerName}`]: apiKey,
    },
    json: true,
})

module.exports = {
    getApiParams,
}

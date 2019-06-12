const configuration = {
    constants: {
        offered: 'offered',
        disbursed: 'disbursed',
    },
    development: {
        dynamo: {
            region: process.env.AWS_REGION,
            endpoint: process.env.AWS_ENDPOINT,
        },
        api: {
            openKvk: {
                endpoint: process.env.OPEN_KVK_ENDPOINT,
                headerName: process.env.OPEN_KVK_HEADER_NAME,
                apiKey: process.env.OPEN_KVK_API_KEY,
            },
        },
    },
    test: {
        dynamo: {
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        },
        api: {
            openKvk: {
                endpoint: 'https://api.overheid.io/openkvk',
                headerName: 'ovio-api-key',
                apiKey: 'secret',
            },
        },
    },
}

/**
 * Gets configuration based on environment
 * @param {string} nodeEnv - String
 * @returns {object}
 */
const getConfig = nodeEnv => {
    if (!nodeEnv) {
        throw new Error('missing environment name')
    }
    return {
        constants: configuration.constants,
        // api: configuration.api,
        ...configuration[nodeEnv],
    }
}

module.exports = getConfig

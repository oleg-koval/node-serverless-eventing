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
        ...configuration[nodeEnv],
    }
}

module.exports = getConfig

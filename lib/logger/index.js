const log = require('lambda-log')

log.options.dynamicMeta = () => {
    return {
        timestamp: new Date().toISOString(),
    }
}

if (process.env.NODE_ENV === 'development') {
    log.options.dev = true
}

if (process.env.NODE_ENV === 'test') {
    log.options.silent = true
}

module.exports = log

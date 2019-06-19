const logger = console

const broker = require('./broker')

broker.start().catch(err => {
    logger.error(err)
})

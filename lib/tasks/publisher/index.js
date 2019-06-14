const broker = require('./broker')
const logger = console

broker.start().catch(err => {
    logger.error(err)
})

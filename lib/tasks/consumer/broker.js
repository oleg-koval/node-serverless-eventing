const amqp = require('amqplib')
const logger = console

module.exports.start = async () => {
    const connection = await amqp.connect(process.env.MESSAGE_QUEUE)

    const channel = await connection.createChannel()
    await channel.assertQueue('tasks', { durable: true })
    await channel.prefetch(1)

    logger.log('Waiting tasks...')

    channel.consume('tasks', async message => {
        const content = message.content.toString()
        const task = JSON.parse(content)

        channel.ack(message)

        logger.info(`${task.message} received!`)
    })
}

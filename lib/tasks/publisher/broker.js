const amqp = require('amqplib')
const logger = console

module.exports.start = async () => {
    const connection = await amqp.connect('amqp://guest:guest@localhost/')
    // const connection = await amqp.connect(process.env.MESSAGE_QUEUE)

    const channel = await connection.createChannel()
    await channel.assertQueue('tasks', { durable: true })

    Array(10)
        .fill()
        .map(async (x, y) => {
            const task = { message: `Task ${y}` }

            await channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
                contentType: 'application/json',
                persistent: true,
            })

            logger.log(`Task ${y} sent!`)
        })

    const task = { message: `Task outsider` }

    await channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
        contentType: 'application/json',
        persistent: true,
    })

    logger.log(`Task ${task} sent!`)
}

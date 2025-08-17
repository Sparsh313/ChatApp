import amqp from "amqplib";
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RabbitMQ_Hostname,
            port: 5672,
            username: process.env.RabbitMQ_Username,
            password: process.env.RabbitMQ_Password,
        });
        channel = await connection.createChannel();
        console.log("RabbitMQ Connected🐰");
    }
    catch (error) {
        console.log("Failed to connect to RabbitMQ", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("RabbitMQ channel not initialized");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
//# sourceMappingURL=rabbitmq.js.map
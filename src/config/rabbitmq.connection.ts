import amqp from "amqplib";

export const RabbitMQConnection = async (url: string): Promise<amqp.Channel> => {
    let connection = null;
    let ATTEMPT = 0;
    let RETRIES = 10;
    let DELAY = 5000;
    
    while (!connection) {
        try {
            connection = await amqp.connect(url);
            console.log("Connected to rabbitmq");
        } catch (err) {
            console.log(err);
            
            console.log(
                `Failed to connect to rabbitmq retry in 5s => ${ATTEMPT}th attempt`
            );
            ATTEMPT += 1;
            if (ATTEMPT > RETRIES) {
                throw new Error(
                    "Failed to connect to RabbitMQ after multiple attempts"
                );
            }
            await new Promise((res) => setTimeout(res, DELAY));
        }
    }
    
    return await connection.createChannel();
};
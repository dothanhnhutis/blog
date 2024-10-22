import amqplib, { type Connection } from "amqplib";
let connection: Connection;

async function connect(url: string) {
  try {
    connection = await amqplib.connect(url);
    process.once("SIGINT", async () => {
      await connection.close();
    });
  } catch (error: unknown) {
    throw new Error(`Connection to the RabbitMQ cluster failed: ${error}`);
  }
}

type sendQuereOtp = {
  confirmChannel: boolean;
  prefetch: boolean;
};

async function sendQuere(
  queueName: string,
  msg: string,
  option?: Partial<sendQuereOtp>
) {
  const opt: sendQuereOtp = {
    confirmChannel: false,
    prefetch: false,
  };
  if (!connection) {
    throw new Error("Connection to the RabbitMQ cluster failed");
  }
  try {
    const channel = opt.confirmChannel
      ? await connection.createConfirmChannel()
      : await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(msg), {
      persistent: true,
    });
  } catch (error: unknown) {}
}

export default { connect };

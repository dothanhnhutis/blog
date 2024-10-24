import amqplib, { type Connection } from "amqplib";
let conn: Connection;

async function connect(url: string) {
  try {
    conn = await amqplib.connect(url);
    process.once("SIGINT", async () => {
      await conn.close();
    });
  } catch (error: unknown) {
    throw new Error(`Connection to the RabbitMQ cluster failed: ${error}`);
  }
}

function createChannel() {
  if (!conn) throw new Error("Create to the RabbitMQ cluster failed");
  return conn.createChannel();
}

async function sendTest() {
  const channel = await createChannel();
  const mainQueue = "main_queue";
  await channel.assertQueue(mainQueue, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": "dead_letter_exchange", // Cấu hình DLX cho main_queue
      "x-dead-letter-routing-key": "dead", // Đặt routing key cho DLX
      "x-message-ttl": 10000, // TTL của tin nhắn (10 giây)
    },
  });
  const message = "This is a test message";

  channel.sendToQueue(mainQueue, Buffer.from(message));
  // setTimeout(() => {
  await channel.close();
  // }, 2000);
}

async function consumeTest() {
  const channel = await createChannel();
  const mainQueue = "main_queue";

  const dlxExchange = "dead_letter_exchange";
  const dlQueue = "dead_letter_queue";

  await channel.assertExchange(dlxExchange, "direct", { durable: true });
  await channel.assertQueue(dlQueue, { durable: true });

  // 3. Bind Dead Letter Queue với Dead Letter Exchange
  await channel.bindQueue(dlQueue, dlxExchange, "dead");

  // Nhận tin nhắn từ hàng đợi chính và từ chối để gửi đến DLX
  await channel.assertQueue(mainQueue, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": dlxExchange, // Cấu hình DLX cho main_queue
      "x-dead-letter-routing-key": "dead", // Đặt routing key cho DLX
      "x-message-ttl": 10000, // TTL của tin nhắn (10 giây)
    },
  });

  await channel.consume(
    mainQueue,
    (msg) => {
      if (msg !== null) {
        console.log(
          "Message received from main queue, rejecting to send to DLX"
        );
        setTimeout(() => {
          channel.reject(msg, false); // Từ chối tin nhắn và không requeue, nó sẽ được gửi đến DLX
        }, 10000);
        // setTimeout(() => {
        //   console.log("ack");
        //   channel.ack(msg);
        // }, 2000);
      }
    },
    {
      noAck: false,
    }
  );

  // 6. Nhận tin nhắn từ Dead Letter Queue
  await channel.consume(dlQueue, (msg) => {
    if (msg !== null) {
      console.log(`Message received from DLX: ${msg.content.toString()}`);
      // channel.ack(msg);
    }
  });
}

export default { connect, createChannel, consumeTest, sendTest };

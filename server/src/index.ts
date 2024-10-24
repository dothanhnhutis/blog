import http from "http";
import app from "@/app";
import { initRedis } from "./redis/connection";
import configs from "./configs";
import mq from "./utils/rabbit";
// import { Server } from "socket.io";
// import { taskSocket } from "./socket/task";
const SERVER_PORT = 4000;

const startHttpServer = async (httpServer: http.Server) => {
  initRedis();
  await mq.connect("amqp://root:secret@localhost:5672/my-rabbit");
  await mq.consumeTest();
  try {
    console.log(`App server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`App server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("startHttpServer() method error:", error);
  }
};

// const createSocketIO = (httpServer: http.Server) => {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: `${configs.CLIENT_URL}`,
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     },
//   });
//   return io;
// };

const startServer = async () => {
  try {
    const httpServer: http.Server = new http.Server(app);
    // const socketIO: Server = createSocketIO(httpServer);
    // taskSocket(socketIO);
    await startHttpServer(httpServer);
  } catch (error) {
    console.log("startServer() error method:", error);
  }
};

startServer();

import http from "http";
import app from "@/app";
import { initRedis } from "./redis/connection";
import configs from "./configs";
// import { Server } from "socket.io";
// import { taskSocket } from "./socket/task";
const SERVER_PORT = 4000;

const startHttpServer = (httpServer: http.Server) => {
  initRedis();
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

const startServer = () => {
  try {
    const httpServer: http.Server = new http.Server(app);
    // const socketIO: Server = createSocketIO(httpServer);
    // taskSocket(socketIO);
    startHttpServer(httpServer);
  } catch (error) {
    console.log("startServer() error method:", error);
  }
};

startServer();

import { Server } from "socket.io";

export const taskSocket = (io: Server) => {
  const factoryNamespace = io.of("/nha_may");
  factoryNamespace.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("joinRoom", (roomName) => {
      console.log(`${socket.id} is joining room: ${roomName}`);
      socket.join(roomName);
      socket.to(roomName).emit("message", `${socket.id} has joined the room.`);
    });

    socket.on("disconnect", () => {});
  });
};

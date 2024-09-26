"use client";
import React from "react";
import { Socket } from "socket.io-client";
import configs from "@/config";
import { createSocket } from "@/lib/socket";

interface ITaskContext {
  connected: boolean;
  tasks: string[];
}

const initTaskContext: ITaskContext = {
  connected: false,
  tasks: [],
};

const taskContext = React.createContext<ITaskContext>(initTaskContext);

export const useTask = () => {
  const task = React.useContext(taskContext);
  return task;
};

type TTaskProvider = {
  children?: React.ReactNode;
};

const TaskProvider = ({ children }: TTaskProvider) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [taskData, setTaskData] = React.useState<ITaskContext>({
    connected: false,
    tasks: [],
  });

  function onConnect() {
    setTaskData((prev) => ({ ...prev, connected: true }));
  }
  function onDisconnect() {
    setTaskData((prev) => ({ ...prev, connected: false }));
  }
  function onTaskEvent(value: string) {
    console.log(value);
  }

  const initSocket = () => {
    if (socket) {
      socket.disconnect();
    }
    const newSocket = createSocket({
      url: configs.NEXT_PUBLIC_SERVER_URL,
      namespace: "nha_may",
      autoConnect: false,
    });
    setSocket(newSocket);
    newSocket.connect();
    newSocket.emit("joinRoom", "phong_chinh");

    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);
    newSocket.on("message", onTaskEvent);
  };

  React.useEffect(() => {
    initSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("message", onTaskEvent);
      }
    };
  }, []);

  return (
    <taskContext.Provider value={taskData}>{children}</taskContext.Provider>
  );
};

export default TaskProvider;

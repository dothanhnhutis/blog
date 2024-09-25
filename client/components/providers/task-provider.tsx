import React, { useContext } from "react";
import { createSocket } from "@/lib/socket";
import { boolean } from "zod";
import configs from "@/config";
import { Socket } from "socket.io-client";

interface TaskData {
  connected: boolean;
  tasks: string[];
}

interface ITaskContext {
  data: TaskData;
}

const initTaskContext: ITaskContext = {
  data: {
    connected: false,
    tasks: [],
  },
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
  const [taskData, setTaskData] = React.useState<TaskData>({
    connected: false,
    tasks: [],
  });

  function onConnect() {
    setTaskData((prev) => ({ ...prev, connected: true }));
  }
  function onDisconnect() {
    setTaskData((prev) => ({ ...prev, connected: false }));
  }
  function onTaskEvent(value: any) {
    //   setFooEvents((previous) => [...previous, value]);
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

    newSocket.off("connect", onConnect);
    newSocket.off("disconnect", onDisconnect);
    newSocket.off("phong_chinh", onTaskEvent);
  };

  React.useEffect(() => {
    initSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("phong_chinh", onTaskEvent);
      }
    };
  }, []);

  return (
    <taskContext.Provider
      value={{
        data: taskData,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export default TaskProvider;

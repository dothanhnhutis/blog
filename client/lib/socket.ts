import { io, ManagerOptions, SocketOptions } from "socket.io-client";

export type TCreateSocket = Partial<ManagerOptions & SocketOptions> & {
  url: string;
  namespace?: string;
};
export const createSocket = ({ url, namespace, ...props }: TCreateSocket) => {
  const URL = !namespace
    ? url
    : namespace.startsWith("/")
    ? url + namespace
    : url + "/" + namespace;
  return io(URL, props);
};

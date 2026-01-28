import React, { createContext, useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketUrl = import.meta.env.VITE_API_URL as string | undefined;
  const socket = useMemo(() => {
    if (!socketUrl) return null;
    return io(socketUrl, {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });
  }, [socketUrl]);

  useEffect(() => {
    if (!socket) return;

    const onConnectError = (err: Error) => {
      console.warn("Socket connect_error", err.message);
    };

    const onDisconnect = (reason: string) => {
      console.warn("Socket disconnected", reason);
    };

    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

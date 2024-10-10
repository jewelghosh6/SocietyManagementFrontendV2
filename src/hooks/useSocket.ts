import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import config from "../environments/config";
import toast from "react-hot-toast";

let socket: Socket | null = null;

const useSocket = (): Socket | null => {
  const [currentSocket, setCurrentSocket] = useState<Socket | null>(socket);
  const [token] = useState(localStorage.getItem("accessToken") ?? "");

  useEffect(() => {
    if (!token) return;

    if (!socket) {
      socket = io(config.API_BASE_URL, {
        query: { token },
      });

      socket.on("connect", () => {
        toast.success("Socket connected", {
          className: "custom-toast",
          duration: 4000, // Duration in milliseconds
        });
      });

      socket.on("disconnect", () => {
        toast.success("Socket disconnected", {
          className: "custom-toast",
          duration: 4000, // Duration in milliseconds
        });
      });

      setCurrentSocket(socket);
    } else {
      setCurrentSocket(socket);
    }

    return () => {
      if (socket && !token) {
        socket.disconnect();
        socket = null;
        setCurrentSocket(null);
      }
    };
  }, [token]);

  return currentSocket;
};

export default useSocket;

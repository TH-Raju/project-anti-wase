"use client";
import { authKey } from "@/constants/storageKey";
import { ISocketType } from "@/types/socketTypes";
import { getFromLocalStorage } from "@/utils/local-storage";
import { message } from "antd";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
import { IGenericErrorResponse } from "../../types/common";
import { getBaseUrl, getSocketBaseUrl } from "@/helpers/config/envConfig";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext) as {
    socket: ISocketType;
    socketLoading: boolean;
    error: Partial<IGenericErrorResponse>;
  };
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setIsError] = useState<Partial<IGenericErrorResponse>>();
  const [socketLoading, setLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(undefined);
  useEffect(() => {
    setLoading(true);
    const socketStore = io(getSocketBaseUrl(), {
      auth: { accessToken: getFromLocalStorage(authKey) as string },
      reconnectionDelayMax: 2000,
      query: {
        "my-key": "my-value",
      },
    });
    setSocket(socketStore);
    socketStore.on("connection", (data) => {
      message.success(data?.message);
      // console.log("🚀 ~ socketStore.on ~ data:", data)
 
    });
    // socketStore.on("joinRoomFromData", (data) => {
    //   console.log("🚀 ~ socket.on ~ data:", data)

    //   message.success("joinRoomFromData" + data.data.email);

    // });
    // socketStore.on('user_joined', (data) => {
    //   console.log(data)
    // })

    // socketStore.on("error", (data) => {
    //   console.log("Error received from server:", data);
    //   if (data && data.message) {
    //     message.error(data.message);
    //   } else {
    //     message.error("An error occurred on the server");
    //   }
    //   // setIsError({ success: data?.success || false, message: data?.message || "Unknown error", errorMessages: data?.message, statusCode: data?.statusCode || 5000 });
    // });
    setLoading(false);
    return () => {
      socketStore.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketLoading) {
      console.log("Socket loaded successfully");
      // Handle socket loading completion here
    }
  }, [socketLoading]);

  // const socket = useMemo(() => {
  //   const socketIo = io(`${getBaseUrl()}/user-namespace-office1`, {
  //     auth: { accessToken: getFromLocalStorage(authKey) as string },
  //     reconnectionDelayMax: 2000,
  //     query: {
  //       'my-key': 'my-value'
  //     }
  //   })
  //   socketIo.on('user_joined', (data) => {
  //     console.log(data)
  //   })
  //   return socketIo
  // }, [])

  return (
    // <SocketContext.Provider value={{ socket, socketLoading, error }}>
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

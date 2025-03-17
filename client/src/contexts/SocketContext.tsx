import { createContext, useContext, useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";
import { io, Socket } from "socket.io-client";

const { server } = useServerAddress();

export const SocketContext = createContext<Socket | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(server, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 3000,
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [server]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    return context;
};

import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";

const useTableRequest = () => {
    const [message, setMessage] = useState<string>("");
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.on("table-status-feedback", (data) => {
            setMessage(data);

            console.log(message);
        });

        return () => {
            socket.off("table-status-feedback");
        };
    });

    const sendData = (table_id: string) => {
        if (!socket) return;
        const data_to_send = {
            table_id: table_id,
        };
        socket.emit("check-table-status", data_to_send);
    };

    return { sendData };
};

export default useTableRequest;

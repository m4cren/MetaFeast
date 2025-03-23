import { useSocket } from "../contexts/SocketContext";

const useTableRequest = () => {
    const socket = useSocket();

    const sendData = (table_id: string, costumer_name: string) => {
        if (!socket) return;
        const data_to_send = {
            table_id: table_id,
            costumer_name: costumer_name,
        };
        socket.emit("request-table", data_to_send);
    };

    return { sendData };
};

export default useTableRequest;

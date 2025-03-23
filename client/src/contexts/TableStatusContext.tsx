import { createContext, useContext, useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";
import axios from "axios";
import { useSocket } from "./SocketContext";

interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
}

interface TableStatusContextType {
    tables: TableStatus[];
    getTableStatus: () => void;
}
const { server } = useServerAddress();

export const TableStatusContext = createContext<TableStatusContextType | null>(
    null,
);

export const TableStatusProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [tables, setTables] = useState<TableStatus[]>([]);

    const token = localStorage.getItem("token");

    const getTableStatus = async () => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
        } catch (error) {
            console.log("error");
        }
        const response = await axios.get(`${server}/get-table-status`, {
            headers,
            withCredentials: false,
        });
        setTables(response.data.tables as TableStatus[]);
    };

    useEffect(() => {
        getTableStatus();
    }, []);

    return (
        <TableStatusContext.Provider value={{ tables, getTableStatus }}>
            {children}
        </TableStatusContext.Provider>
    );
};

export const useTableStatus = () => {
    const context = useContext(TableStatusContext);

    return context;
};

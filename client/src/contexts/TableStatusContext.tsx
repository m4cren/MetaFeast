import { createContext, useContext, useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";
import axios from "axios";

interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
}
const { server } = useServerAddress();

export const TableStatusContext = createContext<TableStatus[] | null>(null);

export const TableStatusProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [tables, setTables] = useState<TableStatus[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const getTableStatus = async () => {
                const response = await axios.get(`${server}/get-table-status`, {
                    headers,
                    withCredentials: false,
                });
                setTables(response.data.tables as TableStatus[]);
            };
            getTableStatus();
        } catch (error) {
            console.log("error");
        }
    }, []);

    return (
        <TableStatusContext.Provider value={tables}>
            {children}
        </TableStatusContext.Provider>
    );
};

export const useTableStatus = () => {
    const context = useContext(TableStatusContext);

    return context;
};

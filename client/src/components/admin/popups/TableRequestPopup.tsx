import { IoMdExit } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { useTableStatus } from "../../../contexts/TableStatusContext";

interface Props {
    setIsTableRequest: React.Dispatch<React.SetStateAction<boolean>>;
    handleAccept: (tableSelected: string, costumerName: string) => void;
    setIsDenyConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    setCostumerName: React.Dispatch<React.SetStateAction<string>>;
    setTableSelected: React.Dispatch<React.SetStateAction<string>>;
}

type RequestType = {
    costumer_name: string;
    table_selected: string;
    message: string;
    time_ago: string;
};

const TableRequestPopup = ({
    setIsTableRequest,
    handleAccept,
    setIsDenyConfirm,
    setCostumerName,
    setTableSelected,
}: Props) => {
    const [requestMessage, setRequestMessage] = useState<RequestType[]>([]);
    const { server } = useServerAddress();
    const { getTableStatus } = useTableStatus() ?? {
        getTableStatus: () => {},
    };
    const refetchData = () => {
        setTimeout(() => {
            getTableStatus();
        }, 850);
    };

    useEffect(() => {
        const fetchRequestMessage = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                };

                const response = await axios.get(
                    `${server}/admin/table-request`,
                    {
                        headers,
                        withCredentials: false,
                    },
                );

                const dataMessage = response.data.response;

                setRequestMessage(dataMessage);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRequestMessage();
    }, []);

    return (
        <div className="fixed bg-black/45 w-full h-screen flex justify-center items-center pointer-events-auto">
            <div className="bg-white/80 rounded-2xl w-1/2 h-[40rem] relative pop-up-animation overflow-y-scroll custom-scrollbar">
                <button
                    onClick={() => setIsTableRequest(false)}
                    className="text-black cursor-pointer text-4xl absolute right-2 top-5"
                >
                    <IoMdExit />
                </button>

                <div className="flex flex-col ">
                    <div className="flex justify-center items-center py-5 border-b-2 border-black/10">
                        <h1 className="text-center text-2xl">Table Requests</h1>
                    </div>
                    <div className="">
                        {requestMessage.map(
                            (
                                {
                                    message,
                                    time_ago,
                                    costumer_name,
                                    table_selected,
                                },
                                index,
                            ) => (
                                <li
                                    className="list-none flex flex-row items-center justify-between px-8 py-3 border-b-1 border-black/10"
                                    key={index}
                                >
                                    <p className="text-lg">{message}</p>

                                    <div className="flex flex-row items-center gap-4">
                                        <p>{time_ago}</p>
                                        <button
                                            className="scale-260 text-red-500 cursor-pointer"
                                            onClick={() => {
                                                refetchData();
                                                setIsDenyConfirm(true);
                                                setCostumerName(costumer_name);
                                                setTableSelected(
                                                    table_selected,
                                                );
                                                setRequestMessage((prev) =>
                                                    prev.filter(
                                                        (item) =>
                                                            item.table_selected !==
                                                                table_selected ||
                                                            item.costumer_name !==
                                                                costumer_name,
                                                    ),
                                                );
                                            }}
                                        >
                                            <TiDelete />
                                        </button>
                                        <button
                                            className="text-3xl text-green-500 cursor-pointer"
                                            onClick={() => {
                                                refetchData();
                                                handleAccept(
                                                    table_selected,
                                                    costumer_name,
                                                );

                                                setRequestMessage((prev) =>
                                                    prev.filter(
                                                        (item) =>
                                                            item.table_selected !==
                                                                table_selected ||
                                                            item.costumer_name !==
                                                                costumer_name,
                                                    ),
                                                );
                                            }}
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    </div>
                                </li>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableRequestPopup;

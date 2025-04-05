import { LogOut, History, CircleX, CircleCheck } from "lucide-react";
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
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            {/* <div className="bg-white/80 rounded-2xl w-1/2 h-[40rem] relative pop-up-animation overflow-y-scroll custom-scrollbar">
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
            </div> */}

            <div className="pop-up-animation px-8 py-2 w-[23rem] translate-x-[1rem] h-[55vh] bg-gradient-to-t from-darkbrown to-lightbrown rounded-tl-3xl rounded-bl-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                <div className="w-full border-b-3 border-white/20 p-4">
                    <h1 className="text-primary text-[1.3rem] text-center text-shadow-md">
                        Current Costumers
                    </h1>
                </div>
                <div></div>
            </div>
            <div className="pop-up-animation realtive px-8 py-2 w-[40rem] translate-x-[-1rem] h-[70vh] z-2 bg-gradient-to-t from-darkbrown to-lightbrown rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                <div className="w-full border-b-3 border-white/20 p-4 flex flex-row items-center justify-center relative">
                    <h1 className="font-medium text-primary text-[1.6rem] text-center text-shadow-md">
                        Incoming Costumers
                    </h1>
                    <button
                        onClick={() => setIsTableRequest(false)}
                        className="absolute text-white/75 cursor-pointer hover:scale-105 transition duration-100 active:scale-95 drop-shadow-md right-0"
                    >
                        <LogOut size={25} />
                    </button>
                </div>
                <ul className="py-8 flex flex-col gap-2 h-[33rem] overflow-y-scroll custom-scrollbar px-3">
                    <li className="flex flex-row items-center justify-between px-2  text-primary border-1 border-white/20 rounded-2xl p-2 bg-gradient-to-r from-black/15 to-white/0 backdrop-blur-2xl [box-shadow:-2px_2px_5px_rgba(0,0,0,0.25)]">
                        <div className="flex flex-col">
                            <h1 className="text-[0.9rem] font-light">
                                Rainier is requesting to seat on table A_7
                            </h1>
                            <div className="flex flex-row items-center opacity-60 gap-1">
                                <History size={15} />
                                <p className="text-[0.7rem] font-extralight">
                                    2 mins ago
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center space-x-2 text-primary">
                            <button className="flex items-center justify-center bg-gradient-to-l translate-x-[12px]  from-darkred to-lightred p-2 w-[3.25rem] h-[2rem] rounded-tl-2xl rounded-bl-2xl cursor-pointer">
                                <CircleX size={20} />
                            </button>
                            <button className="flex items-center justify-center z-2 bg-gradient-to-r from-darkgreen to-lightgreen w-[4.5rem] h-[2.75rem] rounded-tr-2xl rounded-br-2xl rounded-tl-md rounded-bl-md p-2 rounded-2xl cursor-pointer">
                                <CircleCheck size={30} />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TableRequestPopup;

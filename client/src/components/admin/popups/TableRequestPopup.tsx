import { IoMdExit } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { useSocket } from "../../../contexts/SocketContext";

interface Props {
    setIsTableRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

type RequestType = {
    costumer_name: string;
    table_selected: string;
    message: string;
    time_ago: string;
};

const TableRequestPopup = ({ setIsTableRequest }: Props) => {
    const [requestMessage, setRequestMessage] = useState<RequestType[]>([]);
    const { server } = useServerAddress();
    const socket = useSocket();
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

    const handleAccept = (tableSelected: string, costumerName: string) => {
        const costumerToAccept = {
            costumer_name: costumerName,
            table_selected: tableSelected,
        };

        socket?.emit("accept-request", costumerToAccept);
    };
    const handleDeny = (tableSelected: string, costumerName: string) => {
        const costumerToDeny = {
            costumer_name: costumerName,
            table_selected: tableSelected,
        };

        socket?.emit("deny-request", costumerToDeny);
    };

    return (
        <div className="fixed bg-black/45 w-full h-screen flex justify-center items-center">
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
                                            onClick={() =>
                                                handleDeny(
                                                    table_selected,
                                                    costumer_name,
                                                )
                                            }
                                        >
                                            <TiDelete />
                                        </button>
                                        <button
                                            className="text-3xl text-green-500 cursor-pointer"
                                            onClick={() =>
                                                handleAccept(
                                                    table_selected,
                                                    costumer_name,
                                                )
                                            }
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

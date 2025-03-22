import { IoMdExit } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";

interface Props {
    setIsTableRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

type MessageType = {
    message: string;
    time_ago: string;
};

const TableRequestPopup = ({ setIsTableRequest }: Props) => {
    const [requestMessage, setRequestMessage] = useState<MessageType[]>([]);
    const { server } = useServerAddress();

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
        <div className="fixed bg-black/45 w-full h-screen flex justify-center items-center">
            <div className="bg-white/80 rounded-2xl w-1/2 h-[40rem] relative pop-up-animation">
                <button
                    onClick={() => setIsTableRequest(false)}
                    className="text-black cursor-pointer text-4xl absolute right-2 top-5"
                >
                    <IoMdExit />
                </button>

                <div className="flex flex-col">
                    <div className="flex justify-center items-center py-5 border-b-2 border-black/10">
                        <h1 className="text-center text-2xl">Table Requests</h1>
                    </div>
                    <div>
                        {requestMessage.map(({ message, time_ago }, index) => (
                            <li
                                className="list-none flex flex-row items-center justify-between px-8 py-3 border-b-1 border-black/10"
                                key={index}
                            >
                                <p className="text-lg">{message}</p>

                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-sm">{time_ago}</p>
                                    <button className="text-3xl text-green-500 cursor-pointer">
                                        <FaCheckCircle />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableRequestPopup;

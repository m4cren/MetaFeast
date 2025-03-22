import { useState } from "react";

interface Props {
    message: string;
    costumer_name: string;
    tableID: string;
    handleAccept: (tableSelected: string, costumerName: string) => void;
    handleDeny: (tableSelected: string, costumerName: string) => void;
}

const RequestNotification = ({
    message,
    handleAccept,
    handleDeny,
    tableID,
    costumer_name,
}: Props) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    return (
        <div
            className={`h-[4rem] rounded-2xl bg-white flex flex-row items-center justify-between px-2 w-full notification-animation ${isClick && "hidden"}`}
        >
            <p className="text-black">{message}</p>

            <div className="flex flex-row items-center space-x-2">
                <button
                    className="bg-red-400 p-2 rounded-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        handleDeny(tableID, costumer_name);
                    }}
                >
                    Deny
                </button>
                <button
                    className="bg-green-400 p-2 rounded-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        handleAccept(tableID, costumer_name);
                    }}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestNotification;

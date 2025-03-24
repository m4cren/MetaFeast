import { useState } from "react";
import { useTableStatus } from "../../../contexts/TableStatusContext";

interface Props {
    message: string;
    costumer_name: string;
    tableID: string;
    handleAccept: (tableSelected: string, costumerName: string) => void;
    setIsDenyConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    setCostumerName: React.Dispatch<React.SetStateAction<string>>;
    setTableSelected: React.Dispatch<React.SetStateAction<string>>;
}

const RequestNotification = ({
    message,
    handleAccept,
    setIsDenyConfirm,
    tableID,
    costumer_name,
    setCostumerName,
    setTableSelected,
}: Props) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const { getTableStatus } = useTableStatus() ?? {
        getTableStatus: () => {},
    };

    const refetchData = () => {
        setTimeout(() => {
            getTableStatus();
        }, 850);
    };
    return (
        <div
            className={`h-[4rem] rounded-2xl bg-white flex flex-row items-center justify-between px-2 pointer-events-auto w-full notification-animation ${isClick && "hidden"}`}
        >
            <p className="text-black">{message}</p>

            <div className="flex flex-row items-center space-x-2">
                <button
                    className="bg-red-400 p-2 rounded-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        setIsDenyConfirm(true);
                        refetchData();
                        setTableSelected(tableID);
                        setCostumerName(costumer_name);
                    }}
                >
                    Deny
                </button>
                <button
                    className="bg-green-400 p-2 rounded-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        handleAccept(tableID, costumer_name);

                        refetchData();
                    }}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestNotification;

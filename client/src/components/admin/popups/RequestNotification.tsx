import { useState } from "react";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import { CircleX, CircleCheck } from "lucide-react";

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
            className={`h-[4rem] [box-shadow:0_0_8px_rgba(0,0,0,0.4)] rounded-tr-3xl rounded-br-3xl bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-[rgba(255,255,255,0.1)] backdrop-blur-[40px] border-white/10 border-1 flex flex-row items-center justify-between px-2 pointer-events-auto w-full notification-animation ${isClick && "hidden"}`}
        >
            <p className="text-primary text-shadow-md text-[0.95rem] font-light">
                {message}
            </p>

            <div className="flex flex-row items-center space-x-2 text-primary">
                <button
                    className="flex items-center justify-center bg-gradient-to-l translate-x-[12px]  from-[#7A1A00] to-[#AD2500] p-2 w-[3.25rem] h-[2rem] rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        setIsDenyConfirm(true);
                        refetchData();
                        setTableSelected(tableID);
                        setCostumerName(costumer_name);
                    }}
                >
                    <CircleX size={20} />
                </button>
                <button
                    className="flex items-center justify-center z-2 bg-gradient-to-r from-[#075500] to-[#1F8400] w-[4.5rem] h-[2.75rem] rounded-tr-2xl rounded-br-2xl rounded-tl-md rounded-bl-md p-2 rounded-2xl cursor-pointer"
                    onClick={() => {
                        setIsClick(true);
                        handleAccept(tableID, costumer_name);

                        refetchData();
                    }}
                >
                    <CircleCheck size={30} />
                </button>
            </div>
        </div>
    );
};

export default RequestNotification;

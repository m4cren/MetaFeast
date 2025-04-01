import { useEffect } from "react";

interface WaitingOrderProps {
    transitionToTable: (table_id: string) => void;
}

const WaitingOrder = ({ transitionToTable }: WaitingOrderProps) => {
    useEffect(() => {
        const table_picked = localStorage.getItem("table-picked");
        if (!table_picked) return;
        transitionToTable(table_picked);
    }, []);
    return (
        <div className="fixed gap-4 w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center flex-col">
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.7rem] text-center">
                Wait for your order
            </h1>
        </div>
    );
};

export default WaitingOrder;

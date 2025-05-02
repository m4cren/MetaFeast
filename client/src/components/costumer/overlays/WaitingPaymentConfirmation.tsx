import React, { SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../../../contexts/SocketContext";
import { LogOut } from "lucide-react";

interface WaitingPaymentProps {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setIsPayMongoMethod: React.Dispatch<SetStateAction<boolean>>;
    isPayMongoMethod: boolean;
}
const WaitingPaymentConfirmation = ({
    setPhase,
    isPayMongoMethod,
    setIsPayMongoMethod,
}: WaitingPaymentProps) => {
    const socket = useSocket();
    const name = localStorage.getItem("costumer_name");

    const [isPaying, setIsPaying] = useState(false);
    const url = localStorage.getItem("checkout_url");

    useEffect(() => {
        if (url) {
            setIsPaying(true);
            setIsPayMongoMethod(true);
        }
    }, [isPayMongoMethod]);

    useEffect(() => {
        socket?.on("push-to-costumer", (data) => {
            const costumer_name = data.response.costumer_name;

            if (costumer_name === name) {
                setPhase(7);
                localStorage.setItem("current_phase", "phase_7");
            }
        });
    }, [socket]);

    return (
        <div className="fixed w-full gap-2 h-screen flex justify-center items-center flex-col bg-black/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] ">
            <span className="loader-white mb-15 opacity-70"></span>
            <h1 className="text-primary text-[1.5rem] min-[390px]:text-[1.7rem] text-center text-shadow-md">
                We're just confirming your payment, Please bear with us!
            </h1>

            {isPaying && isPayMongoMethod && (
                <div className="fixed flex flex-col gap-4 items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] h-[90vh]">
                    <iframe
                        src={`${localStorage.getItem("checkout_url")}`}
                        className="w-full h-full rounded-2xl [box-shadow:-2px_2px_5px_rgba(0,0,0,0.4)]"
                    ></iframe>
                    <button
                        style={{ border: "solid 1.5px rgba(255,255,255,0.2)" }}
                        onClick={() => setIsPaying(false)}
                        className="text-primary w-[80%] [box-shadow:-1px_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center py-2 rounded-2xl "
                    >
                        <LogOut />
                    </button>
                </div>
            )}
        </div>
    );
};

export default WaitingPaymentConfirmation;

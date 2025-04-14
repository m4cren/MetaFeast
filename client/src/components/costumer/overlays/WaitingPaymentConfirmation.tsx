import { useEffect } from "react";
import { useSocket } from "../../../contexts/SocketContext";

interface WaitingPaymentProps {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}
const WaitingPaymentConfirmation = ({ setPhase }: WaitingPaymentProps) => {
    const socket = useSocket();
    const name = localStorage.getItem("costumer_name");

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
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.5rem] min-[390px]:text-[1.7rem] text-center text-shadow-md">
                We're just confirming your payment, Please bear with us!
            </h1>
        </div>
    );
};

export default WaitingPaymentConfirmation;

import { LogOut } from "lucide-react";
import { useState } from "react";

interface PendingPayment {
    setIsPendingPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
const PendingPayments = ({ setIsPendingPayment }: PendingPayment) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div className="flex flex-col w-[35vw] h-[65vh] items-center">
                <div className="relative flex items-center justify-center bg-gradient-to-b from-darkbrown to-lightbrown rounded-2xl w-full h-25 [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] ">
                    <h1 className="text-primary text-[1.6rem] text-center">
                        Pending costumer's payment
                    </h1>
                    <i
                        onClick={() => {
                            setIsClose(true);
                            setTimeout(() => {
                                setIsClose(false);
                                setIsPendingPayment(false);
                            }, 500);
                        }}
                        className="absolute right-5 text-primary cursor-pointer"
                    >
                        <LogOut size={30} />
                    </i>
                </div>
                <div className=" flex flex-row justify-around w-full -z-1">
                    <div
                        className={`${isClose && "pending-handle-close-animation"} w-[8px] pending-handle-animation bg-gradient-to-b from-darkbrown to-lightbrown h-[2.5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] `}
                    ></div>
                    <div
                        className={`${isClose && "pending-handle-close-animation"} w-[8px] pending-handle-animation bg-gradient-to-b from-darkbrown to-lightbrown h-[2.5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] `}
                    ></div>
                </div>
                <div
                    className={`${isClose && "pending-payment-close-animation"} pending-payment-animation bg-gradient-to-t from-darkbrown to-lightbrown rounded-2xl w-[85%] h-[100%] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] `}
                ></div>
            </div>
        </div>
    );
};

export default PendingPayments;

import { LogOut, History } from "lucide-react";
import { useEffect, useState } from "react";

import { useSocket } from "../../../contexts/SocketContext";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { PendingPaymentType } from "../../../types/types";

interface PendingPayment {
    setIsPendingPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
const PendingPayments = ({ setIsPendingPayment }: PendingPayment) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [pendingPayments, setPendingPayments] = useState<
        PendingPaymentType[]
    >([]);
    const socket = useSocket();
    const { server } = useServerAddress();

    const getPendingPayments = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(
                `${server}/payment/get-pending-payments`,
                {
                    headers,
                    withCredentials: false,
                },
            );

            console.dir(response.data.pending_payment_requests);
            if (response.data.status) {
                setPendingPayments(response.data.pending_payment_requests);
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPendingPayments();

        socket?.on("push-to-admin-payment", (_) => {});

        return () => {
            socket?.off("push-to-admin-payment");
        };
    }, [socket]);

    const handleConfirm = (id: string) => {
        const dataToSend = {
            payment_id: id,
        };

        try {
            socket?.emit("confirm-payment", dataToSend);
        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            getPendingPayments();
        }, 500);
    };

    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div className="flex flex-col w-[55vw] h-[40rem] items-center">
                <div className="pop-up-animation relative flex items-center justify-center bg-gradient-to-b from-darkbrown to-lightbrown rounded-2xl w-full h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] ">
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
                    className={`${isClose && "pending-payment-close-animation"} overflow-y-scroll custom-scrollbar w-[90%] h-[32rem] flex flex-col justify-start items-center  py-8 px-4 pending-payment-animation bg-gradient-to-t from-darkbrown to-lightbrown rounded-2xl  [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)] `}
                >
                    <ul className="flex flex-col items-center  gap-2 w-full pb-4">
                        {pendingPayments.length !== 0 ? (
                            pendingPayments.map(
                                ({
                                    costumer_name,
                                    payment_id,
                                    payment_time,
                                    payment_type,
                                    total_payment,
                                }) => (
                                    <li
                                        key={payment_id}
                                        className={` w-[90%]  list-none flex flex-row items-center overflow-hidden justify-between rounded-2xl border-white/20 border-1 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]`}
                                    >
                                        <div className="flex flex-col items-start pl-4">
                                            <h1 className="text-primary text-[1rem] text-shadow-sm font-light">
                                                {costumer_name} has marked the
                                                payment of ₱{total_payment}
                                            </h1>
                                            <p className="flex justify-between w-full flex-row items-center gap-1 text-white/60 font-extralight text-shadow-sm text-[0.8rem]">
                                                <div className="flex flex-row items-center gap-1">
                                                    <i>
                                                        <History size={20} />
                                                    </i>{" "}
                                                    {payment_time}
                                                </div>
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-end pr-4">
                                                <h1 className="text-primary text-[1rem] text-shadow-sm font-light">
                                                    via {payment_type}
                                                </h1>
                                                <p className="flex justify-between w-full flex-row items-center gap-1 text-white/60 font-extralight text-shadow-sm text-[0.8rem]">
                                                    <div className="flex flex-row items-center gap-1">
                                                        Payment ID: {payment_id}
                                                    </div>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    handleConfirm(payment_id);
                                                }}
                                                className="hover:scale-105 hover:to-lightbrown hover:from-darkbrown transition duration-200 cursor-pointer text-primary text-[0.9rem] text-shadow-sm font-light bg-gradient-to-b h-[3.25rem] px-4 from-lightgreen to-darkgreen"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </li>
                                ),
                            )
                        ) : (
                            <p className="text-white/50 text-[0.9rem] w-full text-center">
                                There is no payment requests
                            </p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PendingPayments;

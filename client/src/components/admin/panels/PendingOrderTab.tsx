import axios from "axios";
import { memo, useEffect, useState } from "react";
import { ScrollText } from "lucide-react";
import useServerAddress from "../../../../useServerAddress";
import { PendingOrderType } from "../../../types/types";
import PendingOrderDetails from "../popups/PendingOrderDetails";
import { useSocket } from "../../../contexts/SocketContext";
interface Props {
    isTransitioning: boolean;
}

const PendingOrderTab = ({ isTransitioning }: Props) => {
    const socket = useSocket();
    const { server } = useServerAddress();
    const [pendingOrders, setPendingOrders] = useState<PendingOrderType[]>([]);
    const [selectedPendingOrder, setSelectedPendingOrder] =
        useState<PendingOrderType | null>(null);

    const [isToggle, setIsToggle] = useState<boolean>(false);
    const notif_sound = new Audio("/audios/notif.MP3");

    const getPendingOrders = async () => {
        const headers = {
            "Content-Type": "json/application",
        };
        try {
            const response = await axios.get(
                `${server}/orders/get-pending-orders`,
                {
                    headers,
                },
            );

            setPendingOrders(response.data.pending_orders);
        } catch (error) {
            console.log(error);
        }
    };

    const selectOrderOf = (table_id: string) => {
        setIsToggle(true);
        const selectedCostumerOrder = pendingOrders.find(
            (order) => order.current_table === table_id,
        );

        if (!selectedCostumerOrder) {
            return;
        }
        setSelectedPendingOrder(selectedCostumerOrder);
    };

    useEffect(() => {
        getPendingOrders();
    }, [isToggle]);

    useEffect(() => {
        socket?.on("push-to-admin", (_) => {
            notif_sound.play();
            getPendingOrders();
        });
    }, [socket]);
    return (
        <div
            className={` pointer-events-auto  flex flex-col space-y-[2vh] ${isTransitioning && "translate-x-[25rem]"} transition duration-500`}
        >
            <div className="rounded-bl-2xl  bg-gradient-to-b from-darkbrown to-lightbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex justify-center items-center h-[10vh]">
                <h1 className="text-white/90 text-3xl font-bold p-5 text-shadow-md">
                    Pending Orders
                </h1>
            </div>

            <ul className="text-primary bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-2xl rounded-tl-2xl h-[88vh] p-4 space-y-3  overflow-y-auto custom-scrollbar">
                {pendingOrders.length !== 0 ? (
                    pendingOrders.map(
                        (
                            { costumer_name, current_table, is_additional },
                            index,
                        ) => (
                            <li
                                className="bg-gradient-to-b from-[#ffffff0b] to-[#0000000b] border-1 border-white/20  rounded-2xl p-2 flex flex-row justify-between px-5 transition duration-200 pending-list-shadow  hover:translate-y-[-3px] hover:translate-x-[5px] cursor-pointer "
                                key={index}
                            >
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-xl font-medium text-shadow-md">
                                        Table {current_table}
                                    </h2>
                                    <p className="text-sm font-extralight text-white/70 text-shadow-md">
                                        {costumer_name}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end justify-center text-shadow-md">
                                    <button
                                        onClick={() =>
                                            selectOrderOf(current_table)
                                        }
                                        className="gap-1 font-extralight text-[1rem] flex flex-row items-center cursor-pointer hover:underline"
                                    >
                                        <ScrollText />
                                        View orders
                                    </button>
                                    {is_additional && (
                                        <p className="text-[0.9rem] text-white/60 font-extralight">
                                            Additional
                                        </p>
                                    )}
                                </div>
                            </li>
                        ),
                    )
                ) : (
                    <p className="text-white/50 text-[0.9rem] py-4 w-full text-center">
                        There is no order request
                    </p>
                )}
            </ul>

            {isToggle && (
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex justify-center items-center z-10">
                    <PendingOrderDetails
                        pendingOrderDetails={selectedPendingOrder}
                        setIsToggle={setIsToggle}
                        getPendingOrders={getPendingOrders}
                    />
                </div>
            )}
        </div>
    );
};

export default memo(PendingOrderTab);

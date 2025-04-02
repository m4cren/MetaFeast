import axios from "axios";
import { memo, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
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
    console.log(setIsToggle);
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
    }, []);

    useEffect(() => {
        socket?.on("push-to-admin", (_) => {
            getPendingOrders();
        });
    }, [socket]);
    return (
        <div
            className={` pointer-events-auto  flex flex-col space-y-[2vh] ${isTransitioning && "translate-x-[25rem]"} transition duration-500`}
        >
            <div className="rounded-bl-2xl bg-white/10 backdrop-blur-2xl flex justify-center items-center h-[10vh]">
                <h1 className="text-white/90 text-3xl font-bold p-5 text-shadow-md">
                    Pending Orders
                </h1>
            </div>

            <ul className="bg-white/10 backdrop-blur-2xl rounded-tl-2xl h-[88vh] p-4 space-y-3  overflow-y-auto custom-scrollbar">
                {pendingOrders.map(
                    ({ costumer_name, current_table }, index) => (
                        <>
                            <li
                                className="bg-white/85 rounded-2xl p-2 flex flex-row justify-between px-5 transition duration-200 pending-list-shadow  hover:translate-y-[-3px] hover:translate-x-[5px] cursor-pointer "
                                key={index}
                            >
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-xl font-medium">
                                        Table {current_table}
                                    </h2>
                                    <p>{costumer_name}</p>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <button className="rounded-3xl bg-green-500 text-white w-[5rem] p-2 flex justify-center items-center cursor-pointer hover:scale-107 transition duration-250">
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() =>
                                            selectOrderOf(current_table)
                                        }
                                        className="flex flex-row items-center cursor-pointer hover:underline"
                                    >
                                        <span className="text-xl">
                                            <IoMdListBox />
                                        </span>
                                        View orders
                                    </button>
                                </div>
                            </li>
                        </>
                    ),
                )}
            </ul>

            {isToggle && (
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex justify-center items-center z-10">
                    <PendingOrderDetails
                        pendingOrderDetails={selectedPendingOrder}
                        setIsToggle={setIsToggle}
                    />
                </div>
            )}
        </div>
    );
};

export default memo(PendingOrderTab);

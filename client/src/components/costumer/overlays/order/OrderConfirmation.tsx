import { useEffect, useState } from "react";
import { OrderType } from "../../../../types/types";
import { useSocket } from "../../../../contexts/SocketContext";
interface OrderConfirmationProps {
    orders: OrderType[];
    isTransitionDone: boolean;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    totalWaitingTime: number;
    isOrderMore?: boolean;
}

const OrderConfirmation = ({
    orders,
    isTransitionDone,
    setPhase,
    totalWaitingTime,
    isOrderMore,
}: OrderConfirmationProps) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const socket = useSocket();

    useEffect(() => {
        let accumulated_price = 0;
        orders.forEach(({ price }) => {
            return (accumulated_price += price);
        });

        setTotalPrice(accumulated_price);
    }, []);

    const handleConfirm = () => {
        setPhase(3);
        localStorage.setItem("current_phase", "phase_3");

        const data = {
            costumer_name: localStorage.getItem("costumer_name"),
            table_picked: localStorage.getItem("table-picked"),
            total_waiting_time: totalWaitingTime,
            food_name: orders.map(({ food_name }) => {
                return food_name;
            }),
            food_category: orders.map(({ category }) => {
                return category;
            }),
            quantity: orders.map(({ quantity }) => {
                return quantity;
            }),
            total_price: orders.map(({ price }) => {
                return price;
            }),
            img: orders.map(({ img }) => {
                return img;
            }),
            additional_order: isOrderMore ? "Yes" : "No",
            available_quantity: orders.map(({ available_quantity }) => {
                return available_quantity;
            }),
        };

        socket?.emit("send-order", data);
    };
    return (
        <div className="fixed w-full h-screen flex items-center justify-center">
            {isTransitionDone && (
                <div
                    style={{ border: "solid 1.5px rgba(255,255,255,0.2)" }}
                    className="pop-up-animation overflow-hidden relative py-6 w-[75vw] h-[75vh] bg-[rgba(0,0,0,0.1)] backdrop-blur-[20px] [-webkit-backdrop-blur:20px] rounded-3xl"
                >
                    <div className="h-[15%] flex justify-center items-center">
                        <h1 className="text-center leading-7 min-[580px]:text-[3rem] text-primary text-[1.7rem] min-[390px]:text-[1.85rem] font-medium text-shadow-md">
                            {isOrderMore
                                ? "Confirm additional order"
                                : "Confirm Order"}
                        </h1>
                    </div>
                    <div className="h-[70%] px-6 min-[580px]:px-12">
                        <div className="h-[15%] flex items-center justify-between text-primary text-[1.2rem] min-[580px]:text-[1.85rem] min-[390px]:text-[1.35rem] font-light">
                            <p className="text-shadow-sm">Orders</p>
                            <p className="text-shadow-sm">Quantity</p>
                        </div>
                        <div
                            style={{
                                borderBottom:
                                    "1.75px solid rgba(255,255,255,0.2)",
                            }}
                            className="h-[70%] border-b-1 border-white/30 overflow-y-scroll"
                        >
                            {orders.map(({ food_name, quantity }, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <p className="text-[0.8rem] min-[580px]:text-[1.2rem] min-[390px]:text-[0.9rem] text-shadow-md font-light text-[rgba(255,255,255,0.7)]">
                                        {food_name}
                                    </p>
                                    <p className="text-[0.8rem] min-[580px]:text-[1.2rem] min-[390px]:text-[0.9rem] text-shadow-md font-light text-[rgba(255,255,255,0.7)]">
                                        {quantity}x
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="h-[15%] flex items-center justify-between">
                            <p className="text-[1.1rem] min-[580px]:text-[2rem] text-primary min-[390px]:text-[1.2rem] text-shadow-sm">
                                Total Price:
                            </p>
                            <p className="text-[1.1rem] min-[580px]:text-[2rem] text-primary min-[390px]:text-[1.2rem] text-shadow-sm text-[rgba(255,255,255,0.8)] font-extralight">
                                ₱ {totalPrice}
                            </p>
                        </div>
                    </div>
                    <div className="h-[15%] flex items-center justify-center flex-col gap-3">
                        <button
                            onClick={handleConfirm}
                            className="px-5 min-[390px]:px-8 min-[580px]:text-[1.75rem] min-[580px]:px-15 min-[580px]:py-3 shadow-3xl text-shadow-md py-1 min-[390px]:py-2 text-primary [box-shadow:-2px_2px_5px_rgba(0,0,0,0.3)] rounded-2xl brown-gradient-to-b"
                        >
                            Confirm
                        </button>
                        <p className="text-[0.65rem] min-[580px]:text-[1rem] min-[390px]:text-[0.75rem] text-[rgba(255,255,255,0.6)] font-extralight text-shadow-md">
                            You can add order later while waiting or dining
                        </p>
                    </div>
                    <div className=" absolute top-0 left-0 right-0 bottom-0 inset-0 mask-image-[linear-gradient(to_top,transparent,black),linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;

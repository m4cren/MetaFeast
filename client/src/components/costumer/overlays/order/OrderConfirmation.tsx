import { useEffect, useState } from "react";
import { OrderType } from "../../../../types/types";
import { useSocket } from "../../../../contexts/SocketContext";
interface OrderConfirmationProps {
    orders: OrderType[];
    isTransitionDone: boolean;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}

const OrderConfirmation = ({
    orders,
    isTransitionDone,
    setPhase,
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
            food_name: orders.map(({ food_name }) => {
                return food_name;
            }),
            quantity: orders.map(({ quantity }) => {
                return quantity;
            }),
            total_price: orders.map(({ price }) => {
                return price;
            }),
            total_calories: orders.map(({ calories }) => {
                return calories;
            }),
        };

        socket?.emit("send-order", data);
    };
    return (
        <div className="fixed w-full h-screen flex items-center justify-center">
            {isTransitionDone && (
                <div className="pop-up-animation overflow-hidden relative py-6 w-[75vw] h-[75vh] backdrop-blur-[10px] [-webkit-backdrop-blur:10px] border-1 border-white/20 rounded-4xl">
                    <div className="h-[15%] flex justify-center items-center">
                        <h1 className="text-center text-primary text-3xl font-medium text-shadow-lg">
                            Confirm Order
                        </h1>
                    </div>
                    <div className="h-[70%] px-6 ">
                        <div className="h-[15%] flex items-center justify-between text-primary text-2xl">
                            <p className="text-shadow-sm">Orders</p>
                            <p className="text-shadow-sm">Quantity</p>
                        </div>
                        <div className="h-[70%] border-b-1 border-white/30 overflow-y-scroll">
                            {orders.map(({ food_name, quantity }, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-primary"
                                >
                                    <p className="text-[0.9rem] text-shadow-md font-extralight text-white/80">
                                        {food_name}
                                    </p>
                                    <p className="text-[0.9rem] text-shadow-md font-extralight text-white/80">
                                        {quantity}x
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="h-[15%] flex items-center justify-between">
                            <p className="text-primary text-shadow-sm">
                                Total Price:
                            </p>
                            <p className="text-primary text-shadow-sm text-white/80 font-extralight">
                                ₱ {totalPrice}
                            </p>
                        </div>
                    </div>
                    <div className="h-[15%] flex items-center justify-center flex-col gap-3">
                        <button
                            onClick={handleConfirm}
                            className="px-8 shadow-3xl text-shadow-md py-2 text-primary border-1 border-white/10 rounded-2xl bg-gradient-to-b  from-[#1F8400] to-[#075500]"
                        >
                            Confirm
                        </button>
                        <p className="text-[0.75rem] text-white/60 font-extralight text-shadow-md">
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

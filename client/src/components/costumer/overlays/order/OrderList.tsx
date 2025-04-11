import layout from "../../../../styles/layouts/order_list.module.css";
import { ArrowBigLeft, Ban, Trash2 } from "lucide-react";
import { OrderType } from "../../../../types/types";
import { useEffect, useState } from "react";

interface OrderListProps {
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    setIsBasket: React.Dispatch<React.SetStateAction<boolean>>;
    orders: OrderType[];
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
    setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalWaitingTime: React.Dispatch<React.SetStateAction<number>>;
    totalWaitingTime: number;
}
const OrderList = ({
    setSelectedCuisine,
    setIsBasket,
    orders,
    setOrders,
    setIsCheckout,
    setTotalWaitingTime,
    totalWaitingTime,
}: OrderListProps) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalEnergy, setTotalEnergy] = useState<number>(0);

    const [isTrash, setTrash] = useState<boolean>(false);
    const [isCheckoutConfirmation, setIsCheckoutConfirmation] =
        useState<boolean>(false);

    const handleDecreaseQuantity = (foodName: string) => {
        setOrders((prevOrder) =>
            prevOrder.map((order) =>
                order.food_name === foodName
                    ? {
                          ...order,
                          quantity:
                              order.quantity <= 1
                                  ? order.quantity
                                  : order.quantity - 1,
                          price:
                              order.quantity <= 1
                                  ? order.price
                                  : order.price - order.base_price,
                          calories:
                              order.quantity <= 1
                                  ? order.calories
                                  : order.calories - order.base_calories,
                      }
                    : order,
            ),
        );
    };
    const handleIncreaseQuantity = (foodName: string) => {
        setOrders((prevOrder) =>
            prevOrder.map((order) =>
                order.food_name === foodName
                    ? {
                          ...order,
                          quantity:
                              order.quantity < order.available_quantity
                                  ? order.quantity + 1
                                  : order.quantity,
                          price:
                              order.quantity < order.available_quantity
                                  ? order.price + order.base_price
                                  : order.price,
                          calories:
                              order.quantity < order.available_quantity
                                  ? order.calories + order.base_calories
                                  : order.calories,
                      }
                    : order,
            ),
        );
    };

    const handleDeleteOrder = (foodName: string) => {
        const newOrders = orders.filter(
            (order) => order.food_name !== foodName,
        );
        setOrders(newOrders);
    };

    useEffect(() => {
        if (!orders) {
            setTotalWaitingTime(0);
            return;
        }
        let total_price = 0;
        let total_energy = 0;

        let longest_time = Math.max(
            ...orders.map((order) => order.waiting_time),
        );

        let total_waiting_time = longest_time - longest_time * 0.3;

        orders.forEach(({ price, calories, waiting_time }) => {
            return (
                (total_price += price),
                (total_energy += calories),
                (total_waiting_time += waiting_time * 0.3)
            );
        });

        setTotalPrice(total_price);
        setTotalEnergy(total_energy);
        setTotalWaitingTime(total_waiting_time);
    }, [orders]);

    return (
        <div
            className={`${layout.main}  w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative`}
        >
            {isCheckoutConfirmation && (
                <div className="fixed w-full h-screen bg-black/40  z-20 flex items-center justify-center">
                    <div className="pop-up-animation flex flex-col justify-center gap-4 w-[90vw]  h-[10rem] bg-gradient-to-b from-lightbrown to-darkbrown rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.4)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                        <h1 className="text-center text-primary font-normal leading-7 text-[1.5rem] min-[390px]:text-[1.6rem] text-shadow-md">
                            Ready to proceed to checkout?
                        </h1>
                        <div className=" text-primary flex place-items-center justify-center gap-4">
                            <button
                                className="active:opacity-95 active:scale-95 transition duration-150 text-shadow-md text-[0.85rem] min-[390px]:text-[0.95rem] font-light border-1 border-white/20 rounded-xl shadow-md p-2 min-[390px]:p-3"
                                onClick={() => setIsCheckoutConfirmation(false)}
                            >
                                Continue Browsing
                            </button>
                            <button
                                className="active:opacity-95 active:scale-95 transition duration-150 text-shadow-md text-[0.85rem] min-[390px]:text-[0.95rem] font-light bg-gradient-to-b p-2 min-[390px]:p-3 from-lightgreen to-darkgreen rounded-xl"
                                onClick={() => setIsCheckout(true)}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`${layout.head} px-6 flex flex-row items-center justify-between`}
            >
                <button
                    className="text-primary text-shadow-md active:scale-95 transition duration-150 active:opacity-95"
                    onClick={() => {
                        setSelectedCuisine("");
                        setIsBasket(false);
                    }}
                >
                    <ArrowBigLeft size={40} />
                </button>
                <h1 className="text-primary text-[1.6rem] min-[390px]:text-[1.75rem] text-shadow-md ">
                    Basket
                </h1>
                <p
                    onClick={() => setTrash(!isTrash)}
                    className="text-primary text-shadow-md active:scale-95 transition duration-150 active:opacity-95"
                >
                    {!isTrash ? <Trash2 size={35} /> : <Ban size={35} />}
                </p>
            </div>
            <div
                className={`${layout["order-list"]} pb-80 gap-2 min-[390px]:gap-3 pt-8 overflow-y-scroll [mask-image:linear-gradient(to_top,transparent,black_60%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_90%)]`}
            >
                {orders.map(({ food_name, price, quantity, img }, index) => (
                    <div
                        key={index}
                        className="px-2 bg-gradient-to-t rounded-3xl shadow-md to-lightbrown from-darkbrown w-[90%] h-27 min-[390px]:h-30 mx-auto flex flex-row items-center"
                    >
                        <div className="w-1/2 scale-90 min-[390px]:scale-100">
                            <img
                                className="drop-shadow-lg"
                                src={`/images/products/${img}`}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col w-1/2 items-center gap-2">
                            <h1 className="leading-5 text-primary text-[1.15rem] min-[390px]:text-[1.3rem] w-full text-center font-medium text-shadow-md">
                                {food_name}
                            </h1>
                            <div
                                className={`${isTrash ? "justify-center active:scale-95 active:opacity-95 transition duration-150" : "justify-between"}  flex flex-row items-center w-full`}
                            >
                                {!isTrash ? (
                                    <>
                                        {" "}
                                        <p className="text-white/65 text-[0.9rem] min-[390px]:text-[1rem] text-shadow-md font-extralight">
                                            ₱ {price}
                                        </p>
                                        <div className="[box-shadow:0_0_8px_rgba(0,0,0,0.5)_inset] bg-white  rounded-4xl shadow-md  w-[6rem] h-[2.25rem] min-[390px]:w-[7rem] min-[390px]:h-[2.5rem] flex flex-row items-center justify-between min-[390px]:px-4 px-2 text-darkbrown">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseQuantity(
                                                        food_name,
                                                    )
                                                }
                                                className="text-shadow-md text-3xl min-[390px]:text-4xl active:scale-95 transition active:opacity-95 duration-150"
                                            >
                                                -
                                            </button>
                                            <p className="text-shadow-md">
                                                {quantity}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handleIncreaseQuantity(
                                                        food_name,
                                                    )
                                                }
                                                className="text-shadow-md text-3xl min-[390px]:text-4xl active:scale-95 active:opacity-95 transition duration-150"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="text-red-600 w-1/2 py-2 flex justify-center"
                                        onClick={() =>
                                            handleDeleteOrder(food_name)
                                        }
                                    >
                                        <Trash2 size={35} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="z-10 absolute bottom-0 w-[80vw] h-fit p-3 min-[390px]:p-4 flex flex-col gap-5 shadow-2xl  left-1/2 translate-y-[-40%] bg-black/20 translate-x-[-50%]  backdrop-blur-[20px] [-webkit-backdrop-blur:20px] border-1 border-white/10 rounded-2xl">
                <div>
                    <h2 className="flex flex-row items-center justify-between text-[1.1rem] text-white font-light text-shadow-md">
                        <span className="text-[1rem] min-[390px]:text-[1.2rem]">
                            Total Cost:
                        </span>
                        <span className="text-white/70 font-extralight text-[0.9rem] min-[390px]:text-[1rem]">
                            ₱ {totalPrice}
                        </span>
                    </h2>
                    <h2 className="flex flex-row items-center justify-between  text-[1.1rem] text-white font-light">
                        <span className="text-[1rem] min-[390px]:text-[1.2rem]">
                            Waiting Time:
                        </span>
                        <span className="text-white/70 font-extralight text-[0.9rem] min-[390px]:text-[1rem]">
                            {totalWaitingTime}mins
                        </span>
                    </h2>
                    <h2 className="flex flex-row items-center justify-between  text-[1.1rem] text-white font-light">
                        <span className="text-[1rem] min-[390px]:text-[1.2rem]">
                            Total Energy:
                        </span>
                        <span className="text-white/70 font-extralight text-[0.9rem] min-[390px]:text-[1rem]">
                            {totalEnergy}cal
                        </span>
                    </h2>
                </div>
                <div className="flex w-full justify-center items-center">
                    <button
                        onClick={() => setIsCheckoutConfirmation(true)}
                        className="active:scale-95 transition active:opacity-95 duration-150 bg-gradient-to-b px-15 min-[390px]:px-20 from-lightgreen to-darkgreen p-2 rounded-4xl text-primary text-shadow-md shadow-2xl"
                    >
                        Checkout
                    </button>
                </div>
            </div>
            <div className="w-full h-1/3 bg-gradient-to-t from-[black] to-[#ffffff00] absolute bottom-0 pointer-events-none"></div>
        </div>
    );
};

export default OrderList;

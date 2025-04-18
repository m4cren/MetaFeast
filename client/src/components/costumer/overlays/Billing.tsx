import { SetStateAction, useEffect, useState } from "react";
import useFrameProvider from "../../../frames/useFrameProvider";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { PendingOrderType } from "../../../types/types";
import { useSocket } from "../../../contexts/SocketContext";

interface BillingProps {
    setCamPos: React.Dispatch<SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<SetStateAction<[number, number, number]>>;
    setPhase: React.Dispatch<SetStateAction<number>>;
    setIsPayMongoMethod: React.Dispatch<SetStateAction<boolean>>;
}

type OrderType = {
    food_name: string;
    food_category: string;
    img: string;
    price: number;
    quantity: number;
};

const Billing = ({
    setCamPos,
    setCamRot,
    setPhase,
    setIsPayMongoMethod,
}: BillingProps) => {
    const { to_counter, to_1st_Frames } = useFrameProvider();
    const current_table = localStorage.getItem("table-picked");
    const [isReady, setIsReady] = useState<boolean>(false);
    const { server } = useServerAddress();
    const [myOrders, setMyOrders] = useState<PendingOrderType | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const socket = useSocket();

    const redirect_to_paymongo = async () => {
        const data_to_send = {
            costumer_name: myOrders?.costumer_name,
            price: totalPrice,
        };

        try {
            const response = await axios.post(
                `${server}/payment`,
                data_to_send,
            );

            const url = response.data.checkout_url;
            console.dir(response);

            if (url) {
                localStorage.setItem("checkout_url", url);
                setIsPayMongoMethod(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBillRequest = (payment_type: string) => {
        const dataToSend = {
            costumer_name: myOrders?.costumer_name,
            table_id: myOrders?.current_table,
            payment_type: payment_type,
            total_price: totalPrice,
            orders: mergedOrders.map(({ food_name, quantity, price, img }) => {
                return {
                    food_name: food_name,
                    quantity: quantity,
                    price: price,
                    img: img,
                };
            }),
        };

        try {
            socket?.emit("billing-request", dataToSend);

            setPhase(6);
            localStorage.setItem("current_phase", "phase_6");
        } catch (error) {
            console.log(error);
        }

        if (payment_type === "PayMongo") {
            redirect_to_paymongo();
        }
    };

    const getOrders = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/order/get-order`, {
                headers,
                withCredentials: true,
            });

            if (response.data.status) {
                setMyOrders(response.data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let price_ = 0;
        myOrders?.orders.forEach(({ price }) => {
            return (price_ = price + price_);
        });

        setTotalPrice(price_);
    }, [myOrders]);
    const mergeOrders = (orders: OrderType[]): OrderType[] => {
        const merged = orders.reduce<Record<string, OrderType>>((acc, item) => {
            if (!acc[item.food_name]) {
                acc[item.food_name] = { ...item };
            } else {
                acc[item.food_name].quantity += item.quantity;
                acc[item.food_name].price += item.price;
            }
            return acc;
        }, {});

        return Object.values(merged);
    };

    const mergedOrders: OrderType[] = myOrders?.orders
        ? mergeOrders(myOrders?.orders)
        : [
              {
                  food_category: "",
                  food_name: "",
                  img: "",
                  price: 0,
                  quantity: 0,
              },
          ];

    useEffect(() => {
        getOrders();

        if (current_table?.includes("A", 0)) {
            setCamPos(to_counter.frame1.pos);
            setCamRot(to_counter.frame1.rot);

            setTimeout(() => {
                setCamPos(to_counter.frame2.pos);
                setCamRot(to_counter.frame2.rot);
                setIsReady(true);
            }, 600);
        } else if (current_table?.includes("B", 0)) {
            setCamPos(to_1st_Frames.frame1.pos);
            setCamRot(to_1st_Frames.frame1.rot);

            setTimeout(() => {
                setCamPos(to_1st_Frames.frame2.pos);
                setCamRot(to_1st_Frames.frame2.rot);

                setTimeout(() => {
                    setCamPos(to_1st_Frames.frame3.pos);
                    setCamRot(to_1st_Frames.frame3.rot);
                    setTimeout(() => {
                        setCamPos(to_1st_Frames.frame4.pos);
                        setCamRot(to_1st_Frames.frame4.rot);
                        setTimeout(() => {
                            setCamPos(to_1st_Frames.frame5.pos);
                            setCamRot(to_1st_Frames.frame5.rot);
                            setTimeout(() => {
                                setCamPos(to_1st_Frames.frame6.pos);
                                setCamRot(to_1st_Frames.frame6.rot);
                                setTimeout(() => {
                                    setCamPos(to_1st_Frames.frame7.pos);
                                    setCamRot(to_1st_Frames.frame7.rot);
                                    setTimeout(() => {
                                        setCamPos(to_1st_Frames.frame8.pos);
                                        setCamRot(to_1st_Frames.frame8.rot);
                                        setTimeout(() => {
                                            setCamRot(to_counter.frame1.rot);
                                            setCamPos(to_counter.frame1.pos);

                                            setTimeout(() => {
                                                setIsReady(true);
                                                setCamRot(
                                                    to_counter.frame2.rot,
                                                );
                                                setCamPos(
                                                    to_counter.frame2.pos,
                                                );
                                            }, 1000);
                                        }, 350);
                                    }, 350);
                                }, 350);
                            }, 350);
                        }, 350);
                    }, 350);
                }, 350);
            }, 350);
        }
    }, []);
    useEffect(() => {
        const dataToSend = {
            costumer_name: myOrders?.costumer_name,
            table_id: myOrders?.current_table,
            payment_type: "Undefined",
            total_price: totalPrice,
            orders: mergedOrders.map(({ food_name, quantity, price, img }) => {
                return {
                    food_name: food_name,
                    quantity: quantity,
                    price: price,
                    img: img,
                };
            }),
        };

        if (myOrders?.costumer_name.length !== 0) {
            socket?.emit("billing-request", dataToSend);
        }
    }, [myOrders]);
    return (
        isReady && (
            <div className="fixed w-full h-screen flex items-center justify-center">
                <div className="pop-up-animation overflow-hidden relative py-6 w-[75vw] h-[75vh] bg-black/10 backdrop-blur-[20px] [-webkit-backdrop-blur:20px] border-2 border-white/15 rounded-3xl">
                    <div className="h-[15%] flex justify-center items-center">
                        <h1 className="text-center text-primary text-[1.7rem] min-[390px]:text-[1.85rem] font-medium text-shadow-md">
                            Confirm Payment
                        </h1>
                    </div>
                    <div className="h-[70%] px-6 ">
                        <div className="h-[15%] flex items-center justify-between text-primary text-[1.2rem] min-[390px]:text-[1.35rem] font-light">
                            <p className="text-shadow-sm">Orders</p>
                            <p className="text-shadow-sm">Quantity</p>
                        </div>
                        <div className="h-[70%] border-b-1 border-white/30 overflow-y-scroll">
                            {mergedOrders.map(
                                ({ food_name, quantity }, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <p className="text-[0.8rem] min-[390px]:text-[0.9rem] text-shadow-md font-extralight text-white/70">
                                            {food_name}
                                        </p>
                                        <p className="text-[0.8rem] min-[390px]:text-[0.9rem] text-shadow-md font-extralight text-white/70">
                                            {quantity}x
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="h-[15%] flex items-center justify-between">
                            <p className="text-[1.1rem] text-primary min-[390px]:text-[1.2rem] text-shadow-sm">
                                Total Price:
                            </p>
                            <p className="text-[1.1rem] text-primary min-[390px]:text-[1.2rem] text-shadow-sm text-white/80 font-extralight">
                                ₱ {totalPrice}
                            </p>
                        </div>
                    </div>
                    <div className="h-[15%] flex items-center justify-center flex-col gap-3">
                        <div className="flex flex-row items-center gap-2">
                            <button
                                onClick={() => handleBillRequest("Cash")}
                                className="text-[1.1rem] min-[390px]:text-[1.2rem] px-4 min-[390px]:px-8 shadow-3xl text-shadow-md py-3  text-primary [box-shadow:-1px_1px_5px_rgba(0,0,0,0.4)] rounded-2xl border-1 border-white/25"
                            >
                                Cash
                            </button>
                            <button
                                onClick={() => handleBillRequest("PayMongo")}
                                className="px-5 min-[390px]:px-8 shadow-3xl text-shadow-md py-1  text-primary [box-shadow:-2px_2px_5px_rgba(0,0,0,0.3)] rounded-2xl bg-gradient-to-b  from-lightbrown to-darkbrown"
                            >
                                <h1 className="text-[1.1rem] min-[390px]:text-[1.2rem]">
                                    Pay Online
                                </h1>
                                <div className="flex flex-row items-center gap-1">
                                    <p className="text-white/60 text-[0.65rem] min-[390px]:text-[0.75rem] -mt-1">
                                        via PayMongo
                                    </p>
                                    <img
                                        className="rounded-full w-[1rem] h-[1rem]"
                                        src="/images/paymongo.jpg"
                                        alt=""
                                    />
                                </div>
                            </button>
                        </div>
                        <p className="text-[0.65rem] min-[390px]:text-[0.75rem] text-white/60 font-extralight text-shadow-md">
                            We suggest to pay thru PayMongo
                        </p>
                    </div>
                    <div className=" absolute top-0 left-0 right-0 bottom-0 inset-0 mask-image-[linear-gradient(to_top,transparent,black),linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>
                </div>
            </div>
        )
    );
};

export default Billing;

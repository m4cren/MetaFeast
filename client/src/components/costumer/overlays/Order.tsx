import { useEffect, useState } from "react";
import OrderMenu from "./order/OrderMenu";
import ProductDetails from "./order/ProductDetails";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { ProductDetailsType, OrderType } from "../../../types/types";
import OrderList from "./order/OrderList";
import OrderConfirmation from "./order/OrderConfirmation";
import useFrameProvider from "../../../frames/useFrameProvider";
interface OrderProps {
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}
const Order = ({ setCamPos, setCamRot, setPhase }: OrderProps) => {
    const { to_counter, to_1st_Frames } = useFrameProvider();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selectedCuisine, setSelectedCusine] = useState<string>("");
    const { server } = useServerAddress();
    const [productDetails, setProducDetails] = useState<ProductDetailsType[]>(
        [],
    );

    const [isPlaceBasket, setIsPlaceBasket] = useState<boolean>(false);

    const [isBasket, setIsBasket] = useState<boolean>(false);

    const [isCheckout, setIsCheckout] = useState<boolean>(false);
    const [isTransitionDone, setIsTransitionDone] = useState<boolean>(false);

    const fetchProductDetails = async () => {
        const headers = {
            "Content-Type": "json/application",
        };
        try {
            const response = await axios.get(`${server}/products/get-details`, {
                headers,
                withCredentials: false,
            });

            setProducDetails(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const mergeOrders = (orders: OrderType[]): OrderType[] => {
        const merged = orders.reduce<Record<string, OrderType>>((acc, item) => {
            if (!acc[item.food_name]) {
                acc[item.food_name] = { ...item };
            } else {
                acc[item.food_name].quantity += item.quantity;
                acc[item.food_name].price += item.price;
                acc[item.food_name].calories += item.calories;
            }
            return acc;
        }, {});

        return Object.values(merged);
    };

    const mergedOrders: OrderType[] = mergeOrders(orders);

    useEffect(() => {
        const floorCheck = localStorage.getItem("table-picked");

        const frame_sec = 200;
        if (isCheckout && floorCheck?.includes("A", 0)) {
            setCamPos(to_counter.frame1.pos);
            setCamRot(to_counter.frame1.rot);

            const timer = setTimeout(() => {
                setIsTransitionDone(true);
                setCamPos(to_counter.frame2.pos);
                setCamRot(to_counter.frame2.rot);
            }, 750);
            return () => clearTimeout(timer);
        } else if (isCheckout && floorCheck?.includes("B", 0)) {
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
                                                setIsTransitionDone(true);
                                                setCamRot(
                                                    to_counter.frame2.rot,
                                                );
                                                setCamPos(
                                                    to_counter.frame2.pos,
                                                );
                                            }, 1500);
                                        }, 800);
                                    }, frame_sec);
                                }, frame_sec);
                            }, frame_sec);
                        }, frame_sec);
                    }, frame_sec);
                }, frame_sec);
            }, 700);
        }
        return;
    }, [isCheckout]);
    console.log(setPhase);
    return (
        <>
            {isCheckout ? (
                <OrderConfirmation
                    orders={mergedOrders}
                    isTransitionDone={isTransitionDone}
                    setPhase={setPhase}
                />
            ) : isBasket ? (
                <OrderList
                    setSelectedCuisine={setSelectedCusine}
                    setIsBasket={setIsBasket}
                    setOrders={setOrders}
                    orders={mergedOrders}
                    setIsCheckout={setIsCheckout}
                />
            ) : selectedCuisine.length !== 0 ? (
                <ProductDetails
                    selectedCuisine={selectedCuisine}
                    setSelectedCuisine={setSelectedCusine}
                    productDetails={productDetails}
                    orders={orders}
                    setOrders={setOrders}
                    setIsPlaceBasket={setIsPlaceBasket}
                    setIsBasket={setIsBasket}
                />
            ) : (
                <OrderMenu
                    setSelectedCuisine={setSelectedCusine}
                    productDetails={productDetails}
                    isPlaceBasket={isPlaceBasket}
                    setIsBasket={setIsBasket}
                />
            )}
        </>
    );
};

export default Order;

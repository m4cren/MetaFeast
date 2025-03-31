import { useEffect, useState } from "react";
import OrderMenu from "./order/OrderMenu";
import ProductDetails from "./order/ProductDetails";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { ProductDetailsType, OrderType } from "../../../types/types";
import OrderList from "./order/OrderList";

const Order = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selectedCuisine, setSelectedCusine] = useState<string>("");
    const { server } = useServerAddress();
    const [productDetails, setProducDetails] = useState<ProductDetailsType[]>(
        [],
    );

    const [isPlaceBasket, setIsPlaceBasket] = useState<boolean>(false);

    const [isBasket, setIsBasket] = useState<boolean>(false);

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
        console.log(mergedOrders);
    }, [orders]);

    return (
        <>
            {isBasket ? (
                <OrderList
                    setSelectedCuisine={setSelectedCusine}
                    setIsBasket={setIsBasket}
                    setOrders={setOrders}
                    orders={mergedOrders}
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

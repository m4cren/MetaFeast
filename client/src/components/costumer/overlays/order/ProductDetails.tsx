import layout from "../../../../styles/layouts/product_details.module.css";
import {
    ArrowBigLeft,
    ShoppingBasket,
    Flame,
    Hourglass,
    MessageCircleWarning,
} from "lucide-react";

import { ProductDetailsType } from "../../../../types/types";
import { useEffect, useState } from "react";

import { OrderType } from "../../../../types/types";

interface Props {
    selectedCuisine: string;
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    productDetails: ProductDetailsType[];

    orders: OrderType[];
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
    setIsPlaceBasket: React.Dispatch<React.SetStateAction<boolean>>;
    setIsBasket: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetails = ({
    selectedCuisine,
    setSelectedCuisine,
    productDetails,
    orders,
    setOrders,
    setIsPlaceBasket,
    setIsBasket,
}: Props) => {
    const [orderQuantity, setOrderQuantity] = useState<number>(0);
    const [isDenied, setIsDenied] = useState<boolean>(false);

    const selectedProduct = productDetails.find(
        (item) => item.food_name === selectedCuisine,
    );

    const [placeOrders, setPlaceOrders] = useState<OrderType>({
        category: "",
        food_name: "",
        img: "",
        price: 0,
        quantity: 0,
        calories: 0,
        waiting_time: 0,
        base_price: 0,
        base_calories: 0,
    });

    const handlePlaceOrder = () => {
        if (orderQuantity != 0) {
            localStorage.setItem(
                "last-product-placed",
                selectedProduct?.img ? selectedProduct.img : "",
            );
            setOrders([...orders, placeOrders]);
            setOrderQuantity(0);
            setSelectedCuisine("");
            setIsPlaceBasket(true);

            setTimeout(() => {
                setIsPlaceBasket(false);
            }, 1450);
        }

        setIsDenied(true);

        setTimeout(() => {
            setIsDenied(false);
        }, 2000);
    };

    const handleDecreaseQuantity = () => {
        orderQuantity > 0
            ? setOrderQuantity((prev) => prev - 1)
            : setOrderQuantity(0);
    };

    const handleIncreaseQuantity = () => {
        setOrderQuantity((prev) => prev + 1);
    };

    useEffect(() => {
        setPlaceOrders({
            category: selectedProduct?.category ? selectedProduct.category : "",
            food_name: selectedProduct?.food_name
                ? selectedProduct.food_name
                : "",
            img: selectedProduct?.img ? selectedProduct.img : "",
            quantity: orderQuantity,
            price: selectedProduct?.food_price
                ? selectedProduct.food_price * orderQuantity
                : 0,
            calories: selectedProduct?.calories
                ? selectedProduct.calories * orderQuantity
                : 0,
            waiting_time: selectedProduct?.waiting_time
                ? selectedProduct.waiting_time
                : 0,
            base_price: selectedProduct?.food_price
                ? selectedProduct.food_price
                : 0,
            base_calories: selectedProduct?.calories
                ? selectedProduct.calories
                : 0,
        });
    }, [orderQuantity]);

    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative`}
        >
            <div
                className={`${layout.head} flex flex-row justify-between px-6`}
            >
                <button
                    className="text-primary text-shadow-md active:scale-95 active:opacity-95 transition duration-150"
                    onClick={() => setSelectedCuisine("")}
                >
                    <ArrowBigLeft size={45} />
                </button>
                <button
                    onClick={() => setIsBasket(true)}
                    className="text-primary text-shadow-md active:scale-95 active:opacity-95 transition duration-150"
                >
                    <ShoppingBasket size={45} />
                </button>
            </div>
            <div
                className={`${layout["image-container"]} pointer-events-none translate-y-[-70px] min-[390px]:translate-y-[-60px] scale-90 min-[390px]:scale-100`}
            >
                <img
                    className="drop-shadow-lg"
                    src={`/images/products/${selectedProduct?.img}`}
                />
            </div>
            <div
                className={`${layout["food-title"]} flex flex-col justify-between pl-6`}
            >
                <div className="flex flex-col gap-[0.5]">
                    <h1 className="text-primary text-[1.3rem] min-[390px]:text-2xl whitespace-nowrap overflow-visible">
                        {selectedProduct?.food_name}
                    </h1>
                    <p className="text-white/50 font-extralight text-[0.7rem] min-[390px]:text-[0.8rem] leading-4">
                        {selectedProduct?.description}
                    </p>
                </div>
                <div className="pr-2 flex flex-row text-white/60 text-[0.7rem] min-[390px]:text-[0.8rem] font-extralight justify-between h-[3.35rem]">
                    <p className="flex flex-row items-center">
                        {selectedProduct?.calories
                            ? selectedProduct.calories * orderQuantity
                            : 0}
                        <Flame size={17} />
                    </p>
                    <p className="flex flex-row items-center">
                        {selectedProduct?.waiting_time}mins{" "}
                        <Hourglass size={17} />
                    </p>
                </div>
            </div>
            <div
                className={`${layout["food-price"]} pr-6 flex flex-col justify-between items-end`}
            >
                <h1 className="text-primary text-2xl min-[390px]:text-4xl text-shadow-md">
                    ₱{" "}
                    {selectedProduct?.food_price
                        ? selectedProduct.food_price * orderQuantity
                        : 0}
                </h1>

                <div className="relative [box-shadow:0_0_8px_rgba(0,0,0,0.5)_inset] bg-gradient-to-t rounded-4xl shadow-md  w-[7rem] h-[2.5rem] min-[390px]:w-[9.5rem] min-[390px]:h-[3.35rem] to-lightbrown from-darkbrown flex flex-row items-center justify-between px-4 text-primary">
                    <button
                        className="text-shadow-md text-4xl min-[390px]:text-5xl active:scale-95 active:opacity-95 transition duration-150"
                        onClick={handleDecreaseQuantity}
                    >
                        -
                    </button>
                    <p className="text-shadow-md">{orderQuantity}</p>
                    <button
                        className="text-shadow-md text-4xl min-[390px]:text-5xl active:scale-95 active:opacity-95 transition duration-150"
                        onClick={handleIncreaseQuantity}
                    >
                        +
                    </button>

                    {isDenied && (
                        <div className="pop-up-animation absolute top-1/2 left-1/2 translate-y-[-120%] translate-x-[-0%] w-fit text-white/78 text-shadow-md">
                            <MessageCircleWarning size={40} />
                        </div>
                    )}
                </div>
            </div>
            <div className={`${layout["food-detail"]} px-6`}>
                <div className="flex flex-row items-center justify-between">
                    {" "}
                    <h1 className="text-primary text-lg">Details</h1>
                    <p className="text-white/40 text-[0.8rem]">
                        stock:{" "}
                        {selectedProduct?.quantity
                            ? selectedProduct.quantity
                            : 0}
                    </p>
                </div>

                <p className="text-justify text-white/50 font-extralight text-[0.8rem]">
                    {selectedProduct?.details}
                </p>
            </div>
            <div className="absolute bottom-10 min-[390px]:bottom-20 w-full h-15 flex items-center justify-center z-20 ">
                <button
                    onClick={handlePlaceOrder}
                    className={`${isDenied && "button-shake-animation"} active:scale-95 active:opacity-95 transition duration-150 text-primary  px-20 py-2 bg-transparent backdrop-blur-[50px] [-webkit-backdrop-filter:blur(50px)] rounded-[10rem] border-1 border-white/10 shadow-lg`}
                >
                    Add to basket
                </button>
            </div>
            <div className="w-full h-[80%] bg-gradient-to-t from-[#0000009e] to-[#ffffff00] absolute bottom-0 z-[-1]"></div>
        </div>
    );
};

export default ProductDetails;

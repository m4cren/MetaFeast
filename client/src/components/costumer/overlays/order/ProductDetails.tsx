import layout from "../../../../styles/layouts/product_details.module.css";
import {
    ArrowBigLeft,
    ShoppingBasket,
    Flame,
    Hourglass,
    MessageCircleWarning,
} from "lucide-react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

import { ProductDetailsType, OrderType } from "../../../../types/types";
import { useEffect, useState } from "react";

interface Props {
    selectedCuisine: string;
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    productDetails: ProductDetailsType[];

    orders: OrderType[];
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
    setIsPlaceBasket: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetails = ({
    selectedCuisine,
    setSelectedCuisine,
    productDetails,
    orders,
    setOrders,
    setIsPlaceBasket,
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
        available_quantity: 0,
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
            }, 1000);
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
        if (selectedProduct) {
            if (orderQuantity < selectedProduct?.quantity)
                setOrderQuantity((prev) => prev + 1);
        }
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
            available_quantity: selectedProduct?.quantity
                ? selectedProduct.quantity
                : 0,
        });
    }, [orderQuantity]);

    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative overflow-clip`}
        >
            <div
                className={`${layout.head} flex flex-row justify-between px-6 min-[580px]:px-12`}
            >
                <button
                    className="text-primary text-shadow-md active:scale-95 active:opacity-95 min-[580px]:scale-200 transition duration-150"
                    onClick={() => setSelectedCuisine("")}
                >
                    <ArrowBigLeft size={40} />
                </button>
            </div>
            <div
                className={`${layout["image-container"]} pointer-events-none w-[20rem] flex items-center justify-center mx-auto scale-90 `}
            >
                <img
                    className="drop-shadow-lg scale-85   min-[390px]:scale-100 min-[580px]:scale-180"
                    src={`/images/products/${selectedProduct?.img}`}
                />
            </div>
            <div
                className={`${layout["food-title"]} flex flex-col justify-between pl-6 min-[580px]:pl-12 gap-1`}
            >
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary text-[1.3rem] min-[580px]:text-[2.5rem] min-[390px]:text-2xl whitespace-nowrap overflow-visible">
                        {selectedProduct?.food_name}
                    </h1>
                    <p className="text-[rgba(255,255,255,0.5)] min-[580px]:text-[1.1rem] min-[580px]:leading-5 font-extralight text-[0.65rem] min-[390px]:text-[0.75rem] leading-3">
                        {selectedProduct?.description}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-1 text-primary min-[580px]:scale-175 min-[580px]:pl-26">
                    {selectedProduct && selectedProduct.ratings > 4.75 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 4.25 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStarHalfStroke size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 3.75 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 3.25 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStarHalfStroke size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 2.75 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 2.25 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaStarHalfStroke size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 1.75 ? (
                        <>
                            <FaStar size={15} />
                            <FaStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 1.25 ? (
                        <>
                            <FaStar size={15} />
                            <FaStarHalfStroke size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 0.75 ? (
                        <>
                            <FaStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings > 0.25 ? (
                        <>
                            <FaStarHalfStroke size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : selectedProduct && selectedProduct.ratings >= 0 ? (
                        <>
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                            <FaRegStar size={15} />
                        </>
                    ) : null}
                </div>
                <div className="pr-2 flex flex-row text-[rgba(255,255,255,0.6)] text-[0.7rem] min-[580px]:text-[1.2rem] min-[390px]:text-[0.8rem] font-extralight justify-between h-[3.35rem]">
                    <p className="flex flex-row items-center gap-1 min-[580px]:gap-3">
                        {selectedProduct?.calories
                            ? selectedProduct.calories * orderQuantity
                            : 0}
                        <i className="min-[580px]:scale-150">
                            {" "}
                            <Flame size={15} />
                        </i>
                    </p>
                    <p className="flex flex-row items-center gap-1 min-[580px]:gap-3">
                        {selectedProduct?.waiting_time}mins{" "}
                        <i className="min-[580px]:scale-150">
                            <Hourglass size={15} />
                        </i>
                    </p>
                </div>
            </div>
            <div
                className={`${layout["food-price"]} pr-6 min-[580px]:pr-12 flex flex-col justify-between items-end`}
            >
                <h1 className="text-primary text-xl min-[580px]:text-[3rem] min-[390px]:text-3xl text-shadow-md">
                    ₱{" "}
                    {selectedProduct?.food_price
                        ? selectedProduct.food_price * orderQuantity
                        : 0}
                </h1>

                <div className="relative [box-shadow:0_0_8px_rgba(0,0,0,0.5)_inset] brown-gradient-to-b rounded-2xl shadow-md  w-[7rem] h-[2.25rem] min-[390px]:w-[9.5rem] min-[390px]:h-[3.2rem] min-[580px]:w-[14rem] min-[580px]:h-[4rem] flex flex-row items-center justify-between px-4 text-primary">
                    <button
                        className="text-shadow-md text-4xl min-[580px]:text-[4rem] min-[390px]:text-5xl active:scale-95 active:opacity-95 transition duration-150"
                        onClick={handleDecreaseQuantity}
                    >
                        -
                    </button>
                    <p className="text-shadow-md min-[580px]:text-[2rem]">
                        {orderQuantity}
                    </p>
                    <button
                        className="text-shadow-md text-4xl min-[580px]:text-[4rem] min-[390px]:text-5xl active:scale-95 active:opacity-95 transition duration-150"
                        onClick={handleIncreaseQuantity}
                    >
                        +
                    </button>

                    {isDenied && (
                        <div className="pop-up-animation absolute top-1/2 left-1/2 translate-y-[-120%] translate-x-[-0%] w-fit text-[rgba(255,255,255,0.78)] text-shadow-md">
                            <MessageCircleWarning size={40} />
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`${layout["food-detail"]} px-6 min-[580px]:px-12 pt-3 min-[390px]:pt-4 min-[580px]:mt-8`}
            >
                <div className="flex flex-row items-center justify-between ">
                    <h1 className="text-primary text-[0.85rem] min-[580px]:text-[1.5rem] min-[390px]:text-[0.95rem]">
                        Details
                    </h1>
                    <div className="flex flex-row items-center gap-6 ">
                        <p className="text-[rgba(255,255,255,0.7)] font-extralight text-[0.65rem] min-[580px]:text-[1.1rem]">
                            {selectedProduct &&
                                `Total Orders: ${selectedProduct.total_orders}`}
                        </p>
                        <p className="text-[rgba(255,255,255,0.7)] font-extralight text-[0.65rem] min-[580px]:text-[1.1rem]">
                            {selectedProduct?.quantity
                                ? `Stock: ${selectedProduct.quantity}`
                                : selectedProduct?.quantity === 0
                                  ? "Unavailable"
                                  : null}
                        </p>
                    </div>
                </div>

                <div className="leading-4 h-[8.5rem] min-[390px]:h-[12rem] overflow-y-scroll min-[580px]:leading-5 ">
                    <p className="text-justify text-[rgba(255,255,255,0.5)] font-extralight  min-[580px]:text-[1.1rem] text-[0.7rem] min-[390px]:text-[0.8rem]">
                        {selectedProduct?.details}
                    </p>
                </div>
            </div>
            <div className="absolute bottom-10 min-[390px]:bottom-20 w-full h-15 flex items-center justify-center z-20 ">
                <button
                    onClick={handlePlaceOrder}
                    className={`${isDenied && "button-shake-animation"} min-[580px]:py-3 min-[580px]:px-25 min-[580px]:text-[1.8rem] min-[580px]:mb-40 text-[1rem] min-[390px]:text-[1.1rem] flex flex-row items-center gap-2 green-gradient-to-b text-shadow-md active:scale-95 active:opacity-95 transition duration-150 text-primary  px-15 py-1 min[390px]:px-18  min[390px]py-2  bg-transparent backdrop-blur-[50px] [-webkit-backdrop-filter:blur(50px)] rounded-xl border-1 border-white/10 shadow-lg`}
                >
                    Add to basket
                    <ShoppingBasket size={30} />
                </button>
            </div>
            <div className="w-full h-[80%] black-to-transparent-gradient absolute bottom-0 z-[-1]"></div>
        </div>
    );
};

export default ProductDetails;

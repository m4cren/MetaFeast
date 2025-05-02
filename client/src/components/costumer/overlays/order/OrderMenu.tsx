import layout from "../../../../styles/layouts/order_menu.module.css";
import {
    ShoppingBasket,
    Sandwich,
    Apple,
    Utensils,
    Cherry,
    Beef,
    Wine,
    Croissant,
    Salad,
    Candy,
    LogOut,
} from "lucide-react";

import Category from "../../products/Category";

import React, { memo, useState } from "react";
import MainCourse from "../../products/SortedCuisine/MainCourse";
import Appetizers from "../../products/SortedCuisine/Appetizers";
import SavoryBreakfast from "../../products/SortedCuisine/SavoryBreakfast";
import HealthyOptions from "../../products/SortedCuisine/HealthyOptions";
import Desserts from "../../products/SortedCuisine/Desserts";
import SoupsAndSalads from "../../products/SortedCuisine/SoupsAndSalads";
import Beverages from "../../products/SortedCuisine/Beverages";
import Pastries from "../../products/SortedCuisine/Pastries";

import { ProductDetailsType } from "../../../../types/types";
import useTimeOfDay from "../../../../hooks/useTimeOfDay";

interface Props {
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    productDetails: ProductDetailsType[];
    isPlaceBasket: boolean;
    setIsBasket: React.Dispatch<React.SetStateAction<boolean>>;
    isOrderMore?: boolean;
    setIsOrderMore?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderMenu = ({
    setSelectedCuisine,
    productDetails,
    isPlaceBasket,
    setIsBasket,
    isOrderMore,
    setIsOrderMore,
}: Props) => {
    const [selected, setSelected] = useState<string>("Appetizers");
    const [name] = useState<string | null>(
        localStorage.getItem("costumer_name"),
    );
    const { timeOfDay } = useTimeOfDay();

    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative `}
        >
            {isPlaceBasket && (
                <div className="fixed z-20 place-order-animation top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] scale-160 min-[390px]:scale-190">
                    <img
                        src={`/images/products/${localStorage.getItem("last-product-placed")}`}
                        alt=""
                    />
                </div>
            )}

            <div
                className={`${layout.head} flex  justify-between px-4 items-center`}
            >
                <h1 className="text-primary font-medium text-[1.7rem] min-[390px]:text-[1.8rem] text-shadow-md">
                    Hi, {name}
                </h1>

                <p className="text-primary ">
                    {isOrderMore ? (
                        <LogOut
                            size={40}
                            opacity={80}
                            onClick={() => {
                                if (setIsOrderMore) {
                                    setIsOrderMore(false);
                                }
                            }}
                        />
                    ) : (
                        <Utensils size={40} opacity={80} />
                    )}
                </p>
            </div>
            <div className={`${layout.greet}`}>
                {isOrderMore ? (
                    <p className="text-primary opacity-80 text-[0.9rem] min-[390px]:text-[1.1rem] font-extralight text-shadow-lg px-4 flex items-center">
                        Additional order
                    </p>
                ) : (
                    <p className="text-primary opacity-80 text-[0.9rem] min-[390px]:text-[1.1rem] font-extralight text-shadow-lg px-4 flex items-center">
                        What do you want for <br />{" "}
                        {timeOfDay === "Madaling Araw" || timeOfDay === "Umaga"
                            ? "breakfast"
                            : timeOfDay === "Tanghali"
                              ? "lunch"
                              : timeOfDay === "Hapon" ||
                                  timeOfDay === "Gabi" ||
                                  timeOfDay === "Hating Gabi"
                                ? "dinner"
                                : null}
                        ?
                    </p>
                )}
            </div>
            <div
                className={`${layout.category} flex items-center gap-3 min-[390px]:gap-4   overflow-x-auto snap-proximity px-4`}
            >
                <span onClick={() => setSelected("Appetizers")}>
                    <Category
                        icon={Cherry}
                        category="Appetizers"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Main Course")}>
                    <Category
                        icon={Beef}
                        category="Main Course"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Beverages")}>
                    <Category
                        icon={Wine}
                        category="Beverages"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Pastries")}>
                    <Category
                        icon={Croissant}
                        category="Pastries"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Healthy Options")}>
                    <Category
                        icon={Apple}
                        category="Healthy Options"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Soups & Salads")}>
                    <Category
                        icon={Salad}
                        category="Soups & Salads"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Desserts")}>
                    <Category
                        icon={Candy}
                        category="Desserts"
                        selected={selected}
                    />
                </span>
                <span onClick={() => setSelected("Savory")}>
                    <Category
                        icon={Sandwich}
                        category="Savory"
                        selected={selected}
                    />
                </span>
            </div>
            <div
                className={`${layout.cuisine} flex flex-col items-center gap-3 min-[390px]:mt-4`}
            >
                <h1 className="text-[0.9rem] font-light min-[390px]:text-[1.3rem] text-primary text-shadow-md">
                    {selected}
                </h1>
                <div
                    className={`${layout["cuisine-container"]} overflow-y-scroll pb-80 scroll-smooth [mask-image:linear-gradient(to_top,transparent,black_60%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_90%)]`}
                >
                    {selected === "Appetizers" ? (
                        <Appetizers
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Main Course" ? (
                        <MainCourse
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Beverages" ? (
                        <Beverages
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Pastries" ? (
                        <Pastries
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Healthy Options" ? (
                        <HealthyOptions
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Soups & Salads" ? (
                        <SoupsAndSalads
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Desserts" ? (
                        <Desserts
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : selected === "Savory" ? (
                        <SavoryBreakfast
                            setSelectedCuisine={setSelectedCuisine}
                            productDetails={productDetails}
                        />
                    ) : null}
                </div>
            </div>
            <div className="absolute left-1/2 bottom-[4%] min-[390px]:bottom-[7%] translate-x-[-50%] translate-y-[-50%] z-1">
                <button
                    style={{ border: "solid 1px rgba(255,255,255,0.1)" }}
                    onClick={() => {
                        setIsBasket(true);
                    }}
                    className="active:scale-95 active:opacity-95 transition duration-150 text-primary px-30 min-[390px]:py-3 py-2 bg-transparent backdrop-blur-[30px] [-webkit-backdrop-filter:blur(30px)] rounded-[10rem] "
                >
                    <ShoppingBasket size={30} />
                </button>
            </div>
            <div className="w-full h-1/3 black-to-transparent-gradient absolute bottom-0 pointer-events-none"></div>
        </div>
    );
};

export default memo(OrderMenu);

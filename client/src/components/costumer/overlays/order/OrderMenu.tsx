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
} from "lucide-react";

import Category from "../../products/Category";

import { memo, useState } from "react";
import MainCourse from "../../products/SortedCuisine/MainCourse";
import Appetizers from "../../products/SortedCuisine/Appetizers";
import SavoryBreakfast from "../../products/SortedCuisine/SavoryBreakfast";
import HealthyOptions from "../../products/SortedCuisine/HealthyOptions";
import Desserts from "../../products/SortedCuisine/Desserts";
import SoupsAndSalads from "../../products/SortedCuisine/SoupsAndSalads";
import Beverages from "../../products/SortedCuisine/Beverages";
import Pastries from "../../products/SortedCuisine/Pastries";

interface OrderMenuProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const OrderMenu = ({ selected, setSelected }: OrderMenuProps) => {
    const [name] = useState<string | null>(
        localStorage.getItem("costumer_name"),
    );

    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative `}
        >
            <div
                className={`${layout.head} flex  justify-between px-4 items-center`}
            >
                <h1 className="text-primary font-medium text-4xl text-shadow-lg">
                    Hi, {name}
                </h1>

                <p className="text-primary text-">
                    <Utensils size={40} />
                </p>
            </div>
            <div className={`${layout.greet}`}>
                <p className="text-primary opacity-80 text-[1.2rem] font-extralight text-shadow-lg px-4 flex items-center">
                    What do you want for <br /> dinner?
                </p>
            </div>
            <div
                className={`${layout.category} flex items-center space-x-4  overflow-x-auto snap-proximity px-4`}
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
                className={`${layout.cuisine} flex flex-col items-center gap-4 mt-4`}
            >
                <h1 className="text-primary text-shadow-lg">{selected}</h1>
                <div
                    className={`${layout["cuisine-container"]} overflow-y-scroll pb-80 scroll-smooth [mask-image:linear-gradient(to_top,transparent,black_60%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_90%)]`}
                >
                    {selected === "Appetizers" ? (
                        <Appetizers />
                    ) : selected === "Main Course" ? (
                        <MainCourse />
                    ) : selected === "Beverages" ? (
                        <Beverages />
                    ) : selected === "Pastries" ? (
                        <Pastries />
                    ) : selected === "Healthy Options" ? (
                        <HealthyOptions />
                    ) : selected === "Soups & Salads" ? (
                        <SoupsAndSalads />
                    ) : selected === "Desserts" ? (
                        <Desserts />
                    ) : selected === "Savory" ? (
                        <SavoryBreakfast />
                    ) : null}
                </div>
            </div>
            <div className="absolute left-1/2 bottom-[7%] translate-x-[-50%] translate-y-[-50%] z-1">
                <button className="text-primary px-30 py-3 bg-transparent backdrop-blur-[30px] [-webkit-backdrop-filter:blur(30px)] rounded-[10rem] border-1 border-white/10">
                    <ShoppingBasket size={30} />
                </button>
            </div>
            <div className="w-full h-1/3 bg-gradient-to-t from-[black] to-[#ffffff00] absolute bottom-0"></div>
        </div>
    );
};

export default memo(OrderMenu);

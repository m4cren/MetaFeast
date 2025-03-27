import layout from "../../../../styles/layouts/order_menu.module.css";
import { ShoppingBasket } from "lucide-react";
import { Utensils } from "lucide-react";
import Category from "../../products/Category";
import { Cherry } from "lucide-react";
import { Beef } from "lucide-react";
import { Wine } from "lucide-react";
import { Croissant } from "lucide-react";
import { Soup } from "lucide-react";
import { Salad } from "lucide-react";
import { Candy } from "lucide-react";

const OrderMenu = () => {
    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative `}
        >
            <div
                className={`${layout.head} flex  justify-between px-4 items-center`}
            >
                <h1 className="text-primary font-medium text-4xl text-shadow-lg">
                    Hi, Rainier
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
                <Category icon={Cherry} category="Appetizers" />
                <Category icon={Beef} category="Main Course" />
                <Category icon={Wine} category="Beverages" />
                <Category icon={Croissant} category="Pastries" />
                <Category icon={Soup} category="Soups" />
                <Category icon={Salad} category="Salads" />
                <Category icon={Candy} category="Desserts" />
            </div>
            <div
                className={`${layout.cuisine} flex flex-col items-center gap-4 mt-4`}
            >
                <h1 className="text-primary text-shadow-lg">Main Course</h1>
                <div
                    className={`${layout["cuisine-container"]} overflow-y-scroll pb-80 scroll-smooth [mask-image:linear-gradient(to_top,transparent,black_60%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_90%)]`}
                >
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
                    <div className="w-[10rem] h-[10rem] bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]"></div>
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

export default OrderMenu;

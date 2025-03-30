import layout from "../../../../styles/layouts/order_list.module.css";
import { ArrowBigLeft, Utensils } from "lucide-react";

interface OrderListProps {
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    setIsBasket: React.Dispatch<React.SetStateAction<boolean>>;
}
const OrderList = ({ setSelectedCuisine, setIsBasket }: OrderListProps) => {
    return (
        <div
            className={`${layout.main}  w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative`}
        >
            <div
                className={`${layout.head} px-6 flex flex-row items-center justify-between`}
            >
                <button
                    className="text-primary text-shadow-md"
                    onClick={() => {
                        setSelectedCuisine("");
                        setIsBasket(false);
                    }}
                >
                    <ArrowBigLeft size={45} />
                </button>
                <h1 className="text-primary text-3xl text-shadow-md">Basket</h1>
                <p className="text-primary text-shadow-md">
                    <Utensils size={40} />
                </p>
            </div>
            <div
                className={`${layout["order-list"]}  pt-8 overflow-y-scroll [mask-image:linear-gradient(to_top,transparent,black_60%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_90%)]`}
            >
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
                <div className="bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237] w-[90%] h-27 m-auto"></div>
            </div>
            <div className="z-10 absolute bottom-0 w-[80vw] h-fit p-4 flex flex-col gap-5 shadow-2xl  left-1/2 translate-y-[-40%] translate-x-[-50%]  backdrop-blur-[40px] [-webkit-backdrop-blur:40px] border-1 border-white/10 rounded-2xl">
                <div>
                    <h2 className="flex flex-row items-center justify-between text-[1.1rem] text-white font-light">
                        <span>Total Cost:</span>
                        <span className="text-white/70 font-extralight">
                            ₱ 129
                        </span>
                    </h2>
                    <h2 className="flex flex-row items-center justify-between  text-[1.1rem] text-white font-light">
                        <span>Waiting Time:</span>
                        <span className="text-white/70 font-extralight">
                            30mins
                        </span>
                    </h2>
                    <h2 className="flex flex-row items-center justify-between  text-[1.1rem] text-white font-light">
                        <span>Total Energy:</span>
                        <span className="text-white/70 font-extralight">
                            1286cal
                        </span>
                    </h2>
                </div>
                <div className="flex w-full justify-center items-center">
                    <button className="bg-gradient-to-b px-20 from-[#1F8400] to-[#075500] p-2 rounded-4xl text-primary text-shadow-md shadow-2xl">
                        Checkout
                    </button>
                </div>
            </div>
            <div className="w-full h-1/3 bg-gradient-to-t from-[black] to-[#ffffff00] absolute bottom-0 pointer-events-none"></div>
        </div>
    );
};

export default OrderList;

import { useEffect, useState } from "react";
import { PendingOrderType } from "../../../types/types";
import {
    ScrollText,
    History,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Check } from "lucide-react";
import layout from "../../../styles/layouts/pending_orders.module.css";

interface PendingOrderDetailProps {
    pendingOrderDetails?: PendingOrderType | null;
    setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const PendingOrderDetails = ({
    pendingOrderDetails,
    setIsToggle,
}: PendingOrderDetailProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [adjust, setAdjust] = useState<number>(0);
    const [maxLenght, setMaxLength] = useState<number>(0);

    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        if (pendingOrderDetails) {
            setMaxLength(pendingOrderDetails?.orders.length - 1);
        }
    }, []);
    const handleNext = () => {
        if (selected < maxLenght) {
            setSelected((prev) => prev + 1);
            setAdjust((prev) => prev - 100);
        }
    };
    const handlePrev = () => {
        if (selected <= 0) {
            setSelected(0);
        } else {
            setSelected((prev) => prev - 1);
            setAdjust((prev) => prev + 100);
        }
    };
    console.log(adjust);
    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div className="w-[40vw] h-[55vh] relative">
                <div className="z-5 flex flex-row items-center justify-between pl-14 pr-8 absolute top-0 rounded-3xl bg-gradient-to-t from-darkbrown to-lightbrown w-full h-[4.5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                    <div>
                        <div className="text-primary text-shadow-md flex flex-row gap-2 items-center">
                            <h1 className="text-[1.55rem] font-normal text-shadow-md">
                                {pendingOrderDetails?.costumer_name}'s order
                                list
                            </h1>
                            <p className="opacity-85">
                                <ScrollText size={30} />
                            </p>
                        </div>
                        <div className="flex flex-row items-center text-primary gap-2 opacity-65">
                            <History size={15} />
                            <p className="text-[0.8rem] font-extralight ">
                                {pendingOrderDetails?.order_time}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setIsClose(true);
                            setTimeout(() => {
                                setIsToggle(false);
                                setIsClose(false);
                            }, 450);
                        }}
                        className=" text-white/75 cursor-pointer hover:scale-105 transition duration-100 active:scale-95 drop-shadow-md"
                    >
                        <LogOut size={30} />
                    </button>
                </div>
                <div className="flex flex-row justify-center px-4 gap-4">
                    <div
                        className={`${isClose && "left-scroll-close-animation"} px-6 pt-[6rem] pb-4 left-scroll-animation h-[33rem] bg-gradient-to-t rounded-bl-3xl rounded-br-3xl from-darkbrown to-lightbrown w-[53%] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
                    >
                        <div
                            className={`${isClose && "text-close-animation"} text-drop-animation h-[10%] opacity-0 text-white/80 grow-1 text-shadow-md border-b-2 border-white/20 py-2 font-light text-[1rem] flex flex-row items-center justify-between`}
                        >
                            <h1>Food Name</h1>
                            <h1>Quantity</h1>
                        </div>
                        <div className=" h-[80%] py-4">
                            {pendingOrderDetails?.orders.map(
                                ({ food_name, quantity }, index) => (
                                    <li
                                        key={index}
                                        className={`${isClose && "text-close-animation"} text-drop-animation opacity-0 list-none text-white/60 font-extralight flex flex-row justify-between text-[0.85rem]`}
                                    >
                                        <h1>{food_name}</h1> <p>{quantity}x</p>
                                    </li>
                                ),
                            )}
                        </div>
                        <div
                            className={`${isClose && "text-close-animation"} text-drop-animation opacity-0 h-[10%] flex gap-1 flex-row items-center justify-between w-100%`}
                        >
                            <div className="text-primary flex flex-row items-center justify-between px-2 w-[75%] rounded-tl-2xl h-10 rounded-bl-2xl border-1 border-white/10">
                                <h1 className="text-[0.9rem] font-light">
                                    Total waiting time:
                                </h1>
                                <h1 className="text-[0.9rem] font-extralight text-white/70">
                                    {pendingOrderDetails?.total_waiting_time}
                                    mins
                                </h1>
                            </div>
                            <div className="w-[25%] drop-shadow-sm ">
                                <button className="text-primary cursor-pointer flex items-center justify-center rounded-tr-2xl w-full h-10 rounded-br-2xl bg-gradient-to-b from-darkgreen to-lightgreen">
                                    <Check size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${isClose && "right-scroll-close-animation"} ${layout["right-aside"]}  overflow-x-hidden custom-scrollbar pt-[5rem] px-2 pb-2 right-scroll-animation h-[25rem] bg-gradient-to-t rounded-bl-3xl rounded-br-3xl from-darkbrown to-lightbrown w-[40%] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
                    >
                        <div
                            className={`${layout.head} flex flex-col px-10 justify-end ${isClose && "text-close-animation"} text-drop-animation `}
                        >
                            <h1 className="text-primary text-[1.25rem] text-shadow-md leading-5">
                                {
                                    pendingOrderDetails?.orders[selected]
                                        .food_name
                                }
                            </h1>
                            <p className="text-white/65 text-[0.75rem] text-shadow-md">
                                {
                                    pendingOrderDetails?.orders[selected]
                                        .food_category
                                }
                            </p>
                        </div>
                        <div
                            className={`${layout.main} flex flex-row  relative px-5 max-w-fit items-center ${isClose && "text-close-animation"} text-drop-animation `}
                        >
                            {pendingOrderDetails?.orders.map(
                                ({ img }, index, orders) => (
                                    <img
                                        key={index}
                                        className={`${orders[selected].img !== img ? "scale-50 opacity-30 blur-[2px]" : "scale-125"} transition duration-150 drop-shadow-md translate-x-[${adjust}%]`}
                                        src={`/images/products/${img}`}
                                    />
                                ),
                            )}
                        </div>
                        {selected !== 0 && (
                            <div
                                onClick={handlePrev}
                                className={`${layout["left-btn"]} ${isClose && "text-close-animation"} z-1 text-shadow-md flex items-center text-white/70 cursor-pointer hover:scale-110 transition duration-100`}
                            >
                                <ChevronLeft size={38} />
                            </div>
                        )}
                        {selected < maxLenght && (
                            <div
                                onClick={handleNext}
                                className={`${layout["right-btn"]} ${isClose && "text-close-animation"}  z-1 text-shadow-md flex items-center text-white/70 cursor-pointer hover:scale-110 transition duration-100`}
                            >
                                <ChevronRight size={38} />
                            </div>
                        )}

                        <div
                            className={`${layout["quantity-container"]} ${isClose && "text-close-animation"} text-drop-animation flex flex-row justify-between items-start text-shadow-md`}
                        >
                            <p className="text-primary text-[0.9rem] font-light">
                                Quantity:
                            </p>
                            <p className="text-white/75 text-[0.85rem] font-extralight">
                                {pendingOrderDetails?.orders[selected].quantity}
                                x
                            </p>
                        </div>
                        <div
                            className={`${layout["available-container"]} ${isClose && "text-close-animation"} text-drop-animation flex items-center px-10`}
                        >
                            <p className="text-white/90 text-[0.85rem] font-light text-shadow-md">
                                Available: 25
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingOrderDetails;

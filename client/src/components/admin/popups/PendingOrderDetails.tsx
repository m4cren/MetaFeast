import { useState } from "react";
import { PendingOrderType } from "../../../types/types";
import { ScrollText, History, LogOut } from "lucide-react";
import { Check } from "lucide-react";

interface PendingOrderDetailProps {
    pendingOrderDetails?: PendingOrderType | null;
    setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const PendingOrderDetails = ({
    pendingOrderDetails,
    setIsToggle,
}: PendingOrderDetailProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);

    return (
        // <div className="w-1/2 h-[30rem] bg-[#f3f3f3] relative rounded-2xl pop-up-animation ">
        //     <button
        //         onClick={() => setIsToggle(false)}
        //         className="absolute top-2 left-2 border-1 border-white/10 rounded-2xl cursor-pointer"
        //     >
        //         <ArrowBigLeft size={40} />
        //     </button>
        //     <h1 className="text-dark-primary text-center">
        //         {pendingOrderDetails?.costumer_name}'s orders
        //     </h1>
        //     <ul>
        //         {pendingOrderDetails?.orders.map(
        //             (
        //                 { food_name, price, quantity, food_category, img },
        //                 index,
        //             ) => (
        //                 <li key={index}>
        //                     <h1>{food_name}</h1>
        //                     <h1></h1>
        //                     <div>
        //                         <p>{quantity}</p>
        //                         <p>₱ {price}</p>
        //                         <p></p>
        //                     </div>
        //                 </li>
        //             ),
        //         )}
        //     </ul>
        // </div>

        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div className="w-[40vw] h-[55vh] relative">
                <div className="pop-up-animation z-5 flex flex-row items-center justify-between px-8 absolute top-0 rounded-3xl bg-gradient-to-t from-darkbrown to-lightbrown w-full h-[4.5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                    <div>
                        <div className="text-primary text-shadow-md flex flex-row gap-2">
                            <h1 className="text-[1.5rem] font-medium text-shadow-md">
                                {pendingOrderDetails?.costumer_name}'s order
                                list
                            </h1>
                            <ScrollText size={35} />
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
                        <div className="h-[10%] text-white/80 grow-1 text-shadow-md border-b-2 border-white/20 py-2 font-light text-[1rem] flex flex-row items-center justify-between">
                            <h1>Food Name</h1>
                            <h1>Quantity</h1>
                        </div>
                        <div className="h-[80%] py-4">
                            {pendingOrderDetails?.orders.map(
                                ({ food_name, quantity }) => (
                                    <li className="list-none text-white/60 font-extralight flex flex-row justify-between text-[0.85rem]">
                                        <h1>{food_name}</h1> <p>{quantity}x</p>
                                    </li>
                                ),
                            )}
                        </div>
                        <div className="h-[10%] flex gap-2 flex-row items-center justify-between w-100%">
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
                        className={`${isClose && "right-scroll-close-animation"} pt-[6rem] right-scroll-animation h-[25rem] bg-gradient-to-t rounded-bl-3xl rounded-br-3xl from-darkbrown to-lightbrown w-[40%] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PendingOrderDetails;

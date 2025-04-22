import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { Search, LogOut, ListEnd, ListStart } from "lucide-react";
import { HistoryType } from "../../../types/types";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import html2canvas from "html2canvas";

interface HistoryProps {
    setIsHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

const History = ({ setIsHistory }: HistoryProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [isShowAll, setIsShowAll] = useState<boolean>(false);
    const [historyList, setIsHistoryList] = useState<HistoryType[]>([]);
    const [filteredHistoryList, setIsFilteredHistoryList] = useState<
        HistoryType[]
    >([]);
    const { server } = useServerAddress();

    const [searchName, setSearchName] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value);
    };
    const printRef = useRef<HTMLDivElement>(null);
    const [isGenerateImg, setIsGenerateImg] = useState<boolean>(false);
    const handleSaveAsImage = async () => {
        if (printRef.current) {
            const canvas = await html2canvas(printRef.current);
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = `history_list.png`;
            link.click();
        }
    };

    const handleClose = () => {
        setIsClose(true);

        setTimeout(() => {
            setIsHistory(false);
            setIsClose(false);
        }, 180);
    };

    useEffect(() => {
        const newList = historyList.filter(
            ({ costumer_name, payment_id }) =>
                costumer_name
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) ||
                payment_id.toLowerCase().includes(searchName.toLowerCase()),
        );

        setIsFilteredHistoryList(newList);
    }, [searchName]);

    useEffect(() => {
        setIsFilteredHistoryList(historyList);
    }, [historyList]);

    useEffect(() => {
        console.log(filteredHistoryList);
    }, [filteredHistoryList]);

    useEffect(() => {
        fetchHistoryList();
    }, []);

    const fetchHistoryList = async () => {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            const response = await axios.get(`${server}/admin/fetch-history`, {
                headers,
            });

            if (response.data.status) {
                setIsHistoryList(response.data.histories);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div
                className={`${isClose && "pop-close-animation"} pop-up-animation w-[65vw] py-8 px-15 h-[80vh] bg-gradient-to-b from-darkbrown to-lightbrown rounded-tl-3xl rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <div className="flex flex-row items-center justify-between  py-2">
                    <div className="relative flex flex-row items-center gap-8">
                        <h1 className="text-primary text-[2rem] font-medium">
                            History
                        </h1>
                        <div className="flex flex-row items-center gap-1 text-primary w-[18rem] cursor-pointer ">
                            <Search size={30} />
                            <input
                                onChange={handleChange}
                                name="search_name"
                                type="text"
                                id="search_name"
                                placeholder="Costumer name or Payment ID"
                                className="text-[0.75rem] border-white/20 border-1 rounded-md w-full text-secondary outline-none px-2 py-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        {isShowAll && (
                            <button
                                onClick={() => setIsGenerateImg(true)}
                                className="text-secondary border-1 outline-none border-white/20 rounded-md px-4 py-1 cursor-pointer"
                            >
                                Generate history list
                            </button>
                        )}
                        {isGenerateImg && (
                            <div className="fixed top-0 left-0 bottom-0 gap-2 right-0 flex flex-col items-center justify-center bg-black/40 z-20">
                                <div
                                    ref={printRef}
                                    className=" w-[60vw] h-fit px-10 py-6  bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5] rounded-md"
                                >
                                    <li className="flex px-4 border-b-2 border-[#2c2c2c40] py-2 flex-row items-start justify-between text-[#2c2c2c]">
                                        <div className=" flex flex-row w-[40%] justify-between items-center">
                                            <p>Date & Time</p>
                                            <div className=" flex flex-row items-center gap-2">
                                                <p>Payment Type</p>
                                            </div>
                                        </div>
                                        <div>Orders</div>
                                        <div className="flex flex-row items-center gap-4">
                                            <p>Costumer Info</p>
                                        </div>
                                    </li>
                                    <ul className="flex flex-col gap-2 py-4  h-[40rem] overflow-y-scroll thin-scrollbar">
                                        {filteredHistoryList.map(
                                            (
                                                {
                                                    costumer_name,
                                                    dine_time,
                                                    orders,
                                                    payment_id,
                                                    payment_method,
                                                    table_seated,
                                                    total_order_items,
                                                    total_payment,
                                                },
                                                index,
                                            ) => (
                                                <li
                                                    key={index}
                                                    className="flex px-4 py-2 flex-row items-start justify-between border-1 rounded-2xl list-none border-[#2c2c2c40] text-[#2c2c2c]"
                                                >
                                                    <div className=" flex flex-row w-[40%] justify-between items-center">
                                                        <p>{dine_time}</p>
                                                        <div className=" flex flex-row items-center w-[10rem] justify-between">
                                                            <p>
                                                                ₱{" "}
                                                                {total_payment}
                                                            </p>
                                                            <p>
                                                                {payment_method}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${isShowAll ? "max-h-fit" : "max-h-10 "} flex flex-col items-start w-[10rem]  min-h-10 overflow-y-scroll`}
                                                    >
                                                        {orders.map(
                                                            (
                                                                {
                                                                    food_name,
                                                                    quantity,
                                                                },
                                                                index,
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex flex-row items-center justify-between gap-6 text-[0.7rem]  w-full"
                                                                >
                                                                    <p>
                                                                        {
                                                                            food_name
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            quantity
                                                                        }
                                                                        x
                                                                    </p>
                                                                </div>
                                                            ),
                                                        )}
                                                        <p className="text-[0.7rem] flex flex-row items-center justify-end text-[#2c2c2c] border-t-1 border-[#2c2c2c30] w-full">
                                                            Total:{" "}
                                                            {total_order_items}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row items-start gap-4">
                                                        <p>{costumer_name}</p>
                                                        <div className="text-[0.7rem]">
                                                            <p>{payment_id}</p>
                                                            <p className="-mt-1">
                                                                {table_seated}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        handleSaveAsImage();
                                        setIsGenerateImg(false);
                                    }}
                                    className="cursor-pointer text-primary bg-gradient-to-b from bg-darkgreen to-lightgreen rounded-xl  px-8 py-2"
                                >
                                    Print current screen
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setIsShowAll(!isShowAll)}
                            className="text-primary opacity-80 cursor-pointer"
                        >
                            {isShowAll ? (
                                <ListEnd size={30} />
                            ) : (
                                <ListStart size={30} />
                            )}
                        </button>
                        <button
                            className="text-primary opacity-80 cursor-pointer"
                            onClick={handleClose}
                        >
                            <LogOut />
                        </button>
                    </div>
                </div>
                <div className="border-b-2 border-lightbrown/40 py-2 text-white/85 font-extralight ">
                    <li className="flex px-4 py-2 flex-row items-start justify-between ">
                        <div className=" flex flex-row w-[40%] justify-between items-center">
                            <p>Date & Time</p>
                            <div className=" flex flex-row items-center gap-2">
                                <p>Payment Type</p>
                            </div>
                        </div>
                        <div>Orders</div>
                        <div className="flex flex-row items-center gap-4">
                            <p>Costumer Info</p>
                        </div>
                    </li>
                </div>
                <div>
                    <ul className="flex flex-col py-4 gap-2 h-[33rem]  overflow-y-scroll thin-scrollbar text-[0.9rem] font-extralight ">
                        {filteredHistoryList.map(
                            (
                                {
                                    costumer_name,
                                    dine_time,
                                    orders,
                                    payment_id,
                                    payment_method,
                                    table_seated,
                                    total_order_items,
                                    total_payment,
                                },
                                index,
                            ) => (
                                <li
                                    key={index}
                                    className="flex px-4 py-2 flex-row items-start justify-between border-1 rounded-2xl list-none border-white/20 text-secondary"
                                >
                                    <div className=" flex flex-row w-[40%] justify-between items-center">
                                        <p>{dine_time}</p>
                                        <div className=" flex flex-row items-center w-[10rem] justify-between">
                                            <p>₱ {total_payment}</p>
                                            <p>{payment_method}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`${isShowAll ? "max-h-fit" : "max-h-10 "} flex flex-col items-start w-[10rem]  min-h-10 overflow-y-scroll`}
                                    >
                                        {orders.map(
                                            (
                                                { food_name, quantity },
                                                index,
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-row items-center justify-between gap-6 text-[0.7rem]  w-full"
                                                >
                                                    <p>{food_name}</p>
                                                    <p>{quantity}x</p>
                                                </div>
                                            ),
                                        )}
                                        <p className="text-[0.7rem] flex flex-row items-center justify-end text-white/60 border-t-1 border-white/30 w-full">
                                            Total: {total_order_items}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-start gap-4">
                                        <p>{costumer_name}</p>
                                        <div className="text-[0.7rem]">
                                            <p>{payment_id}</p>
                                            <p className="-mt-1">
                                                {table_seated}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(History);

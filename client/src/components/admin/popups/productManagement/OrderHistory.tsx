import { ListEnd, Search, ListStart } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import useServerAddress from "../../../../../useServerAddress";
import { HistoryType } from "../../../../types/types";
import axios from "axios";

const OrderHistory = () => {
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
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col leading-6">
                    <h1 className="text-primary text-[1.75rem]">
                        Order History
                    </h1>
                    <p className=" text-[0.75rem] font-extralight text-white/60">
                        List of all costumer in the past
                    </p>
                </div>
                <div className="flex flex-row items-center gap-3">
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

                    <div className="relative">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="search_name"
                            id="search_name"
                            placeholder="Search costumer or payment id"
                            className="w-[16rem] py-2 border-white/20 rounded-sm text-[0.8rem] pl-8 border-1 text-white/60 outline-none "
                        />
                        <i className="text-white/60 absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2">
                            <Search size={20} />
                        </i>
                    </div>
                </div>
            </div>

            <div className="mt-[2rem] pb-1 flex flex-row items-end justify-between text-[0.9rem] text-white/70 font-extralight  border-b-2 border-darkbrown/50">
                <p>Date & Time</p>
                <p>Payment Type</p>
                <p>Orders</p>
                <p>Costumer Info</p>
            </div>
            <div>
                <ul className="flex flex-col py-4 gap-2 h-[25rem]  overflow-y-scroll thin-scrollbar text-[0.9rem] font-extralight ">
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
                                className="flex px-2 py-2 flex-row items-start justify-between border-1 rounded-2xl list-none border-white/20 text-secondary"
                            >
                                <div className=" flex flex-row w-[40%] justify-between items-center">
                                    <p className="text-[0.75rem]">
                                        {dine_time}
                                    </p>
                                    <div className="text-[0.75rem] flex flex-row items-center w-[10rem] justify-between">
                                        <p>₱ {total_payment}</p>
                                        <p>{payment_method}</p>
                                    </div>
                                </div>
                                <div
                                    className={`${isShowAll ? "max-h-fit" : "max-h-10 "} flex flex-col items-start w-[10rem]  min-h-10 overflow-y-scroll`}
                                >
                                    {orders.map(
                                        ({ food_name, quantity }, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-row items-center justify-between gap-6 text-[0.65rem]  w-full"
                                            >
                                                <p>{food_name}</p>
                                                <p>{quantity}x</p>
                                            </div>
                                        ),
                                    )}
                                    <p className="text-[0.65rem] flex flex-row items-center justify-end text-white/60 border-t-1 border-white/30 w-full">
                                        Total: {total_order_items}
                                    </p>
                                </div>
                                <div className="flex flex-row items-start gap-4">
                                    <p className="text-[0.75rem]">
                                        {costumer_name}
                                    </p>
                                    <div className="text-[0.65rem]">
                                        <p>{payment_id}</p>
                                        <p className="-mt-1">{table_seated}</p>
                                    </div>
                                </div>
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OrderHistory;

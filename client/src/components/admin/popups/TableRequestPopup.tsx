import {
    LogOut,
    History,
    CircleX,
    CircleCheck,
    ShoppingBasket,
    Drumstick,
    HandCoins,
    ListFilter,
    UserX,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import { CurrentCostumerType } from "../../../types/types";

interface Props {
    setIsTableRequest: React.Dispatch<React.SetStateAction<boolean>>;
    handleAccept: (tableSelected: string, costumerName: string) => void;
    setIsDenyConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    setCostumerName: React.Dispatch<React.SetStateAction<string>>;
    setTableSelected: React.Dispatch<React.SetStateAction<string>>;
}

type RequestType = {
    costumer_name: string;
    table_selected: string;
    message: string;
    time_ago: string;
};

const TableRequestPopup = ({
    setIsTableRequest,
    handleAccept,
    setIsDenyConfirm,
    setCostumerName,
    setTableSelected,
}: Props) => {
    const [requestMessage, setRequestMessage] = useState<RequestType[]>([]);
    const [isRemoveCostumer, setIsRemoveCostumer] = useState<boolean>(false);

    const [isClose, setIsClose] = useState<boolean>(false);
    const [currentCostumers, setCurrentCostumers] = useState<
        CurrentCostumerType[]
    >([]);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("all");
    const { server } = useServerAddress();
    const { getTableStatus } = useTableStatus() ?? {
        getTableStatus: () => {},
    };
    const refetchData = () => {
        setTimeout(() => {
            getTableStatus();
            fetchCurrentCostumers();
        }, 850);
    };

    useEffect(() => {
        fetchCurrentCostumers();
        fetchRequestMessage();
    }, []);

    const filterCurrentCostumer = (filter: string) => {
        if (filter === "all") return currentCostumers;

        const filteredCurrentCostumer = currentCostumers.filter(
            ({ current_table, status }) =>
                current_table.includes(filter, 0) || status === filter,
        );
        return filteredCurrentCostumer;
    };

    const fetchRequestMessage = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await axios.get(`${server}/admin/table-request`, {
                headers,
                withCredentials: false,
            });

            const dataMessage = response.data.response;

            setRequestMessage(dataMessage);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCurrentCostumers = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await axios.get(
                `${server}/admin/current-costumers`,
                {
                    headers,
                    withCredentials: false,
                },
            );

            setCurrentCostumers(response.data.current_costumers);
        } catch (error) {
            console.log(error);
        }
    };

    const [isCostumerRemoveConfirmation, setIsCostumerRemoveConfirmation] =
        useState<boolean>(false);
    const [isRemoveConfirmClose, setIsRemoveConfirmClose] =
        useState<boolean>(false);

    const [costumerToRemove, setCostumerToRemove] = useState<{
        name: string;
        table_id: string;
    }>({
        name: "",
        table_id: "",
    });

    const handleClose = () => {
        setIsRemoveConfirmClose(true);
        setTimeout(() => {
            setIsCostumerRemoveConfirmation(false);
            setIsRemoveConfirmClose(false);
            setCostumerToRemove({
                name: "",
                table_id: "",
            });
        }, 200);
    };

    const handleRemoveCostumer = (name: string, tableID: string) => {
        setIsCostumerRemoveConfirmation(true);
        setCostumerToRemove({
            name: name,
            table_id: tableID,
        });
    };

    const removeCostumer = async () => {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            const response = await axios.post(
                `${server}/admin/remove-costumer`,

                costumerToRemove,

                {
                    headers,
                },
            );
            if (response.data.status) {
                fetchCurrentCostumers();
                getTableStatus();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            {isCostumerRemoveConfirmation && (
                <div className="fixed top-0 bg-black/40 z-10 bottom-0 left-0 right-0 flex items-center justify-center">
                    <div
                        className={`${isRemoveConfirmClose && "pop-close-animation"} pop-up-animation [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)] w-[45rem] h-fit items-center flex p-12 flex-col rounded-xl gap-6 brown-gradient-to-b`}
                    >
                        <h1 className="text-primary text-center text-[1.5rem] text-shadow-md ">
                            Are you sure to remove '
                            <strong>{costumerToRemove.name}</strong>' seated on{" "}
                            <strong>{costumerToRemove.table_id}</strong>
                        </h1>

                        <div className="flex flex-row items-center gap-4">
                            <button
                                onClick={() => {
                                    handleClose();
                                }}
                                style={{
                                    border: "1px solid rgba(255,255,255,0.2)",
                                }}
                                className="rounded-lg cursor-pointer text-[rgba(255,255,255,0.7)] px-5 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    removeCostumer();
                                    handleClose();
                                }}
                                className="rounded-lg cursor-pointer text-[rgba(255,255,255,0.7)] px-5 py-2 green-gradient-to-b"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`${isClose && "pop-close-animation"} pop-up-animation px-8 py-2 w-[28rem] translate-x-[1rem] h-[55vh] bg-gradient-to-t from-darkbrown to-lightbrown rounded-tl-3xl rounded-bl-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <div className="w-full border-b-3 border-white/20 p-4 flex flex-row items-center justify-center relative">
                    <h1 className="text-primary text-[1.3rem] text-center text-shadow-md ">
                        {!isRemoveCostumer
                            ? "Current Costumers"
                            : "Remove Costumer"}
                    </h1>
                    <button
                        onClick={() => {
                            setIsRemoveCostumer(!isRemoveCostumer);
                        }}
                        className="flex flex-col items-center text-primary absolute right-2 cursor-pointer"
                    >
                        {isRemoveCostumer ? <CircleX /> : <UserX />}
                    </button>
                    <i className="text-primary cursor-pointer absolute left-2">
                        {" "}
                        <span onClick={() => setIsFilter(!isFilter)}>
                            <ListFilter />
                        </span>
                        {isFilter && (
                            <div className="absolute text-shadow-md flex flex-col gap-1 right-[100%] top-[100%] w-40 h-fit px-4 pt-1 pb-4 bg-gradient-to-t [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)] from-darkbrown to-lightbrown rounded-b-2xl rounded-tl-2xl z-10">
                                <div className="border-b-2 border-white/20">
                                    <h1 className="text-center text-[1.15rem] not-italic font-medium py-1">
                                        Filter
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p
                                        onClick={() => setFilter("all")}
                                        className={`${filter === "all" && "underline"} font-extralight text-[1rem]  not-italic hover:underline`}
                                    >
                                        All
                                    </p>

                                    <details>
                                        <summary className="font-light not-italic text-[1rem]">
                                            Floor
                                        </summary>
                                        <ul className="pl-4 font-extralight text-[0.9rem] not-italic text-white/75">
                                            <li
                                                onClick={() => setFilter("A")}
                                                className={`${filter === "A" && "underline"} hover:underline`}
                                            >
                                                1st Floor
                                            </li>
                                            <li
                                                onClick={() => setFilter("B")}
                                                className={`${filter === "B" && "underline"} hover:underline`}
                                            >
                                                2nd Floor
                                            </li>
                                        </ul>
                                    </details>
                                    <details>
                                        <summary className="font-light not-italic text-[1rem]">
                                            Status
                                        </summary>
                                        <ul className="pl-4 font-extralight text-[0.9rem] not-italic text-white/75">
                                            <li
                                                onClick={() =>
                                                    setFilter("Ordering")
                                                }
                                                className={`${filter === "Ordering" && "underline"} hover:underline`}
                                            >
                                                Ordering
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setFilter("Eating")
                                                }
                                                className={`${filter === "Eating" && "underline"} hover:underline`}
                                            >
                                                Eating
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setFilter("Billing")
                                                }
                                                className={`${filter === "Billing" && "underline"} hover:underline`}
                                            >
                                                Billing
                                            </li>
                                        </ul>
                                    </details>
                                </div>
                            </div>
                        )}
                    </i>
                </div>
                <ul className="py-8 flex flex-col gap-2 h-[25rem] overflow-y-scroll custom-scrollbar px-3">
                    {isRemoveCostumer && (
                        <p className="text-secondary text-center w-full -mt-5">
                            You can only remove costumer that forgot to exit
                        </p>
                    )}
                    {currentCostumers.length !== 0 ? (
                        filterCurrentCostumer(filter).map(
                            (
                                { costumer_name, current_table, status, time },
                                index,
                            ) => (
                                <li
                                    key={index}
                                    className="flex flex-row items-center justify-between text-primary border-1 border-white/20 rounded-2xl px-2 py-1 bg-gradient-to-r from-black/15 to-white/0 backdrop-blur-2xl [box-shadow:-2px_2px_5px_rgba(0,0,0,0.25)]"
                                >
                                    <div className="flex flex-col">
                                        <h1 className="text-[0.8rem] font-light">
                                            {costumer_name} seats on table{" "}
                                            {current_table}
                                        </h1>
                                        <div className="flex flex-row items-center opacity-60 gap-1">
                                            <History size={15} />
                                            <p className="text-[0.7rem] font-extralight">
                                                {time}
                                            </p>
                                        </div>
                                    </div>
                                    {!isRemoveCostumer ? (
                                        <div className="flex flex-row items-center gap-1">
                                            <p className="text-[0.8rem] text-white/70 font-extralight">
                                                {status}
                                            </p>
                                            {status === "Ordering" ? (
                                                <ShoppingBasket size={20} />
                                            ) : status === "Eating" ? (
                                                <Drumstick />
                                            ) : status === "Billing" ? (
                                                <HandCoins />
                                            ) : null}
                                        </div>
                                    ) : isRemoveCostumer &&
                                      status === "Billing" ? (
                                        <div
                                            onClick={() => {
                                                handleRemoveCostumer(
                                                    costumer_name,
                                                    current_table,
                                                );
                                            }}
                                            className="flex flex-row items-center gap-1 cursor-pointer"
                                        >
                                            <p className="text-[0.8rem] text-white/70 font-extralight pr-2">
                                                Kick?
                                            </p>
                                            <UserX color="red" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center gap-1">
                                            <p className="text-[0.8rem] text-white/70 font-extralight">
                                                {status}
                                            </p>
                                            {status === "Ordering" ? (
                                                <ShoppingBasket size={20} />
                                            ) : status === "Eating" ? (
                                                <Drumstick />
                                            ) : status === "Billing" ? (
                                                <HandCoins />
                                            ) : null}
                                        </div>
                                    )}
                                </li>
                            ),
                        )
                    ) : (
                        <p className="text-white/50 text-[0.9rem] w-full text-center">
                            There is no costumer
                        </p>
                    )}
                </ul>
            </div>
            <div
                className={`${isClose && "pop-close-animation"} pop-up-animation relative px-8 py-2 w-[40rem] translate-x-[-1rem] h-[70vh] z-2 bg-gradient-to-t from-darkbrown to-lightbrown rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <div className="w-full border-b-3 border-white/20 p-4 flex flex-row items-center justify-center relative">
                    <h1 className="font-medium text-primary text-[1.6rem] text-center text-shadow-md">
                        Incoming Costumers
                    </h1>
                    <button
                        onClick={() => {
                            setIsClose(true);

                            setTimeout(() => {
                                setIsClose(false);
                                setIsTableRequest(false);
                            }, 200);
                        }}
                        className="absolute text-white/75 cursor-pointer hover:scale-105 transition duration-100 active:scale-95 drop-shadow-md right-0"
                    >
                        <LogOut size={25} />
                    </button>
                </div>

                <ul className="py-8 flex flex-col gap-2 h-[33rem] overflow-y-scroll custom-scrollbar px-3">
                    {requestMessage.length !== 0 ? (
                        requestMessage.map(
                            (
                                {
                                    costumer_name,
                                    message,
                                    table_selected,
                                    time_ago,
                                },
                                index,
                            ) => (
                                <li
                                    key={index}
                                    className="flex flex-row items-center justify-between px-2  text-primary border-1 border-white/20 rounded-2xl p-2 bg-gradient-to-r from-black/15 to-white/0 backdrop-blur-2xl [box-shadow:-2px_2px_5px_rgba(0,0,0,0.25)]"
                                >
                                    <div className="flex flex-col">
                                        <h1 className="text-[0.9rem] font-light">
                                            {message}
                                        </h1>
                                        <div className="flex flex-row items-center opacity-60 gap-1">
                                            <History size={15} />
                                            <p className="text-[0.7rem] font-extralight">
                                                {time_ago}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-2 text-primary">
                                        <button
                                            onClick={() => {
                                                refetchData();
                                                setIsDenyConfirm(true);
                                                setCostumerName(costumer_name);
                                                setTableSelected(
                                                    table_selected,
                                                );
                                                setRequestMessage((prev) =>
                                                    prev.filter(
                                                        (item) =>
                                                            item.table_selected !==
                                                                table_selected ||
                                                            item.costumer_name !==
                                                                costumer_name,
                                                    ),
                                                );
                                            }}
                                            className="flex items-center justify-center bg-gradient-to-l translate-x-[12px]  from-darkred to-lightred p-2 w-[3.25rem] h-[2rem] rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                                        >
                                            <CircleX size={20} />
                                        </button>
                                        <button className="flex items-center justify-center z-2 bg-gradient-to-r from-darkgreen to-lightgreen w-[4.5rem] h-[2.75rem] rounded-tr-2xl rounded-br-2xl rounded-tl-md rounded-bl-md p-2 rounded-2xl cursor-pointer">
                                            <CircleCheck
                                                onClick={() => {
                                                    refetchData();
                                                    handleAccept(
                                                        table_selected,
                                                        costumer_name,
                                                    );

                                                    setRequestMessage((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item.table_selected !==
                                                                    table_selected ||
                                                                item.costumer_name !==
                                                                    costumer_name,
                                                        ),
                                                    );
                                                }}
                                                size={30}
                                            />
                                        </button>
                                    </div>
                                </li>
                            ),
                        )
                    ) : (
                        <p className="text-white/50 text-[0.9rem] w-full text-center">
                            There is no incoming costumer
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TableRequestPopup;

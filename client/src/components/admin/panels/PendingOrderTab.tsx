import { memo } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
interface Props {
    isTransitioning: boolean;
}
const PendingOrderTab = ({ isTransitioning }: Props) => {
    const costumer = [
        {
            table: "A-1",
            name: "Steve",
        },
        {
            table: "B-2",
            name: "Mike",
        },
        {
            table: "A-7",
            name: "Dustin",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
        {
            table: "A-16",
            name: "Will",
        },
    ];
    return (
        <div
            className={` pointer-events-auto  flex flex-col space-y-[2vh] ${isTransitioning && "translate-x-[25rem]"} transition duration-500`}
        >
            <div className="rounded-bl-2xl bg-white/10 backdrop-blur-2xl flex justify-center items-center h-[10vh]">
                <h1 className="text-white/90 text-3xl font-bold p-5 text-shadow-md">
                    Pending Orders
                </h1>
            </div>

            <ul className="bg-white/10 backdrop-blur-2xl rounded-tl-2xl h-[88vh] p-4 space-y-3  overflow-y-auto custom-scrollbar">
                {costumer.map(({ name, table }, index) => (
                    <li
                        className="bg-white/85 rounded-2xl p-2 flex flex-row justify-between px-5 transition duration-200 pending-list-shadow  hover:translate-y-[-3px] hover:translate-x-[5px] cursor-pointer "
                        key={index}
                    >
                        <div className="flex flex-col items-start justify-center">
                            <h2 className="text-xl font-medium">
                                Costumer {table}
                            </h2>
                            <p>{name}</p>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                            <button className="rounded-3xl bg-green-500 text-white w-[5rem] p-2 flex justify-center items-center cursor-pointer hover:scale-107 transition duration-250">
                                <FaCheck />
                            </button>
                            <button className="flex flex-row items-center cursor-pointer hover:underline">
                                <span className="text-xl">
                                    <IoMdListBox />
                                </span>
                                View orders
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(PendingOrderTab);

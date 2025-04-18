import { NotebookText, LogOut } from "lucide-react";
import React from "react";
interface InstructionsProps {
    setIsInstructions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Instructions = ({ setIsInstructions }: InstructionsProps) => {
    const list = [
        "Use a short name or nickname to prevent text overflow.",
        "Please claim a seat before selecting a table on the user interface.",
        "Select the correct table ID to avoid being declined by the owner.",
        "If you don't see the table, try refreshing the page.",
        "Note: Reloading the page will reset your order basket.",
        "We recommend downloading your receipt before leaving the site.",
    ];
    return (
        <div className="flex flex-col items-center fixed w-full h-screen z-10 bg-black/40">
            <div className="w-full h-fit flex flex-row justify-around">
                <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
            </div>
            <div className="relative flex flex-row items-center justify-center gap-2 py-4 w-[90vw] text-primary bg-gradient-to-b from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                <NotebookText />
                <h1 className="text-[1.6rem]">Instructions</h1>
                <i
                    className="absolute right-4 opacity-70"
                    onClick={() => setIsInstructions(false)}
                >
                    <LogOut size={20} />
                </i>
            </div>
            <div className="flex flex-col gap-3 p-6 h-[70vh] w-[90vw] mt-4 bg-gradient-to-b from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                {list.map((item, index) => (
                    <>
                        <li
                            key={index}
                            className="text-white/65 font-extralight list-none leading-5"
                        >
                            - {item}
                        </li>
                        <hr className="text-white/20" />
                    </>
                ))}
            </div>
        </div>
    );
};

export default Instructions;

import { memo, useEffect, useState } from "react";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { triviaMessage } from "../../../types/types";
import { Gi3dStairs } from "react-icons/gi";

import useSelectTableControl from "../../../hooks/useSelectTableControl";

import layout from "../../../styles/layouts/select_table.module.css";

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsPicking: React.Dispatch<React.SetStateAction<boolean>>;
    isPicking: boolean;
    costumerName: string;
    selectedTable: string;
    transitionToTable: (table_id: string) => void;
}

const SelectTable = ({
    setPhase,
    setCamPos,
    setCamRot,
    isPicking,
    setIsPicking,
    costumerName,
    selectedTable,
}: Props) => {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [isLeftClicked, setIsLeftClicked] = useState<boolean>(false);
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);
    const [floor, setFloor] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const {
        handleChangeTable,
        doNothing,
        handleConfirm,
        handleDownFloor,
        handleLeftClick,
        handleMidClick,
        handleNextFloor,
        handleRightClick,
    } = useSelectTableControl({
        floor,
        costumerName,
        selectedTable,
        setFloor,
        setIsLeftClicked,
        setIsRightClicked,
        setCamPos,
        setCamRot,
        setIsTransitioning,
        setIsConfirmed,
        setIsPicking,
    });

    const [triviaIndex, setTriviaIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTriviaIndex((prev) => (prev + 1) % triviaMessage.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const table_picked = localStorage.getItem("table-picked");

        if (table_picked) {
            setIsConfirmed(true);
        }

        if (!token) {
            setPhase(0);
            setIsPicking(false);
        }
    }, []);

    return !isConfirmed ? (
        <div className={`${layout.main}`}>
            <div
                className={`${layout["left-hang"]} ${isTransitioning && "-translate-y-50"} transition duration-800 w-full brown-gradient-to-b [box-shadow:0_0_3px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            ></div>
            <div
                className={`${layout["right-hang"]} ${isTransitioning && "-translate-y-50"} transition duration-800 w-full brown-gradient-to-b [box-shadow:0_0_3px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            ></div>
            <div
                className={`${layout.head} ${isTransitioning && "-translate-y-50"} transition duration-800 flex flex-col py-12 min-[390px]:py-13 justify-center items-center brown-gradient-to-b w-[90vw] mx-auto rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <h1 className="text-primary text-[1.2rem] min-[580px]:text-[2rem] text-shadow-md min-[390px]:text-[1.3rem] text-center">
                    {isPicking
                        ? "Lock in your table?"
                        : `Find your perfect spot, ${costumerName}`}
                </h1>
                <p className="text-[rgba(255,255,255,0.45)] min-[580px]:text-[1rem] text-[0.8rem] font-extralight">
                    {isPicking
                        ? `Table ${selectedTable}`
                        : `${isLeftClicked ? "Left View" : isRightClicked ? "Right View" : "Middle View"}`}
                </p>
            </div>

            {!isRightClicked && !isLeftClicked && !isPicking ? (
                <>
                    <div
                        className={`${layout["left-btn"]} ${isTransitioning && "-translate-x-25"} transition duration-800 flex items-center justify-center`}
                    >
                        <button
                            onClick={() => {
                                setIsLeftClicked(true);
                                handleLeftClick();
                            }}
                            className="text-primary opacity-70 text-4xl pointer-events-auto min-[580px]:scale-180"
                        >
                            <FaLessThan />
                        </button>
                    </div>

                    <div
                        className={`${layout["right-btn"]} ${isTransitioning && "translate-x-25"} transition duration-800 flex items-center justify-center`}
                    >
                        <button
                            onClick={() => {
                                setIsRightClicked(true);
                                handleRightClick();
                            }}
                            className="text-primary opacity-70 text-4xl pointer-events-auto min-[580px]:scale-180"
                        >
                            <FaGreaterThan />
                        </button>
                    </div>
                </>
            ) : isRightClicked && !isPicking ? (
                <>
                    <div
                        className={`${layout["left-btn"]} ${isTransitioning && "-translate-x-25"} transition duration-800 flex items-center justify-center`}
                    >
                        <button
                            onClick={() => {
                                setIsLeftClicked(false);
                                setIsRightClicked(false);
                                handleMidClick();
                            }}
                            className="text-primary opacity-50 text-4xl pointer-events-auto"
                        >
                            <FaLessThan />
                        </button>
                    </div>
                </>
            ) : isLeftClicked && !isPicking ? (
                <>
                    <div
                        className={`${layout["right-btn"]} ${isTransitioning && "translate-x-25"} transition duration-800 flex items-center justify-center`}
                    >
                        <button
                            onClick={() => {
                                setIsRightClicked(false);
                                setIsLeftClicked(false);
                                handleMidClick();
                            }}
                            className="text-primary opacity-50 text-4xl pointer-events-auto"
                        >
                            <FaGreaterThan />
                        </button>
                    </div>
                </>
            ) : null}

            <div
                className={`${layout.footer} flex justify-center items-center space-x-8`}
            >
                {!isPicking ? (
                    <>
                        <button
                            onClick={() => {
                                floor === 1
                                    ? handleNextFloor()
                                    : floor === 2
                                      ? handleDownFloor()
                                      : doNothing();
                            }}
                            className={`${isTransitioning && "translate-y-50"} min-[580px]:text-[2rem] min-[580px]:px-8 transition duration-800 text-primary text-[1rem] min-[390px]:text-[1.2rem] flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-3 brown-gradient-to-b [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]`}
                        >
                            {floor === 1 ? (
                                <>
                                    <span className="pr-2">
                                        <Gi3dStairs />
                                    </span>

                                    <p>Go upstairs</p>
                                </>
                            ) : floor === 2 ? (
                                <>
                                    <span className="scale-x-[-1] pr-2">
                                        <Gi3dStairs />
                                    </span>
                                    <p>Go downstairs</p>
                                </>
                            ) : null}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            style={{
                                border: "solid 1px rgba(255,255,255,0.1)",
                            }}
                            onClick={handleChangeTable}
                            className="text-primary min-[580px]:text-[2rem] min-[580px]:px-20 mr-4 text-[1.25rem] min-[390px]:text-[1.4rem] flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-2 px-5  bg-transparent backdrop-blur-[10px] [-webkit-backdrop-filter:blur(15px)] [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
                        >
                            <p>Change</p>
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="text-primary min-[580px]:text-[2rem] min-[580px]:px-30 text-[1.25rem] min-[390px]:text-[1.4rem] flex items-center space-x-1.5 pointer-events-auto  rounded-2xl p-2 px-10 brown-gradient-to-b [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
                        >
                            <p>Confirm</p>
                        </button>
                    </>
                )}
            </div>
        </div>
    ) : !isTransitioning ? (
        <div
            className={`${selectedTable.includes("B", 0) && "bg-black/30"} fixed gap-2 w-full h-screen  backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center flex-col`}
        >
            <span className="loader-white mb-15 opacity-70 min-[580px]:mb-35 min-[580px]:scale-180"></span>
            <h1 className="text-primary text-[1.55rem] min-[390px]:text-[1.7rem] text-center min-[580px]:text-[2.25rem]">
                Hang tight! The owner is reviewing your request
            </h1>

            <p className="text-secondary text-[0.75rem] min-[390px]:text-[0.9rem] min-[580px]:text-[1.2rem]">
                {triviaMessage[triviaIndex]}
            </p>
        </div>
    ) : null;
};

export default memo(SelectTable);

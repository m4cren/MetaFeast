import { memo, useEffect, useState } from "react";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
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

    const triviaMessage = [
        "Did you know that egg contains 6-7 grams of protein?",
        "Banana are rich in magnesium and potassium",
        "You look good, you feel good, you do good",
        "Hello world",
    ];

    const [triviaIndex, setTriviaIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTriviaIndex((prev) => (prev + 1) % triviaMessage.length);
        }, 3500);

        return () => clearInterval(intervalId); // Cleanup to prevent memory leaks
    }, []); // Runs once on mount

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
                className={`${layout["left-hang"]} ${isTransitioning && "-translate-y-50"} transition duration-800 w-full bg-gradient-to-b from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            ></div>
            <div
                className={`${layout["right-hang"]} ${isTransitioning && "-translate-y-50"} transition duration-800 w-full bg-gradient-to-b from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            ></div>
            <div
                className={`${layout.head} ${isTransitioning && "-translate-y-50"} transition duration-800 flex flex-col py-12 min-[390px]:py-13 justify-center items-center bg-gradient-to-t from-darkbrown to-lightbrown w-[90vw] mx-auto rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <h1 className="text-primary text-[1.2rem] text-shadow-md min-[390px]:text-[1.3rem] text-center">
                    {isPicking
                        ? "Lock in your table?"
                        : `Find your perfect spot, ${costumerName}`}
                </h1>
                <p className="text-white/45 text-[0.8rem] font-extralight">
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
                            className="text-primary opacity-50 text-4xl pointer-events-auto"
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
                            className="text-primary opacity-50 text-4xl pointer-events-auto"
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
                            className={`${isTransitioning && "translate-y-50"} transition duration-800 text-primary text-[1rem] min-[390px]:text-[1.2rem] flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-3 bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]`}
                        >
                            {floor === 1 ? (
                                <>
                                    <span>
                                        <Gi3dStairs />
                                    </span>

                                    <p>Go upstairs</p>
                                </>
                            ) : floor === 2 ? (
                                <>
                                    <span className="scale-x-[-1]">
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
                            onClick={handleChangeTable}
                            className="text-primary text-[1.25rem] min-[390px]:text-[1.4rem] flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-2 px-5 border-1 border-white/10 bg-transparent backdrop-blur-[10px] [-webkit-backdrop-filter:blur(15px)] [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
                        >
                            <p>Change</p>
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="text-primary text-[1.25rem] min-[390px]:text-[1.4rem] flex items-center space-x-1.5 pointer-events-auto  rounded-2xl p-2 px-10 bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
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
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.55rem] min-[390px]:text-[1.7rem] text-center">
                Hang tight! The owner is reviewing your request
            </h1>

            <p className="text-secondary text-[0.75rem] min-[390px]:text-[0.9rem]">
                {triviaMessage[triviaIndex]}
            </p>
        </div>
    ) : null;
};

export default memo(SelectTable);

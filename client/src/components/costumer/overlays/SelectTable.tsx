import { memo, useEffect, useState } from "react";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
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
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const table_picked = localStorage.getItem("table-picked");

        if (table_picked) {
            setIsConfirmed(true);
        }

        if (!token) {
            setPhase(0);
        }
    }, []);

    return !isTransitioning && !isConfirmed ? (
        <div className={`${layout.main}`}>
            <div
                className={`${layout.head} flex justify-center items-center bg-transparent backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)] border-b-1 border-white/10 `}
            >
                <h1 className="text-primary text-2xl text-center">
                    {isPicking
                        ? "Confirm Table?"
                        : `Select Table, ${costumerName}`}
                </h1>
            </div>

            {!isRightClicked && !isLeftClicked && !isPicking ? (
                <>
                    <div
                        className={`${layout["left-btn"]} flex items-center justify-center`}
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
                        className={`${layout["right-btn"]} flex items-center justify-center`}
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
                        className={`${layout["left-btn"]} flex items-center justify-center`}
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
                        className={`${layout["right-btn"]} flex items-center justify-center`}
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
                            className="text-primary text-2xl flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-2 border-1 border-white/10 bg-transparent backdrop-blur-[10px] [-webkit-backdrop-filter:blur(15px)]"
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
                            onClick={handleConfirm}
                            className="text-primary text-2xl flex items-center space-x-1.5 pointer-events-auto  rounded-2xl p-2 border-1 border-white/10 bg-transparent backdrop-blur-[10px] [-webkit-backdrop-filter:blur(15px)]"
                        >
                            <p>Confirm</p>
                        </button>
                        <button
                            onClick={handleChangeTable}
                            className="text-primary text-2xl flex items-center space-x-1.5 pointer-events-auto rounded-2xl p-2 border-1 border-white/10 bg-transparent backdrop-blur-[10px] [-webkit-backdrop-filter:blur(15px)]"
                        >
                            <p>Change</p>
                        </button>
                    </>
                )}
            </div>
        </div>
    ) : !isTransitioning ? (
        <div className="fixed gap-4 w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center flex-col">
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.7rem] text-center">
                Wait for the owner to confirm your request
            </h1>

            <p className="text-secondary text-sm">{triviaMessage[0]}</p>
        </div>
    ) : null;
};

export default memo(SelectTable);

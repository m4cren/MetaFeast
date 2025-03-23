import { memo, useCallback, useEffect, useState } from "react";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import useSelectTableControl from "../../../hooks/useSelectTableControl";

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

    return (
        <>
            {isConfirmed && (
                <div className="fixed w-full h-screen bg-black/40 flex justify-center items-center z-10 ">
                    <div className="bg-white/90 rounded-2xl w-[80vw] h-[20rem] flex items-center justify-center gap-5 flex-col pop-up-animation">
                        <h1 className="text-2xl text-center">
                            Wait for the owner to confirm your request
                        </h1>
                        <span className="text-5xl">
                            <FaClock />
                        </span>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center items-center p-6 bg-white/10 backdrop-blur-[10px] border-b-2 border-b-white/20">
                {isPicking ? (
                    <h1 className="text-white text-3xl font-medium text-shadow-lg">
                        Confirm Table?
                    </h1>
                ) : (
                    <h1 className="text-white text-3xl font-medium text-shadow-lg">
                        Select Table, {costumerName}
                    </h1>
                )}
            </div>

            {isPicking ? (
                <div className="flex flex-row w-full fixed bottom-4 gap-3 justify-center items-center">
                    <button
                        onClick={handleConfirm}
                        className="w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20  hover:scale-105 transition-[0.2] active:scale-95 cursor-pointer pointer-events-auto"
                    >
                        Confirm
                    </button>
                    <button
                        className="w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20  hover:scale-105 transition-[0.2] active:scale-95 cursor-pointer pointer-events-auto"
                        onClick={handleChangeTable}
                    >
                        Change
                    </button>
                </div>
            ) : (
                <div>
                    {!isTransitioning ? (
                        <button
                            onClick={
                                floor === 1
                                    ? handleNextFloor
                                    : floor === 2
                                      ? handleDownFloor
                                      : doNothing
                            }
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 fixed top-[95%] left-1/2 translate-x-[-50%] translate-y-[-50%] hover:scale-105 transition-[0.2] active:scale-95 cursor-pointer pointer-events-auto"
                        >
                            <Gi3dStairs />
                            <p className="text-[1.25rem] w-max">
                                {floor === 1
                                    ? "Go up stairs"
                                    : floor === 2
                                      ? "Go down stairs"
                                      : null}
                            </p>
                        </button>
                    ) : null}

                    {!isLeftClicked && !isRightClicked ? (
                        <>
                            <div className="fixed h-screen right-2 top-1/2">
                                <button
                                    className="text-white text-shadow-lg text-5xl opacity-60 pointer-events-auto"
                                    onClick={handleRightClick}
                                >
                                    <FaGreaterThan />
                                </button>
                            </div>
                            <div className="fixed h-screen text-shadow-lg left-2 top-1/2">
                                <button
                                    className="text-white text-5xl opacity-60 pointer-events-auto"
                                    onClick={handleLeftClick}
                                >
                                    <FaLessThan />
                                </button>
                            </div>
                        </>
                    ) : isLeftClicked && !isRightClicked ? (
                        <>
                            <div className="fixed h-screen text-shadow-lg right-2 top-1/2">
                                <button
                                    className="text-white text-5xl opacity-60 pointer-events-auto"
                                    onClick={handleMidClick}
                                >
                                    <FaGreaterThan />
                                </button>
                            </div>
                        </>
                    ) : !isLeftClicked && isRightClicked ? (
                        <>
                            <div className="fixed h-screen text-shadow-lg left-2 top-1/2">
                                <button
                                    className="text-white text-5xl opacity-60 pointer-events-auto"
                                    onClick={handleMidClick}
                                >
                                    <FaLessThan />
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default memo(SelectTable);

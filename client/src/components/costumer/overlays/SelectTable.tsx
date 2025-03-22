import { memo, useCallback, useEffect, useState } from "react";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
import { FaClock } from "react-icons/fa";

import useFrameProvider from "../../../frames/useFrameProvider";

import useTableRequest from "../../../hooks/useTableRequest";
import { useSocket } from "../../../contexts/SocketContext";

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
    const { sendData } = useTableRequest();
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [isLeftClicked, setIsLeftClicked] = useState<boolean>(false);
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);
    const [floor, setFloor] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const {
        to_1st_Frames,
        to_2nd_Frames,
        selTable1stF_Frames,
        selTable2ndF_Frames,
    } = useFrameProvider();

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

    const handleLeftClick = () => {
        setIsLeftClicked(true);
        setIsRightClicked(false);

        if (floor === 1) {
            setCamPos(selTable1stF_Frames.left.pos);
            setCamRot(selTable1stF_Frames.left.rot);
        } else if (floor === 2) {
            setCamPos(selTable2ndF_Frames.left.pos);
            setCamRot(selTable2ndF_Frames.left.rot);
        }
    };
    const handleRightClick = () => {
        setIsLeftClicked(false);
        setIsRightClicked(true);

        if (floor === 1) {
            setCamPos(selTable1stF_Frames.right.pos);
            setCamRot(selTable1stF_Frames.right.rot);
        } else if (floor === 2) {
            setCamPos(selTable2ndF_Frames.right.pos);
            setCamRot(selTable2ndF_Frames.right.rot);
        }
    };
    const handleMidClick = () => {
        setIsLeftClicked(false);
        setIsRightClicked(false);

        if (floor === 1) {
            setCamPos(selTable1stF_Frames.mid.pos);
            setCamRot(selTable1stF_Frames.mid.rot);
        } else if (floor === 2) {
            setCamPos(selTable2ndF_Frames.mid.pos);
            setCamRot(selTable2ndF_Frames.mid.rot);
        }
    };

    const frame_sec = 200;

    const doNothing = useCallback(() => {
        console.log("hehe");
    }, []);

    const handleDownFloor = () => {
        setIsTransitioning(true);
        setIsRightClicked(true);
        setIsLeftClicked(true);
        setCamPos(to_1st_Frames.frame1.pos);
        setCamRot(to_1st_Frames.frame1.rot);

        setTimeout(() => {
            setCamPos(to_1st_Frames.frame2.pos);
            setCamRot(to_1st_Frames.frame2.rot);

            setTimeout(() => {
                setCamPos(to_1st_Frames.frame3.pos);
                setCamRot(to_1st_Frames.frame3.rot);
                setTimeout(() => {
                    setCamPos(to_1st_Frames.frame4.pos);
                    setCamRot(to_1st_Frames.frame4.rot);
                    setTimeout(() => {
                        setCamPos(to_1st_Frames.frame5.pos);
                        setCamRot(to_1st_Frames.frame5.rot);
                        setTimeout(() => {
                            setCamPos(to_1st_Frames.frame6.pos);
                            setCamRot(to_1st_Frames.frame6.rot);
                            setTimeout(() => {
                                setCamPos(to_1st_Frames.frame7.pos);
                                setCamRot(to_1st_Frames.frame7.rot);
                                setTimeout(() => {
                                    setCamPos(to_1st_Frames.frame8.pos);
                                    setCamRot(to_1st_Frames.frame8.rot);
                                    setTimeout(() => {
                                        setIsRightClicked(false);
                                        setIsLeftClicked(false);
                                        setIsTransitioning(false);
                                        setFloor(1);
                                        setCamPos(selTable1stF_Frames.mid.pos);
                                        setCamRot(selTable1stF_Frames.mid.rot);
                                    }, frame_sec);
                                }, frame_sec);
                            }, frame_sec);
                        }, frame_sec);
                    }, frame_sec);
                }, frame_sec);
            }, frame_sec);
        }, 700);
    };

    const handleNextFloor = () => {
        setIsRightClicked(true);
        setIsTransitioning(true);
        setIsLeftClicked(true);
        setCamPos(to_2nd_Frames.frame1.pos);
        setCamRot(to_2nd_Frames.frame1.rot);

        setTimeout(() => {
            setCamPos(to_2nd_Frames.frame2.pos);
            setCamRot(to_2nd_Frames.frame2.rot);

            setTimeout(() => {
                setCamPos(to_2nd_Frames.frame3.pos);
                setCamRot(to_2nd_Frames.frame3.rot);
                setTimeout(() => {
                    setCamPos(to_2nd_Frames.frame4.pos);
                    setCamRot(to_2nd_Frames.frame4.rot);

                    setTimeout(() => {
                        setCamPos(to_2nd_Frames.frame5.pos);
                        setCamRot(to_2nd_Frames.frame5.rot);

                        setTimeout(() => {
                            setCamPos(to_2nd_Frames.frame6.pos);
                            setCamRot(to_2nd_Frames.frame6.rot);
                            setTimeout(() => {
                                setCamPos(to_2nd_Frames.frame7.pos);
                                setCamRot(to_2nd_Frames.frame7.rot);

                                setTimeout(() => {
                                    setCamPos(to_2nd_Frames.frame8.pos);
                                    setCamRot(to_2nd_Frames.frame8.rot);

                                    setTimeout(() => {
                                        setCamPos(to_2nd_Frames.frame9.pos);
                                        setCamRot(to_2nd_Frames.frame9.rot);

                                        setTimeout(() => {
                                            setCamPos(
                                                to_2nd_Frames.frame10.pos,
                                            );
                                            setCamRot(
                                                to_2nd_Frames.frame10.rot,
                                            );
                                            setTimeout(() => {
                                                setIsRightClicked(false);
                                                setIsTransitioning(false);
                                                setIsLeftClicked(false);
                                                setFloor(2);
                                                setCamPos(
                                                    selTable2ndF_Frames.mid.pos,
                                                );
                                                setCamRot(
                                                    selTable2ndF_Frames.mid.rot,
                                                );
                                            }, frame_sec);
                                        }, frame_sec);
                                    }, frame_sec);
                                }, frame_sec);
                            }, frame_sec);
                        }, frame_sec);
                    }, frame_sec);
                }, frame_sec);
            }, frame_sec);
        }, 700);
    };

    const handleChangeTable = () => {
        setIsPicking(false);
        setIsLeftClicked(false);
        setIsRightClicked(false);
        if (floor === 1) {
            setCamPos(selTable1stF_Frames.mid.pos);
            setCamRot(selTable1stF_Frames.mid.rot);
        } else if (floor === 2) {
            setCamPos(selTable2ndF_Frames.mid.pos);
            setCamRot(selTable2ndF_Frames.mid.rot);
        }
    };

    const handleConfirm = () => {
        sendData(selectedTable, costumerName);
        setIsConfirmed(true);

        localStorage.setItem("table-picked", selectedTable.toString());
    };

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

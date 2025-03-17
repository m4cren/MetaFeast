import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import useServerAddress from "../../../useServerAddress";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
import useCostumerFrameProvider from "../../frames/useCostumerFrameProvider";
interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const SelectTable = ({ setPhase, setCamPos, setCamRot }: Props) => {
    const { server } = useServerAddress();
    const [name, setName] = useState<string>("...Loading");
    const [isLeftClicked, setIsLeftClicked] = useState<boolean>(false);
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);
    const [floor, setFloor] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const {
        to_1st_Frames,
        to_2nd_Frames,
        selTable1stF_Frames,
        selTable2ndF_Frames,
    } = useCostumerFrameProvider();
    useEffect(() => {
        const fetchCostumer = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setPhase(0);
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const response = await axios.get(`${server}/phase-1`, {
                    headers,
                    withCredentials: false,
                });

                setName(response.data.costumer_name);
            } catch (error) {
                localStorage.removeItem("token");
                setPhase(0);
            }
        };

        fetchCostumer();
    });

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

    return (
        <>
            <div className="w-full flex justify-center items-center p-6 bg-white/10 backdrop-blur-[10px] border-b-2 border-b-white/20">
                <h1 className="text-white text-3xl font-medium text-shadow-lg">
                    Select Table, {name}
                </h1>
            </div>

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
        </>
    );
};

export default memo(SelectTable);

import { useCallback } from "react";
import useFrameProvider from "../frames/useFrameProvider";
import useTableRequest from "./useTableRequest";
import { SelectTableControl } from "../types/types";

const useSelectTableControl = ({
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
}: SelectTableControl) => {
    const { sendData } = useTableRequest();
    const {
        to_1st_Frames,
        to_2nd_Frames,
        selTable1stF_Frames,
        selTable2ndF_Frames,
    } = useFrameProvider();

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

    const doNothing = useCallback(() => {}, []);

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
    return {
        handleChangeTable,
        handleConfirm,
        handleLeftClick,
        handleRightClick,
        handleDownFloor,
        handleNextFloor,
        handleMidClick,
        doNothing,
    };
};

export default useSelectTableControl;

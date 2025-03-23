import { memo, useState } from "react";
import { Gi3dStairs } from "react-icons/gi";
import useFrameProvider from "../../../frames/useFrameProvider";

interface Props {
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    isTransitioning: boolean;
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewControl = ({
    setCamPos,
    setCamRot,
    isTransitioning,
    setIsTransitioning,
}: Props) => {
    const {
        admin_1F_Frames,
        admin_2F_Frames,
        admin_init_Frame,
        to_1st_Frames,
        to_2nd_Frames,
    } = useFrameProvider();
    useFrameProvider;
    const [floor, setFloor] = useState<number>(1);

    const frame_sec = 300;

    const handleViewOne = () => {
        setCamPos(admin_1F_Frames.left.pos);
        setCamRot(admin_1F_Frames.left.rot);
    };
    const handleViewTwo = () => {
        setCamPos(admin_1F_Frames.right.pos);
        setCamRot(admin_1F_Frames.right.rot);
    };
    const handleDefaultView = () => {
        setCamPos(admin_init_Frame.pos);
        setCamRot(admin_init_Frame.rot);
    };

    const handleUpFloor = () => {
        setIsTransitioning(true);
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
                                                setIsTransitioning(false);
                                                setFloor(2);
                                                setCamPos(
                                                    admin_2F_Frames.center.pos,
                                                );
                                                setCamRot(
                                                    admin_2F_Frames.center.rot,
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
    const handleDownFloor = () => {
        setIsTransitioning(true);
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
                                        setIsTransitioning(false);
                                        setFloor(1);
                                        setCamPos(admin_init_Frame.pos);
                                        setCamRot(admin_init_Frame.rot);
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
        !isTransitioning && (
            <div className="fixed pointer-events-auto w-[90vw] h-[5.5rem]  bottom-0 flex flex-row  items-center px-10 space-x-5">
                <button
                    onClick={floor === 1 ? handleUpFloor : handleDownFloor}
                    className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
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
                {floor === 1 ? (
                    <>
                        <button
                            onClick={handleViewOne}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <p className="text-[1.25rem] w-max">View 1</p>
                        </button>
                        <button
                            onClick={handleViewTwo}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <p className="text-[1.25rem] w-max">View 2</p>
                        </button>
                        <button
                            onClick={handleDefaultView}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <p className="text-[1.25rem] w-max">Default</p>
                        </button>
                    </>
                ) : null}
            </div>
        )
    );
};

export default memo(ViewControl);

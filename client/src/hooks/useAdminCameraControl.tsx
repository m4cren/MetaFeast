import useFrameProvider from "../frames/useFrameProvider";
import { AdminCameraControlProp } from "../types/types";

const useAdminCameraControl = ({
    setCamPos,
    setCamRot,
    setIsTransitioning,
    setFloor,
}: AdminCameraControlProp) => {
    const {
        admin_1F_Frames,
        admin_2F_Frames,
        admin_init_Frame,
        to_1st_Frames,
        to_2nd_Frames,
    } = useFrameProvider();
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
    return {
        handleDownFloor,
        handleUpFloor,
        handleDefaultView,
        handleViewOne,
        handleViewTwo,
    };
};

export default useAdminCameraControl;

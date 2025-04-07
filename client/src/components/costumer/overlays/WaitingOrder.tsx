import { useEffect } from "react";
import useFrameProvider from "../../../frames/useFrameProvider";

interface WaitingOrderProps {
    transitionToTable: (table_id: string) => void;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}

const WaitingOrder = ({
    transitionToTable,
    setCamPos,
    setCamRot,
}: WaitingOrderProps) => {
    const { to_2nd_Frames } = useFrameProvider();
    useEffect(() => {
        const table_picked = localStorage.getItem("table-picked");
        if (!table_picked) return;

        if (table_picked.includes("A", 0)) {
            transitionToTable(table_picked);
        } else if (table_picked.includes("B", 0)) {
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
                                                    transitionToTable(
                                                        table_picked,
                                                    );
                                                }, 200);
                                            }, 200);
                                        }, 200);
                                    }, 200);
                                }, 200);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }, 200);
        }
    }, []);
    return (
        <div className="fixed gap-4 w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center flex-col">
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.7rem] text-center">
                Wait for your order
            </h1>
        </div>
    );
};

export default WaitingOrder;

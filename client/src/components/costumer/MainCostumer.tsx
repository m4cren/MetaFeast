import { useEffect, useState } from "react";

// import SceneCameraController from "./SceneCameraController";
// import useCameraControl from "../../hooks/useCameraControl";
import CostumerScene from "./scenes/CostumerScene";

import { loader_timer } from "../../App";

import useFrameProvider from "../../frames/useFrameProvider";
import GetName from "./overlays/GetName";
import SelectTable from "./overlays/SelectTable";
import useCostumerName from "../../hooks/useCostumerName";

const MainCostumer = () => {
    // const { camPos, camRot, cameraFunctions } = useCameraControl();
    // console.log(
    //     `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    // );
    // console.log(
    //     `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    // );

    const { costumerName, setCostumerName } = useCostumerName();
    const [selectedTable, setSelectedTable] = useState<string>("");

    const {
        init_Frame,
        pickName_Frame,
        selTable1stF_Frames,
        select_table_Frames,
    } = useFrameProvider();

    const [camPos, setCamPos] = useState<[number, number, number]>(
        init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        init_Frame.rot,
    );

    const [phase, setPhase] = useState<number>(0);
    const [isName, setIsName] = useState<boolean>(false);
    const [isPicking, setIsPicking] = useState<boolean>(false);
    const [table_picked] = useState<string | null>(
        localStorage.getItem("table-picked"),
    );

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        if (!get_phase) {
            setPhase(0);
            const timer_initial = setTimeout(() => {
                setCamPos(pickName_Frame.pos);
                setCamRot(pickName_Frame.rot);
            }, loader_timer - 500);
            return () => clearTimeout(timer_initial);
        } else {
            switch (get_phase) {
                case "phase_1":
                    setPhase(1);
                    if (table_picked) {
                        transitionToTable(table_picked);
                    } else {
                        setTimeout(() => {
                            setCamPos(selTable1stF_Frames.mid.pos);
                            setCamRot(selTable1stF_Frames.mid.rot);
                        }, loader_timer - 500);
                    }

                    break;
            }
        }
    }, []);

    const transitionToTable = (table_id: string) => {
        switch (table_id) {
            case "A_1":
                setSelectedTable("A_1");
                setCamPos(select_table_Frames.table_A_1.frame1.pos);
                setCamRot(select_table_Frames.table_A_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_1.frame2.pos);
                    setCamRot(select_table_Frames.table_A_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_2":
                setSelectedTable("A_2");
                setCamPos(select_table_Frames.table_A_2.frame1.pos);
                setCamRot(select_table_Frames.table_A_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_2.frame2.pos);
                    setCamRot(select_table_Frames.table_A_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_3":
                setSelectedTable("A_3");
                setCamPos(select_table_Frames.table_A_3.frame1.pos);
                setCamRot(select_table_Frames.table_A_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_3.frame2.pos);
                    setCamRot(select_table_Frames.table_A_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_4":
                setSelectedTable("A_4");
                setCamPos(select_table_Frames.table_A_4.frame1.pos);
                setCamRot(select_table_Frames.table_A_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_4.frame2.pos);
                    setCamRot(select_table_Frames.table_A_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_5":
                setSelectedTable("A_5");
                setCamPos(select_table_Frames.table_A_5.frame1.pos);
                setCamRot(select_table_Frames.table_A_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_5.frame2.pos);
                    setCamRot(select_table_Frames.table_A_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_6":
                setSelectedTable("A_6");
                setCamPos(select_table_Frames.table_A_6.frame1.pos);
                setCamRot(select_table_Frames.table_A_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_6.frame2.pos);
                    setCamRot(select_table_Frames.table_A_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_7":
                setSelectedTable("A_7");
                setCamPos(select_table_Frames.table_A_7.frame1.pos);
                setCamRot(select_table_Frames.table_A_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_7.frame2.pos);
                    setCamRot(select_table_Frames.table_A_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_8":
                setSelectedTable("A_8");
                setCamPos(select_table_Frames.table_A_8.frame1.pos);
                setCamRot(select_table_Frames.table_A_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_8.frame2.pos);
                    setCamRot(select_table_Frames.table_A_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_9":
                setSelectedTable("A_9");
                setCamPos(select_table_Frames.table_A_9.frame1.pos);
                setCamRot(select_table_Frames.table_A_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_9.frame2.pos);
                    setCamRot(select_table_Frames.table_A_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_10":
                setSelectedTable("A_10");
                setCamPos(select_table_Frames.table_A_10.frame1.pos);
                setCamRot(select_table_Frames.table_A_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_10.frame2.pos);
                    setCamRot(select_table_Frames.table_A_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_11":
                setSelectedTable("A_11");
                setCamPos(select_table_Frames.table_A_11.frame1.pos);
                setCamRot(select_table_Frames.table_A_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_11.frame2.pos);
                    setCamRot(select_table_Frames.table_A_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_12":
                setSelectedTable("A_12");
                setCamPos(select_table_Frames.table_A_12.frame1.pos);
                setCamRot(select_table_Frames.table_A_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_12.frame2.pos);
                    setCamRot(select_table_Frames.table_A_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_13":
                setSelectedTable("A_13");
                setCamPos(select_table_Frames.table_A_13.frame1.pos);
                setCamRot(select_table_Frames.table_A_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_13.frame2.pos);
                    setCamRot(select_table_Frames.table_A_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_14":
                setSelectedTable("A_14");
                setCamPos(select_table_Frames.table_A_14.frame1.pos);
                setCamRot(select_table_Frames.table_A_14.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_14.frame2.pos);
                    setCamRot(select_table_Frames.table_A_14.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_15":
                setSelectedTable("A_15");
                setCamPos(select_table_Frames.table_A_15.frame1.pos);
                setCamRot(select_table_Frames.table_A_15.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_15.frame2.pos);
                    setCamRot(select_table_Frames.table_A_15.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_16":
                setSelectedTable("A_16");
                setCamPos(select_table_Frames.table_A_16.frame1.pos);
                setCamRot(select_table_Frames.table_A_16.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_16.frame2.pos);
                    setCamRot(select_table_Frames.table_A_16.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_1":
                setSelectedTable("B_1");
                setCamPos(select_table_Frames.table_B_1.frame1.pos);
                setCamRot(select_table_Frames.table_B_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_1.frame2.pos);
                    setCamRot(select_table_Frames.table_B_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_2":
                setSelectedTable("B_2");
                setCamPos(select_table_Frames.table_B_2.frame1.pos);
                setCamRot(select_table_Frames.table_B_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_2.frame2.pos);
                    setCamRot(select_table_Frames.table_B_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_3":
                setSelectedTable("B_3");
                setCamPos(select_table_Frames.table_B_3.frame1.pos);
                setCamRot(select_table_Frames.table_B_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_3.frame2.pos);
                    setCamRot(select_table_Frames.table_B_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_4":
                setSelectedTable("B_4");
                setCamPos(select_table_Frames.table_B_4.frame1.pos);
                setCamRot(select_table_Frames.table_B_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_4.frame2.pos);
                    setCamRot(select_table_Frames.table_B_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_5":
                setSelectedTable("B_5");
                setCamPos(select_table_Frames.table_B_5.frame1.pos);
                setCamRot(select_table_Frames.table_B_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_5.frame2.pos);
                    setCamRot(select_table_Frames.table_B_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_6":
                setSelectedTable("B_6");
                setCamPos(select_table_Frames.table_B_6.frame1.pos);
                setCamRot(select_table_Frames.table_B_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_6.frame2.pos);
                    setCamRot(select_table_Frames.table_B_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_7":
                setSelectedTable("B_7");
                setCamPos(select_table_Frames.table_B_7.frame1.pos);
                setCamRot(select_table_Frames.table_B_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_7.frame2.pos);
                    setCamRot(select_table_Frames.table_B_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_8":
                setSelectedTable("B_8");
                setCamPos(select_table_Frames.table_B_8.frame1.pos);
                setCamRot(select_table_Frames.table_B_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_8.frame2.pos);
                    setCamRot(select_table_Frames.table_B_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_9":
                setSelectedTable("B_9");
                setCamPos(select_table_Frames.table_B_9.frame1.pos);
                setCamRot(select_table_Frames.table_B_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_9.frame2.pos);
                    setCamRot(select_table_Frames.table_B_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_10":
                setSelectedTable("B_10");
                setCamPos(select_table_Frames.table_B_10.frame1.pos);
                setCamRot(select_table_Frames.table_B_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_10.frame2.pos);
                    setCamRot(select_table_Frames.table_B_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_11":
                setSelectedTable("B_11");
                setCamPos(select_table_Frames.table_B_11.frame1.pos);
                setCamRot(select_table_Frames.table_B_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_11.frame2.pos);
                    setCamRot(select_table_Frames.table_B_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_12":
                setSelectedTable("B_12");
                setCamPos(select_table_Frames.table_B_12.frame1.pos);
                setCamRot(select_table_Frames.table_B_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_12.frame2.pos);
                    setCamRot(select_table_Frames.table_B_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_13":
                setSelectedTable("B_13");
                setCamPos(select_table_Frames.table_B_13.frame1.pos);
                setCamRot(select_table_Frames.table_B_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_13.frame2.pos);
                    setCamRot(select_table_Frames.table_B_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
        }
    };

    return (
        <>
            <div className="relative w-full h-screen">
                <div className="absolute top-0 left-0 w-full h-screen">
                    <CostumerScene
                        camPos={camPos}
                        camRot={camRot}
                        setCamPos={setCamPos}
                        setCamRot={setCamRot}
                        setIsPicking={setIsPicking}
                        setSelectedTable={setSelectedTable}
                        transitionToTable={transitionToTable}
                    />
                </div>

                {phase === 0 && !isName && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen">
                        <GetName
                            setPhase={setPhase}
                            setCamPos={setCamPos}
                            setCamRot={setCamRot}
                            setIsName={setIsName}
                            setCostumerName={setCostumerName}
                        />
                    </div>
                )}
                {phase === 1 && (
                    <div
                        className={`absolute top-0 left-0 z-1 w-full h-screen ${!isPicking && "pointer-events-none"}`}
                    >
                        <SelectTable
                            setPhase={setPhase}
                            setCamPos={setCamPos}
                            setCamRot={setCamRot}
                            isPicking={isPicking}
                            setIsPicking={setIsPicking}
                            costumerName={costumerName}
                            selectedTable={selectedTable}
                            transitionToTable={transitionToTable}
                        />
                    </div>
                )}
            </div>

            {/* <div className="fixed bottom-4">
                <SceneCameraController cameraFunctions={cameraFunctions} />
            </div> */}
        </>
    );
};

export default MainCostumer;

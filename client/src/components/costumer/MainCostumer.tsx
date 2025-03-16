import { useEffect, useState } from "react";

import SceneCameraController from "./SceneCameraController";
// import useCameraControl from "../../hooks/useCameraControl";
import CostumerScene from "./scenes/CostumerScene";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

import { loader_timer } from "../../App";
import useCostumerFrameProvider from "../../frames/useCostumerFrameProvider";
import useCameraControl from "../../hooks/useCameraControl";

const MainCostumer = () => {
    // const { camPos, camRot, cameraFunctions } = useCameraControl();
    // console.log(
    //     `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    // );
    // console.log(
    //     `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    // );

    const { init_Frame, pickName_Frame, selTable1stF_Frames } =
        useCostumerFrameProvider();

    const [camPos, setCamPos] = useState<[number, number, number]>(
        init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        init_Frame.rot,
    );

    const [phase, setPhase] = useState<number>(0);
    const [isName, setIsName] = useState<boolean>(false);
    console.log(setIsName);

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
                    setTimeout(() => {
                        setCamPos(selTable1stF_Frames.mid.pos);
                        setCamRot(selTable1stF_Frames.mid.rot);
                    }, loader_timer - 500);

                    break;
            }
        }
    }, []);

    return (
        <>
            <div className="relative w-full h-screen">
                <div className="absolute top-0 left-0 w-full h-screen">
                    <CostumerScene camPos={camPos} camRot={camRot} />
                </div>

                {phase === 0 && !isName && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen">
                        <GetName
                            setPhase={setPhase}
                            setCamPos={setCamPos}
                            setCamRot={setCamRot}
                            setIsName={setIsName}
                        />
                    </div>
                )}
                {phase === 1 && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen pointer-events-none">
                        <SelectTable
                            setPhase={setPhase}
                            setCamPos={setCamPos}
                            setCamRot={setCamRot}
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

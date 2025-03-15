import { useEffect, useState } from "react";

import SceneCameraController from "./SceneCameraController";
import { useCameraControl } from "../../hooks/useCameraControl";
import CostumerScene from "./scenes/CostumerScene";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

const MainCostumer = () => {
    const { camPos, camRot, cameraFunctions } = useCameraControl();
    console.log(
        `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    );
    console.log(
        `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    );

    const [phase, setPhase] = useState<number>(0);

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        switch (get_phase) {
            case "phase_0":
                setPhase(0);
                break;
            case "phase_1":
                setPhase(1);
                break;
        }
    }, []);

    return (
        <>
            <div className="relative w-full h-screen">
                <div className="absolute top-0 left-0 w-full h-screen">
                    <CostumerScene camPos={camPos} camRot={camRot} />
                </div>

                {/* 
                {phase === 0 && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen">
                        <GetName setPhase={setPhase} />
                    </div>
                )}
                {phase === 1 && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen ">
                        <SelectTable setPhase={setPhase} />
                    </div>
                )} */}
            </div>

            <div className="fixed bottom-4">
                <SceneCameraController cameraFunctions={cameraFunctions} />
            </div>
        </>
    );
};

export default MainCostumer;

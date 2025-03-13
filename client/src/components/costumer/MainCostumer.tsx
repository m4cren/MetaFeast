import { lazy, Suspense, useEffect, useState } from "react";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

import LoadingScreen from "../LoadingScreen";
import SceneCameraController from "./SceneCameraController";
import useCameraControl from "../../hooks/useCameraControl";

const CostumerScene = lazy(() => import("./scenes/CostumerScene"));

const MainCostumer = () => {
    const { camPos, camRot, cameraFunctions } = useCameraControl();
    console.log(
        `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    );
    console.log(
        `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    );

    const [phase, setPhase] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        if (get_phase === "phase_1") {
            setPhase(1);
        } else {
            setPhase(0);
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="fixed z-10">{isLoading && <LoadingScreen />}</div>

            <div className="fixed w-full h-screen z-1">
                <Suspense fallback={<LoadingScreen />}>
                    <CostumerScene camPos={camPos} camRot={camRot} />
                </Suspense>
            </div>

            <div className="fixed bottom-4 z-5">
                <SceneCameraController cameraFunctions={cameraFunctions} />
            </div>

            {/* <div>
                {phase === 0 && <GetName setPhase={setPhase} />}
                {phase === 1 && <SelectTable setPhase={setPhase} />}
            </div> */}
        </>
    );
};

export default MainCostumer;

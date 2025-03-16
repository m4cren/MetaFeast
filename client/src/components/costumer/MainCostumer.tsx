import { useEffect, useState } from "react";

import SceneCameraController from "./SceneCameraController";
// import useCameraControl from "../../hooks/useCameraControl";
import CostumerScene from "./scenes/CostumerScene";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

import { loader_timer } from "../../App";

const MainCostumer = () => {
    // const { camPos, camRot, cameraFunctions } = useCameraControl();

    const [camPos, setCamPos] = useState<[number, number, number]>([
        32.60000000000017, 6.999999999999989, -10.899999999999977,
    ]);
    const [camRot, setCamRot] = useState<[number, number, number]>([
        0.10140000000000005, 0.7800000000000002, 0.3200000000000002,
    ]);

    const [phase, setPhase] = useState<number>(0);

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");
        let token = localStorage.getItem("token");

        if (!token) {
            localStorage.removeItem("current_phase");
            setPhase(0);
        }

        const timer_initial = setTimeout(() => {
            setCamPos([
                33.500000000000185, 1.8999999999999977, -26.100000000000104,
            ]);
            setCamRot([
                0.10040000000000002, 2.199999999999997, 0.09999999999999999,
            ]);
        }, loader_timer - 500);

        switch (get_phase) {
            case "phase_0":
                setPhase(0);
                break;
            case "phase_1":
                setPhase(1);
                setTimeout(() => {
                    setCamPos([
                        19.19999999999998, 3.6999999999999993,
                        -17.599999999999984,
                    ]);
                    setCamRot([
                        0.10200000000000006, 0.029999999999999694,
                        0.019999999999999914,
                    ]);
                }, loader_timer - 500);

                break;
        }

        return () => clearTimeout(timer_initial);
    }, []);

    return (
        <>
            <div className="relative w-full h-screen">
                <div className="absolute top-0 left-0 w-full h-screen">
                    <CostumerScene camPos={camPos} camRot={camRot} />
                </div>

                {phase === 0 && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen">
                        <GetName
                            setPhase={setPhase}
                            setCamPos={setCamPos}
                            setCamRot={setCamRot}
                        />
                    </div>
                )}
                {phase === 1 && (
                    <div className="absolute top-0 left-0 z-1 w-full h-screen">
                        <SelectTable setPhase={setPhase} />
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

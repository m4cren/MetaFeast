import { useEffect, useState } from "react";

// import SceneCameraController from "./SceneCameraController";
// import useCameraControl from "../../hooks/useCameraControl";
import CostumerScene from "./scenes/CostumerScene";

import useFrameProvider from "../../frames/useFrameProvider";
import GetName from "./overlays/GetName";
import SelectTable from "./overlays/SelectTable";

import { useSocket } from "../../contexts/SocketContext";
import useCostumerName from "../../hooks/useCostumerName";
import Order from "./overlays/Order";
import Denied from "./overlays/Denied";
import useTableTransition from "../../hooks/useTableTransition";

interface MainCostumerProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isStart: boolean;
}

const MainCostumer: React.FC<MainCostumerProps> = ({
    setIsLoading,
    isStart,
}) => {
    // const { camPos, camRot, cameraFunctions } = useCameraControl();
    // console.log(
    //     `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    // );
    // console.log(
    //     `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    // );

    const { costumerName, setCostumerName } = useCostumerName();

    const [selectedTable, setSelectedTable] = useState<string>("");
    const [isDenied, setIsDenied] = useState<boolean>(false);

    const { init_Frame, pickName_Frame, selTable1stF_Frames } =
        useFrameProvider();

    const [camPos, setCamPos] = useState<[number, number, number]>(
        init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        init_Frame.rot,
    );
    const socket = useSocket();
    const [phase, setPhase] = useState<number>(0);
    const [isName, setIsName] = useState<boolean>(false);
    const [isPicking, setIsPicking] = useState<boolean>(false);
    const [table_picked] = useState<string | null>(
        localStorage.getItem("table-picked"),
    );
    const swoosh = new Audio("/audios/swoosh.wav");

    const transitionToTable = useTableTransition({
        setIsPicking,
        setCamPos,
        setCamRot,
        setSelectedTable,
    });

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        if (!get_phase) {
            setPhase(0);

            if (isStart) {
                swoosh.play();
                setCamPos(pickName_Frame.pos);
                setCamRot(pickName_Frame.rot);
            }
        } else {
            switch (get_phase) {
                case "phase_1":
                    setPhase(1);
                    if (table_picked) {
                        transitionToTable(table_picked);
                    } else {
                        if (isStart) {
                            setCamPos(selTable1stF_Frames.mid.pos);
                            setCamRot(selTable1stF_Frames.mid.rot);
                        }
                    }

                    break;
                case "phase_2":
                    setPhase(2);
                    if (table_picked) {
                        transitionToTable(table_picked);
                    } else {
                        if (isStart) {
                            setCamPos(selTable1stF_Frames.mid.pos);
                            setCamRot(selTable1stF_Frames.mid.rot);
                        }
                    }
                    break;
            }
        }
    }, [isStart]);

    useEffect(() => {
        socket?.on("is-costumer-accepted", (data) => {
            const accepted_costumer_name = data.costumer_name;

            if (
                accepted_costumer_name === localStorage.getItem("costumer_name")
            ) {
                setPhase(2);
                localStorage.setItem("current_phase", "phase_2");
            }
        });
        socket?.on("is-costumer-denied", (data) => {
            const denied_costumer_name = data.costumer_name;

            if (
                denied_costumer_name === localStorage.getItem("costumer_name")
            ) {
                localStorage.removeItem("token");
                setIsPicking(false);
                setIsDenied(true);
            }
        });

        return () => {
            socket?.off("is-costumer-accepted");
            socket?.off("is-costumer-denied");
        };
    }, [socket]);

    return (
        <>
            <div className="relative w-full h-screen">
                {isDenied && <Denied />}
                <div className="absolute top-0 left-0 w-full h-screen">
                    <CostumerScene
                        camPos={camPos}
                        camRot={camRot}
                        transitionToTable={transitionToTable}
                        setIsLoading={setIsLoading}
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
                {phase === 2 && (
                    <div
                        className={`absolute top-0 left-0 z-1 w-full h-screen ${!isPicking && "pointer-events-none"}`}
                    >
                        <Order />
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

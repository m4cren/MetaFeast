import { useEffect } from "react";

import { Props } from "../types/types";

const SceneCameraController = ({ cameraFunctions }: Props) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "w":
                    cameraFunctions.minusPosZ();
                    break;
                case "s":
                    cameraFunctions.addPosZ();
                    break;
                case "a":
                    cameraFunctions.minusPosX();
                    break;
                case "d":
                    cameraFunctions.addPosX();
                    break;
                case "f":
                    cameraFunctions.addPosY();
                    break;
                case "c":
                    cameraFunctions.minusPosY();
                    break;
                case "ArrowLeft":
                    cameraFunctions.addRotY();
                    break;
                case "ArrowRight":
                    cameraFunctions.minusRotY();
                    break;
                case "ArrowUp":
                    cameraFunctions.minusRotX();
                    break;
                case "ArrowDown":
                    cameraFunctions.addRotX();
                    break;
                case "q":
                    cameraFunctions.addRotZ();
                    break;
                case "e":
                    cameraFunctions.minusRotZ();
                    break;
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [cameraFunctions]);

    return (
        <div className="hidden">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-around items-center">
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addPosX}
                    >
                        POS +X
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addPosY}
                    >
                        POS +Y
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addPosZ}
                    >
                        POS +Z
                    </button>
                </div>
                <div className="flex flex-row justify-around items-center">
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusPosX}
                    >
                        POS -X
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusPosY}
                    >
                        POS -Y
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusPosZ}
                    >
                        POS -Z
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-around items-center">
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addRotX}
                    >
                        ROT +X
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addRotY}
                    >
                        ROT +Y
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.addRotZ}
                    >
                        ROT +Z
                    </button>
                </div>
                <div className="flex flex-row justify-around items-center">
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusRotX}
                    >
                        ROT -X
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusRotY}
                    >
                        ROT -Y
                    </button>
                    <button
                        className="cam-ctrl-btn"
                        onClick={cameraFunctions.minusRotZ}
                    >
                        ROT -Z
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SceneCameraController;

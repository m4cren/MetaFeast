import { useState } from "react";

const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(20.2);
    const [posY, setPosY] = useState<number>(3.5);
    const [posZ, setPosZ] = useState<number>(3.8);

    const [rotX, setRotX] = useState<number>(0.1);
    const [rotY, setRotY] = useState<number>(0);
    const [rotZ, setRotZ] = useState<number>(0);

    const camPos = [posX, posY, posZ];
    const camRot = [rotX, rotY, rotZ];

    const addPosX = () => setPosX((prevPosX) => prevPosX + 0.1);
    const addPosY = () => setPosY((prevPosY) => prevPosY + 0.1);
    const addPosZ = () => setPosZ((prevPosZ) => prevPosZ + 0.1);

    const addRotX = () => setRotX((prevRotX) => prevRotX + 0.0001);
    const addRotY = () => setRotY((prevRotY) => prevRotY + 0.01);
    const addRotZ = () => setRotZ((prevRotZ) => prevRotZ + 0.01);

    const minusPosX = () => setPosX((prevPosX) => prevPosX - 0.1);
    const minusPosY = () => setPosY((prevPosY) => prevPosY - 0.1);
    const minusPosZ = () => setPosZ((prevPosZ) => prevPosZ - 0.1);

    const minusRotX = () => setRotX((prevRotX) => prevRotX - 0.0001);
    const minusRotY = () => setRotY((prevRotY) => prevRotY - 0.01);
    const minusRotZ = () => setRotZ((prevRotZ) => prevRotZ - 0.01);

    return {
        camPos,
        camRot,
        cameraFunctions: {
            addPosX,
            addPosY,
            addPosZ,
            minusPosX,
            minusPosY,
            minusPosZ,
            addRotX,
            addRotY,
            addRotZ,
            minusRotX,
            minusRotY,
            minusRotZ,
        },
    };
};

export default useCameraControl;

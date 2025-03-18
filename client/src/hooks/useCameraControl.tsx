import { useState } from "react";

const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(19.340000000000433);
    const [posY, setPosY] = useState<number>(6.549999999999899);
    const [posZ, setPosZ] = useState<number>(-15.979999999999594);

    const [rotX, setRotX] = useState<number>(0.10130000000000004);
    const [rotY, setRotY] = useState<number>(5.5799999999999255);
    const [rotZ, setRotZ] = useState<number>(-0.2800000000000002);

    const camPos = [posX, posY, posZ];
    const camRot = [rotX, rotY, rotZ];

    const addPosX = () => setPosX((prevPosX) => prevPosX + 0.01);
    const addPosY = () => setPosY((prevPosY) => prevPosY + 0.01);
    const addPosZ = () => setPosZ((prevPosZ) => prevPosZ + 0.01);

    const addRotX = () => setRotX((prevRotX) => prevRotX + 0.0001);
    const addRotY = () => setRotY((prevRotY) => prevRotY + 0.01);
    const addRotZ = () => setRotZ((prevRotZ) => prevRotZ + 0.01);

    const minusPosX = () => setPosX((prevPosX) => prevPosX - 0.01);
    const minusPosY = () => setPosY((prevPosY) => prevPosY - 0.01);
    const minusPosZ = () => setPosZ((prevPosZ) => prevPosZ - 0.01);

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

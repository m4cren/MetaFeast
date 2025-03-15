import { useState } from "react";

export const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(33.500000000000185);
    const [posY, setPosY] = useState<number>(1.8999999999999977);
    const [posZ, setPosZ] = useState<number>(-26.100000000000104);

    const [rotX, setRotX] = useState<number>(0.10040000000000002);
    const [rotY, setRotY] = useState<number>(2.199999999999997);
    const [rotZ, setRotZ] = useState<number>(0.09999999999999999);

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

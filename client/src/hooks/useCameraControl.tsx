import { useState } from "react";

const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(22.50000000000003);
    const [posY, setPosY] = useState<number>(7.199999999999978);
    const [posZ, setPosZ] = useState<number>(-16.74999999999997);

    const [rotX, setRotX] = useState<number>(0.10180000000000006);
    const [rotY, setRotY] = useState<number>(0.44999999999999996);
    const [rotZ, setRotZ] = useState<number>(0.24);

    const camPos = [posX, posY, posZ];
    const camRot = [rotX, rotY, rotZ];

    const addPosX = () => setPosX((prevPosX) => prevPosX + 0.05);
    const addPosY = () => setPosY((prevPosY) => prevPosY + 0.05);
    const addPosZ = () => setPosZ((prevPosZ) => prevPosZ + 0.05);

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

import { useState } from "react";

const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(19.19999999999998);
    const [posY, setPosY] = useState<number>(3.199999999999999);
    const [posZ, setPosZ] = useState<number>(-18.199999999999992);

    const [rotX, setRotX] = useState<number>(0.10200000000000006);
    const [rotY, setRotY] = useState<number>(0.7500000000000002);
    const [rotZ, setRotZ] = useState<number>(0.42000000000000015);

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

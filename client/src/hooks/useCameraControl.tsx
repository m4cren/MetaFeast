import { useState } from "react";

const useCameraControl = () => {
    const [posX, setPosX] = useState<number>(19.279999999999994);
    const [posY, setPosY] = useState<number>(7.559999999999917);
    const [posZ, setPosZ] = useState<number>(-18.16000000000007);

    const [rotX, setRotX] = useState<number>(0.10370000000000011);
    const [rotY, setRotY] = useState<number>(-0.010000000000000309);
    const [rotZ, setRotZ] = useState<number>(-0.010000000000000087);

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

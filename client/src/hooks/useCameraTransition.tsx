import { useFrame, useThree } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const useCameraTransition = (
    targetPos: [number, number, number],
    targetRot: [number, number, number],
) => {
    const { camera } = useThree();

    const motionX = useMotionValue(targetPos[0]);
    const motionY = useMotionValue(targetPos[1]);
    const motionZ = useMotionValue(targetPos[2]);

    const motionRotX = useMotionValue(targetRot[0]);
    const motionRotY = useMotionValue(targetRot[1]);
    const motionRotZ = useMotionValue(targetRot[2]);

    const x = useSpring(motionX, { stiffness: 80, damping: 20 });
    const y = useSpring(motionY, { stiffness: 80, damping: 20 });
    const z = useSpring(motionZ, { stiffness: 80, damping: 20 });

    const rotX = useSpring(motionRotX, { stiffness: 80, damping: 20 });
    const rotY = useSpring(motionRotY, { stiffness: 80, damping: 20 });
    const rotZ = useSpring(motionRotZ, { stiffness: 80, damping: 20 });

    useEffect(() => {
        motionX.set(targetPos[0]);
        motionY.set(targetPos[1]);
        motionZ.set(targetPos[2]);

        motionRotX.set(targetRot[0]);
        motionRotY.set(targetRot[1]);
        motionRotZ.set(targetRot[2]);
    }, [targetPos, targetRot]);

    useFrame(() => {
        camera.position.set(x.get(), y.get(), z.get());
        camera.rotation.set(rotX.get(), rotY.get(), rotZ.get());
    });
};

export default useCameraTransition;

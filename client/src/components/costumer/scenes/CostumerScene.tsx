import { Canvas } from "@react-three/fiber";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { lazy, Suspense } from "react";
import BackgroundScene from "./BackgroundScene";

const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const CostumerScene = ({ camPos, camRot }: CameraControl) => {
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
                fov={85}
            />
            {/* <directionalLight position={[0, 5, 5]} /> */}

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

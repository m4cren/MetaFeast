import { Canvas } from "@react-three/fiber";

import { PerspectiveCamera } from "@react-three/drei";
import { lazy, Suspense } from "react";
import CameraController from "../../CameraController";

const BackgroundScene = lazy(() => import("./BackgroundScene"));
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));
const SingleSeat = lazy(() => import("../../models/tables/SingleSeat"));
const DoubleSeat = lazy(() => import("../../models/tables/DoubleSeat"));
const QuadSeat = lazy(() => import("../../models/tables/QuadSeat"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const CostumerScene = ({ camPos, camRot }: CameraControl) => {
    return (
        <Canvas>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={80} />

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />

                <QuadSeat />
                <DoubleSeat />
                <SingleSeat />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

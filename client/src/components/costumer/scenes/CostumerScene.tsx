import { Canvas } from "@react-three/fiber";

import { PerspectiveCamera } from "@react-three/drei";
import { lazy, Suspense } from "react";
import CameraController from "../../CameraController";
import QuadSeat from "../../models/tables/QuadSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import DoubleSeat from "../../models/tables/DoubleSeat";

const BackgroundScene = lazy(() => import("./BackgroundScene"));
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const CostumerScene = ({ camPos, camRot }: CameraControl) => {
    const uniqueKey = Date.now();
    return (
        <Canvas gl={{ powerPreference: "high-performance" }}>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={80} />

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />
                <QuadSeat key={`quad-${uniqueKey}`} />
                <SingleSeat key={`single-${uniqueKey}`} />
                <DoubleSeat key={`double-${uniqueKey}`} />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

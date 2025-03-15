import { Canvas } from "@react-three/fiber";

import {
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
} from "@react-three/drei";
import { lazy, Suspense } from "react";

const BackgroundScene = lazy(() => import("./BackgroundScene"));
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));
const SingleSeat = lazy(() => import("../../models/tables/SingleSeat"));
const DoubleSeat = lazy(() => import("../../models/tables/DoubleSeat"));
const QuadSeat = lazy(() => import("../../models/tables/QuadSeat"));
const CavedSingleSeat = lazy(
    () => import("../../models/tables/CavedSingleSeat"),
);
const CavedDoubleSeat = lazy(
    () => import("../../models/tables/CavedDoubleSeat"),
);

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

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />

                <CavedDoubleSeat />
                {/* <CavedSingleSeat /> */}
                {/* <QuadSeat /> */}
                {/* <DoubleSeat /> */}
                {/* <SingleSeat /> */}
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

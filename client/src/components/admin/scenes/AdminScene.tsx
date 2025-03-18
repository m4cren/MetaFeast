import { Canvas } from "@react-three/fiber";
import BackgroundScene from "../../BackgroundScene";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../LoadingScreen";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CameraController from "../../CameraController";
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

const AdminScene = () => {
    return (
        <Canvas>
            <BackgroundScene />
            <Suspense fallback={null}>
                <Restaurant />
            </Suspense>
        </Canvas>
    );
};

export default AdminScene;

import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { lazy, Suspense } from "react";

const Restaurant = lazy(() => import("../../models/Restaurant"));

const CostumerScene = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.4} />
            <directionalLight position={[0, 5, 5]} />
            <Suspense fallback={null}>
                <Restaurant />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
};

export default CostumerScene;

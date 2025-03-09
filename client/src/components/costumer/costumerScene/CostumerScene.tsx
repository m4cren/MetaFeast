import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sphere from "../../models/Sphere";

const CostumerScene = () => {
    return (
        <Canvas>
            <directionalLight position={[0, 5, 5]} />
            <Sphere />
            <OrbitControls />
        </Canvas>
    );
};

export default CostumerScene;

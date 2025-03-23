import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
interface ModelProps {
    onLoadComplete: () => void;
}

const Restaurant: React.FC<ModelProps> = ({ onLoadComplete }) => {
    const model = useGLTF("/models/restaurant.glb");

    useEffect(() => {
        onLoadComplete();
    }, [onLoadComplete]);
    return (
        <object3D>
            <primitive object={model.scene} />
        </object3D>
    );
};

export default Restaurant;

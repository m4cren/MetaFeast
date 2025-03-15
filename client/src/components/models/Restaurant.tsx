import { useGLTF } from "@react-three/drei";

const Restaurant = () => {
    const model = useGLTF("/models/restaurant.glb");
    return (
        <object3D>
            <primitive object={model.scene} />
        </object3D>
    );
};

export default Restaurant;

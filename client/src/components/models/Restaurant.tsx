import { useGLTF } from "@react-three/drei";

const Restaurant = () => {
    const model = useGLTF("/models/restaurant_packed.glb");
    return (
        <object3D>
            <primitive object={model.scene} />
        </object3D>
    );
};

useGLTF.preload("/models/restaurant_packed.glb");

export default Restaurant;

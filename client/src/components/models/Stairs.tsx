import { useGLTF } from "@react-three/drei";

const Stairs = () => {
    const model = useGLTF("/models/stairs.glb");

    return (
        <object3D>
            <primitive object={model.scene} />
        </object3D>
    );
};

export default Stairs;

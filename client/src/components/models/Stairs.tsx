import { useGLTF } from "@react-three/drei";

const Stairs = () => {
    const model = useGLTF("/models/stairs_packed.glb");
    return (
        <object3D onClick={() => alert("Go up stairs?")}>
            <primitive object={model.scene} />
        </object3D>
    );
};

export default Stairs;

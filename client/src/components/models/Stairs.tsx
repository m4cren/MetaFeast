import { useGLTF } from "@react-three/drei";

const Stairs = () => {
    const model = useGLTF("/models/stairs.glb");

    const handleClick = () => {
        console.log("Go upstairs?");
    };

    return (
        <object3D onClick={handleClick}>
            <primitive object={model.scene} />
        </object3D>
    );
};

export default Stairs;

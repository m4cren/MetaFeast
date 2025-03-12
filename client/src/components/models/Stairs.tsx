import { useGLTF } from "@react-three/drei";

const Stairs = () => {
    const restaurant = useGLTF("/models/stairs_packed.glb");
    return (
        <object3D onClick={() => alert("Go up stairs?")}>
            <primitive object={restaurant.scene} />
        </object3D>
    );
};

export default Stairs;

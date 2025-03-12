import { useGLTF } from "@react-three/drei";

const Restaurant = () => {
    const restaurant = useGLTF("/models/restaurant_packed.glb");
    return (
        <object3D>
            <primitive object={restaurant.scene} />
        </object3D>
    );
};

export default Restaurant;

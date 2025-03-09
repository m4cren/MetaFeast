import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Sphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 30, 30]} />
            <meshStandardMaterial color={"orange"} wireframe />
        </mesh>
    );
};

export default Sphere;

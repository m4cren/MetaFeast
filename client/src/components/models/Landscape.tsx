import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";

interface LandScapeProps {
    url: string;
    color: string;
    type: string;
}

const Landscape = ({ url, color, type }: LandScapeProps) => {
    const { scene } = useGLTF(url);
    const meshRef = useRef<THREE.Mesh>(null);

    let speed = 1.3;

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime(); //
        const amplitude = 2; //
        const frequency = 0.01; //

        if (type == "even") {
            if (meshRef.current) {
                meshRef.current.position.x =
                    Math.sin(time * frequency * Math.PI * speed) * amplitude;
            }
        } else if (type == "odd") {
            if (meshRef.current) {
                meshRef.current.position.x =
                    Math.sin(time * frequency * Math.PI * -speed) * amplitude;
            }
        }
    });

    scene.traverse((child) => {
        if (child instanceof Mesh) {
            child.material = new MeshBasicMaterial({ color: `#${color}` });
        }
    });

    return <primitive object={scene} ref={meshRef} />;
};

export default Landscape;

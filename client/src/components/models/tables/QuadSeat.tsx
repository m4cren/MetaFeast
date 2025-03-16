import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const TABLE_ID = ["A7", "A8", "A15", "A16", "B1", "B3", "B4", "B5"];
const TABLE_POSITION = [
    [15.3, 0.76, -19],
    [15.3, 0.76, -22.3],
    [21.3, 0.76, -19],
    [21.3, 0.76, -22.3],
    [14, 3.98, -16.9],
    [14, 3.98, -23],
    [16.4, 3.98, -18.4],
    [16.4, 3.98, -21.5],
];

const QuadSeat = () => {
    const { scene } = useGLTF("/models/quad_seat.glb");
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!scene) return;

        const foundMeshes: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                foundMeshes.push(child);
                child.visible = true;
                child.frustumCulled = false;
            }
        });

        if (foundMeshes.length > 0) {
            setMeshes(foundMeshes);
            setIsLoaded(true);
        }
    }, [scene]);

    useEffect(() => {
        if (!meshRef.current || meshes.length === 0) return;

        console.log("✅ Setting up instanced meshes...");

        TABLE_POSITION.forEach((pos, index) => {
            const instanceMatrix = new THREE.Matrix4();
            instanceMatrix.setPosition(new THREE.Vector3(...pos));
            meshRef.current!.setMatrixAt(index, instanceMatrix);
        });

        meshRef.current!.instanceMatrix.needsUpdate = true;
    }, [meshes]);

    if (!isLoaded || meshes.length === 0) return null;

    const handleClick = (event: ThreeEvent<PointerEvent>) => {
        if (event.instanceId !== undefined) {
            console.log(`TABLE ID: ${TABLE_ID[event.instanceId]}`);
        }
    };

    return (
        <instancedMesh
            ref={meshRef}
            args={[
                meshes[0].geometry,
                meshes[0].material,
                TABLE_POSITION.length,
            ]}
            onClick={handleClick}
        />
    );
};

export default QuadSeat;

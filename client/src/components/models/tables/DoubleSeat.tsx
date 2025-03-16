import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const TABLE_ID = [
    "B2",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
];

const TABLE_POSITION = [
    [14.3, 3.98, -20.2],
    [19, 3.98, -17.5],
    [19, 3.98, -20.25],
    [19, 3.98, -23],
    [21, 3.98, -17.5],
    [21, 3.98, -20.25],
    [21, 3.98, -23],
    [23.7, 3.98, -21.4],
    [23.7, 3.98, -23.8],
    [17.75, 0.76, -18.5],
    [17.75, 0.76, -21],
    [17.75, 0.76, -23.5],
    [19.4, 0.76, -18.5],
    [19.4, 0.76, -21],
    [19.4, 0.76, -23.5],
];

const DoubleSeat = () => {
    const { scene } = useGLTF("/models/double_seat.glb");
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

export default DoubleSeat;

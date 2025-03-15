import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
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

    const meshes = useMemo(() => {
        const foundMeshes: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                foundMeshes.push(child);
            }
        });
        return foundMeshes;
    }, [scene]);

    useEffect(() => {
        const matrix = new THREE.Matrix4();

        const positions = TABLE_POSITION.map(
            (pos) => new THREE.Vector3(...pos),
        );

        positions.forEach((pos, index) => {
            matrix.setPosition(pos);
            meshRef.current!.setMatrixAt(index, matrix);
        });

        meshRef.current!.instanceMatrix.needsUpdate = true;
    }, [meshes]);

    if (meshes.length === 0) return null;

    const handleClick = (event: ThreeEvent<PointerEvent>) => {
        if (event.instanceId !== undefined) {
            console.log(`TABLE ID: ${TABLE_ID[event.instanceId]}`);
        }
    };

    return (
        <instancedMesh
            ref={meshRef}
            args={[meshes[0].geometry, meshes[0].material, 15]}
            onClick={handleClick}
        />
    );
};

export default DoubleSeat;

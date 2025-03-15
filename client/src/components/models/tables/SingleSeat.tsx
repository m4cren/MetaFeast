import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const TABLE_ID = ["A1", "A2", "A3", "A4", "A5", "A6"];

const TABLE_POSITION = [
    [14.2, 0.76, -18.3],
    [14.2, 0.76, -19.6],
    [14.2, 0.76, -20.9],
    [14.2, 0.76, -22.2],
    [14.2, 0.76, -23.5],
    [14.2, 0.76, -24.8],
];

const SingleSeat = () => {
    const { scene } = useGLTF("/models/single_seat.glb");

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
        if (!meshRef.current) return;

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
            args={[meshes[0].geometry, meshes[0].material, 6]}
            onClick={handleClick}
        />
    );
};

export default SingleSeat;

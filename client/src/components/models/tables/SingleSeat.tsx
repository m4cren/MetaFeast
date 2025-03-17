import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useTableRequest from "../../../hooks/useTableRequest";

const TABLE_ID = ["A-1", "A-2", "A-3", "A-4", "A-5", "A-6"];

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

    const { sendData } = useTableRequest();

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
            let table_id: string = TABLE_ID[event.instanceId];

            sendData(table_id);
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

export default SingleSeat;

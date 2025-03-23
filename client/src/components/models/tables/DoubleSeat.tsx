import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TableStatus } from "../../../types/types";

interface AvailableTable {
    availableTable: TableStatus[];
}

interface Props {
    transitionToTable?: (table_id: string) => void;
    role: string;
}

const DoubleSeat: React.FC<AvailableTable & Props> = ({
    availableTable,
    transitionToTable = () => {},
    role,
}) => {
    const TABLE_POSITION = availableTable.map((table) => {
        return table.table_position;
    });
    const TABLE_ID = availableTable.map((table) => {
        return table.table_name;
    });

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

        const colorArray = new Float32Array(TABLE_POSITION.length * 3);

        TABLE_POSITION.forEach((pos, index) => {
            const instanceMatrix = new THREE.Matrix4();
            instanceMatrix.setPosition(new THREE.Vector3(...pos));
            meshRef.current!.setMatrixAt(index, instanceMatrix);

            if (role === "admin") {
                const table = availableTable[index];
                const color = new THREE.Color(
                    table.costumer_status === "Available"
                        ? "springgreen"
                        : table.costumer_status === "Ordering"
                          ? "yellow"
                          : table.costumer_status === "Eating"
                            ? "blue"
                            : table.costumer_status === "Billing"
                              ? "pink"
                              : "brown",
                );

                color.toArray(colorArray, index * 3);
            }
        });

        meshRef.current!.instanceMatrix.needsUpdate = true;

        if (role === "admin") {
            const colorAttribute = new THREE.InstancedBufferAttribute(
                colorArray,
                3,
            );
            meshRef.current!.geometry.setAttribute("color", colorAttribute);
        }
    }, [meshes, availableTable]);

    if (!isLoaded || meshes.length === 0) return null;

    const handleClick = (event: ThreeEvent<PointerEvent>) => {
        if (event.instanceId !== undefined) {
            let table_id: string = TABLE_ID[event.instanceId];

            transitionToTable(table_id);
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
        >
            {role === "admin" && <meshStandardMaterial vertexColors />}
        </instancedMesh>
    );
};

export default DoubleSeat;

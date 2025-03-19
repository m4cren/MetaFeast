import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useTableRequest from "../../../hooks/useTableRequest";

interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
}

interface AvailableTable {
    availableTable: TableStatus[];
}

interface Props {
    transitionToTable?: (table_id: string) => void;
}

const QuadSeat: React.FC<AvailableTable & Props> = ({
    availableTable,
    transitionToTable = () => {},
}) => {
    const TABLE_POSITION = availableTable.map((table) => {
        return table.table_position;
    });
    const TABLE_ID = availableTable.map((table) => {
        return table.table_name;
    });
    const { sendData } = useTableRequest();
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

        TABLE_POSITION.forEach((pos, index) => {
            const instanceMatrix = new THREE.Matrix4();
            instanceMatrix.setPosition(new THREE.Vector3(...pos));
            meshRef.current!.setMatrixAt(index, instanceMatrix);
        });

        meshRef.current!.instanceMatrix.needsUpdate = true;
    }, [meshes]);

    if (!isLoaded || meshes.length === 0) return null;

    const handleClick = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();

        if (event.instanceId !== undefined) {
            let table_id: string = TABLE_ID[event.instanceId];

            sendData(table_id);
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
        />
    );
};

export default QuadSeat;

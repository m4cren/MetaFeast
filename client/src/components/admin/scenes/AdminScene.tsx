import { Canvas } from "@react-three/fiber";
import BackgroundScene from "../../BackgroundScene";
import { lazy, Suspense } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import CameraController from "../../CameraController";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import DoubleSeat from "../../models/tables/DoubleSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import QuadSeat from "../../models/tables/QuadSeat";
import { TableStatus } from "../../../types/types";
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const AdminScene = ({ camPos, camRot }: CameraControl) => {
    const { tables } = useTableStatus() ?? { tables: [] };

    const singleTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Single_seat",
    );
    const doubleTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Double_seat",
    );
    const quadTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Quad_seat",
    );
    return (
        <Canvas>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={103} />
            <Suspense fallback={null}>
                <BackgroundScene />
                <Restaurant />
                <Stairs />

                <SingleSeat availableTable={singleTable} role="admin" />
                <DoubleSeat availableTable={doubleTable} role="admin" />
                <QuadSeat availableTable={quadTable} role="admin" />
            </Suspense>
        </Canvas>
    );
};

export default AdminScene;

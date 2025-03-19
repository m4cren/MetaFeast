import { Canvas } from "@react-three/fiber";
import BackgroundScene from "../../BackgroundScene";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../LoadingScreen";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CameraController from "../../CameraController";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import DoubleSeat from "../../models/tables/DoubleSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import QuadSeat from "../../models/tables/QuadSeat";
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
}

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const AdminScene = ({ camPos, camRot }: CameraControl) => {
    const tables: TableStatus[] = useTableStatus() ?? [];

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

                <SingleSeat availableTable={singleTable} />
                <DoubleSeat availableTable={doubleTable} />
                <QuadSeat availableTable={quadTable} />
            </Suspense>
        </Canvas>
    );
};

export default AdminScene;

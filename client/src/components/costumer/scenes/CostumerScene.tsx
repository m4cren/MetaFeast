import { Canvas } from "@react-three/fiber";

import { PerspectiveCamera } from "@react-three/drei";
import React, { lazy, Suspense } from "react";
import CameraController from "../../CameraController";
import QuadSeat from "../../models/tables/QuadSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import DoubleSeat from "../../models/tables/DoubleSeat";
import { useTableStatus } from "../../../contexts/TableStatusContext";

import BackgroundScene from "../../BackgroundScene";

const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsPicking: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedTable: React.Dispatch<React.SetStateAction<string>>;
    transitionToTable: (table_id: string) => void;
}
interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
}

const CostumerScene = ({
    camPos,
    camRot,
    transitionToTable,
}: CameraControl) => {
    const uniqueKey = Date.now();
    const tables: TableStatus[] = useTableStatus() ?? [];

    const availableSingleTable: TableStatus[] = tables?.filter(
        (table) =>
            table.table_type === "Single_seat" &&
            table.table_status === "Available",
    );
    const availableDoubleTable: TableStatus[] = tables?.filter(
        (table) =>
            table.table_type === "Double_seat" &&
            table.table_status === "Available",
    );
    const availableQuadTable: TableStatus[] = tables?.filter(
        (table) =>
            table.table_type === "Quad_seat" &&
            table.table_status === "Available",
    );

    return (
        <Canvas gl={{ powerPreference: "high-performance" }}>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={95} />

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />
                <QuadSeat
                    key={`quad-${uniqueKey}`}
                    availableTable={availableQuadTable}
                    transitionToTable={transitionToTable}
                />
                <SingleSeat
                    key={`single-${uniqueKey}`}
                    availableTable={availableSingleTable}
                    transitionToTable={transitionToTable}
                />
                <DoubleSeat
                    key={`double-${uniqueKey}`}
                    availableTable={availableDoubleTable}
                    transitionToTable={transitionToTable}
                />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

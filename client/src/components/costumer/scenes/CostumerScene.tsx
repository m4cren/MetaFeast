import { Canvas } from "@react-three/fiber";

import { PerspectiveCamera } from "@react-three/drei";
import React, { lazy, Suspense, useEffect } from "react";
import CameraController from "../../CameraController";
import QuadSeat from "../../models/tables/QuadSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import DoubleSeat from "../../models/tables/DoubleSeat";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import { TableStatus } from "../../../types/types";
import BackgroundScene from "../../BackgroundScene";
import { useSocket } from "../../../contexts/SocketContext";

const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
    transitionToTable: (table_id: string) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CostumerScene = ({
    camPos,
    camRot,
    transitionToTable,
    setIsLoading,
}: CameraControl) => {
    const socket = useSocket();
    const uniqueKey = Date.now();
    const { tables, getTableStatus } = useTableStatus() ?? {
        tables: [],
        getTableStatus: () => {},
    };
    const selectedTable = localStorage.getItem("table-picked");
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

    const selected_table = tables.find(
        (table) => table.table_name === selectedTable,
    );

    if (selected_table) {
        availableSingleTable.push(selected_table);
        availableDoubleTable.push(selected_table);
        availableQuadTable.push(selected_table);
    }
    useEffect(() => {
        socket?.on("is-costumer-accepted", (_) => {
            console.log("hello");
            getTableStatus();
        });
        socket?.on("is-costumer-denied", (_) => {
            console.log("hello");
            getTableStatus();
        });

        return () => {
            socket?.off("is-table-accepted");
            socket?.off("is-table-denied");
        };
    }, [socket]);

    return (
        <Canvas gl={{ powerPreference: "high-performance" }}>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={95} />

            <Suspense fallback={null}>
                <Restaurant onLoadComplete={() => setIsLoading(false)} />
                <Stairs />
                <BackgroundScene />
                <QuadSeat
                    key={`quad-${uniqueKey}`}
                    availableTable={availableQuadTable}
                    transitionToTable={transitionToTable}
                    role="costumer"
                />
                <SingleSeat
                    key={`single-${uniqueKey}`}
                    availableTable={availableSingleTable}
                    transitionToTable={transitionToTable}
                    role="costumer"
                />
                <DoubleSeat
                    key={`double-${uniqueKey}`}
                    availableTable={availableDoubleTable}
                    transitionToTable={transitionToTable}
                    role="costumer"
                />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

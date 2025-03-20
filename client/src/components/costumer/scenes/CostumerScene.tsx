import { Canvas } from "@react-three/fiber";

import { PerspectiveCamera } from "@react-three/drei";
import React, { lazy, Suspense } from "react";
import CameraController from "../../CameraController";
import QuadSeat from "../../models/tables/QuadSeat";
import SingleSeat from "../../models/tables/SingleSeat";
import DoubleSeat from "../../models/tables/DoubleSeat";
import { useTableStatus } from "../../../contexts/TableStatusContext";
import useCostumerFrameProvider from "../../../frames/useFrameProvider";
import BackgroundScene from "../../BackgroundScene";
import useFrameProvider from "../../../frames/useFrameProvider";

const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsPicking: React.Dispatch<React.SetStateAction<boolean>>;
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
    setCamPos,
    setCamRot,
    setIsPicking,
}: CameraControl) => {
    const uniqueKey = Date.now();
    const tables: TableStatus[] = useTableStatus() ?? [];
    const { select_table_Frames } = useFrameProvider();

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

    const transitionToTable = (table_id: string) => {
        switch (table_id) {
            case "A_1":
                setCamPos(select_table_Frames.table_A_1.frame1.pos);
                setCamRot(select_table_Frames.table_A_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_1.frame2.pos);
                    setCamRot(select_table_Frames.table_A_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_2":
                setCamPos(select_table_Frames.table_A_2.frame1.pos);
                setCamRot(select_table_Frames.table_A_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_2.frame2.pos);
                    setCamRot(select_table_Frames.table_A_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_3":
                setCamPos(select_table_Frames.table_A_3.frame1.pos);
                setCamRot(select_table_Frames.table_A_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_3.frame2.pos);
                    setCamRot(select_table_Frames.table_A_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_4":
                setCamPos(select_table_Frames.table_A_4.frame1.pos);
                setCamRot(select_table_Frames.table_A_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_4.frame2.pos);
                    setCamRot(select_table_Frames.table_A_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_5":
                setCamPos(select_table_Frames.table_A_5.frame1.pos);
                setCamRot(select_table_Frames.table_A_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_5.frame2.pos);
                    setCamRot(select_table_Frames.table_A_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_6":
                setCamPos(select_table_Frames.table_A_6.frame1.pos);
                setCamRot(select_table_Frames.table_A_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_6.frame2.pos);
                    setCamRot(select_table_Frames.table_A_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_7":
                setCamPos(select_table_Frames.table_A_7.frame1.pos);
                setCamRot(select_table_Frames.table_A_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_7.frame2.pos);
                    setCamRot(select_table_Frames.table_A_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_8":
                setCamPos(select_table_Frames.table_A_8.frame1.pos);
                setCamRot(select_table_Frames.table_A_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_8.frame2.pos);
                    setCamRot(select_table_Frames.table_A_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_9":
                setCamPos(select_table_Frames.table_A_9.frame1.pos);
                setCamRot(select_table_Frames.table_A_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_9.frame2.pos);
                    setCamRot(select_table_Frames.table_A_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_10":
                setCamPos(select_table_Frames.table_A_10.frame1.pos);
                setCamRot(select_table_Frames.table_A_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_10.frame2.pos);
                    setCamRot(select_table_Frames.table_A_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_11":
                setCamPos(select_table_Frames.table_A_11.frame1.pos);
                setCamRot(select_table_Frames.table_A_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_11.frame2.pos);
                    setCamRot(select_table_Frames.table_A_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_12":
                setCamPos(select_table_Frames.table_A_12.frame1.pos);
                setCamRot(select_table_Frames.table_A_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_12.frame2.pos);
                    setCamRot(select_table_Frames.table_A_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_13":
                setCamPos(select_table_Frames.table_A_13.frame1.pos);
                setCamRot(select_table_Frames.table_A_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_13.frame2.pos);
                    setCamRot(select_table_Frames.table_A_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_14":
                setCamPos(select_table_Frames.table_A_14.frame1.pos);
                setCamRot(select_table_Frames.table_A_14.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_14.frame2.pos);
                    setCamRot(select_table_Frames.table_A_14.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_15":
                setCamPos(select_table_Frames.table_A_15.frame1.pos);
                setCamRot(select_table_Frames.table_A_15.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_15.frame2.pos);
                    setCamRot(select_table_Frames.table_A_15.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_16":
                setCamPos(select_table_Frames.table_A_16.frame1.pos);
                setCamRot(select_table_Frames.table_A_16.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_16.frame2.pos);
                    setCamRot(select_table_Frames.table_A_16.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_1":
                setCamPos(select_table_Frames.table_B_1.frame1.pos);
                setCamRot(select_table_Frames.table_B_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_1.frame2.pos);
                    setCamRot(select_table_Frames.table_B_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_2":
                setCamPos(select_table_Frames.table_B_2.frame1.pos);
                setCamRot(select_table_Frames.table_B_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_2.frame2.pos);
                    setCamRot(select_table_Frames.table_B_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_3":
                setCamPos(select_table_Frames.table_B_3.frame1.pos);
                setCamRot(select_table_Frames.table_B_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_3.frame2.pos);
                    setCamRot(select_table_Frames.table_B_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_4":
                setCamPos(select_table_Frames.table_B_4.frame1.pos);
                setCamRot(select_table_Frames.table_B_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_4.frame2.pos);
                    setCamRot(select_table_Frames.table_B_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_5":
                setCamPos(select_table_Frames.table_B_5.frame1.pos);
                setCamRot(select_table_Frames.table_B_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_5.frame2.pos);
                    setCamRot(select_table_Frames.table_B_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_6":
                setCamPos(select_table_Frames.table_B_6.frame1.pos);
                setCamRot(select_table_Frames.table_B_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_6.frame2.pos);
                    setCamRot(select_table_Frames.table_B_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_7":
                setCamPos(select_table_Frames.table_B_7.frame1.pos);
                setCamRot(select_table_Frames.table_B_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_7.frame2.pos);
                    setCamRot(select_table_Frames.table_B_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_8":
                setCamPos(select_table_Frames.table_B_8.frame1.pos);
                setCamRot(select_table_Frames.table_B_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_8.frame2.pos);
                    setCamRot(select_table_Frames.table_B_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_9":
                setCamPos(select_table_Frames.table_B_9.frame1.pos);
                setCamRot(select_table_Frames.table_B_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_9.frame2.pos);
                    setCamRot(select_table_Frames.table_B_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_10":
                setCamPos(select_table_Frames.table_B_10.frame1.pos);
                setCamRot(select_table_Frames.table_B_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_10.frame2.pos);
                    setCamRot(select_table_Frames.table_B_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_11":
                setCamPos(select_table_Frames.table_B_11.frame1.pos);
                setCamRot(select_table_Frames.table_B_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_11.frame2.pos);
                    setCamRot(select_table_Frames.table_B_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_12":
                setCamPos(select_table_Frames.table_B_12.frame1.pos);
                setCamRot(select_table_Frames.table_B_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_12.frame2.pos);
                    setCamRot(select_table_Frames.table_B_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_13":
                setCamPos(select_table_Frames.table_B_13.frame1.pos);
                setCamRot(select_table_Frames.table_B_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_13.frame2.pos);
                    setCamRot(select_table_Frames.table_B_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
        }
    };

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

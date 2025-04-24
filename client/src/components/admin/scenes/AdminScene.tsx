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
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));

interface CameraControl {
    camPos: number[];
    camRot: number[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminScene = ({ camPos, camRot, setIsLoading }: CameraControl) => {
    const { tables } = useTableStatus() ?? { tables: [] };

    const { server } = useServerAddress();

    const singleTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Single_seat",
    );
    const doubleTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Double_seat",
    );
    const quadTable: TableStatus[] = tables?.filter(
        (table) => table.table_type === "Quad_seat",
    );

    const fetchTableDetails = async (table_id: string) => {
        const headers = {
            "Content-Type": "application/json",
        };
        try {
            const response = await axios.post(
                "http://192.168.1.5:8080/get-table-details",
                {
                    table_id: table_id,
                },
                { headers },
            );
            if (response.data.status) {
                let costumer_name = response.data.table_detail.costumer_name;
                let table_name = response.data.table_detail.table_name;
                let current_costumer_status =
                    response.data.table_detail.current_costumer_status;
                let is_available = response.data.table_detail.is_available;
                alert(
                    `Costumer Name: ${costumer_name}, Table ID: ${table_name}, Costumer Status: ${current_costumer_status}, Table Status: ${is_available ? "Available" : "Occupied"}`,
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 'table_name': self.table_name,
    // 'costumer_name': self.current_costumer_name,
    // 'is_available': self.isAvailable,
    // 'current_costumer_status': self.current_costumer_status

    return (
        <Canvas>
            <CameraController
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
            />
            <PerspectiveCamera makeDefault fov={103} />
            <Suspense fallback={null}>
                <BackgroundScene />
                <Restaurant onLoadComplete={() => setIsLoading(false)} />
                <Stairs />

                <SingleSeat
                    availableTable={singleTable}
                    role="admin"
                    fetchTableDetails={fetchTableDetails}
                />
                <DoubleSeat
                    availableTable={doubleTable}
                    role="admin"
                    fetchTableDetails={fetchTableDetails}
                />
                <QuadSeat
                    availableTable={quadTable}
                    role="admin"
                    fetchTableDetails={fetchTableDetails}
                />
            </Suspense>
        </Canvas>
    );
};

export default AdminScene;

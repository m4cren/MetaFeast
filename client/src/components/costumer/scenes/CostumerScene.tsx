import { Canvas } from "@react-three/fiber";

import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { lazy, Suspense } from "react";

const BackgroundScene = lazy(() => import("./BackgroundScene"));
const Restaurant = lazy(() => import("../../models/Restaurant"));
const Stairs = lazy(() => import("../../models/Stairs"));
const SingleSeat = lazy(() => import("../../models/tables/SingleSeat"));
const DoubleSeat = lazy(() => import("../../models/tables/DoubleSeat"));
const QuadSeat = lazy(() => import("../../models/tables/QuadSeat"));
const CavedSingleSeat = lazy(
    () => import("../../models/tables/CavedSingleSeat"),
);
const CavedDoubleSeat = lazy(
    () => import("../../models/tables/CavedDoubleSeat"),
);

interface CameraControl {
    camPos: number[];
    camRot: number[];
}

const CostumerScene = ({ camPos, camRot }: CameraControl) => {
    // Reference
    // Cam Pos: [14, 0.76, -23]
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                position={[camPos[0], camPos[1], camPos[2]]}
                rotation={[Math.PI / camRot[0], camRot[1], camRot[2]]}
                fov={85}
            />
            {/* <directionalLight position={[0, 5, 5]} /> */}

            <Suspense fallback={null}>
                <Restaurant />
                <Stairs />
                <BackgroundScene />

                <group>
                    <group>
                        <SingleSeat
                            position={[14.2, 0.76, -18.3]}
                            tableID={"A1"}
                        />
                        <SingleSeat
                            position={[14.2, 0.76, -19.6]}
                            tableID={"A2"}
                        />
                        <SingleSeat
                            position={[14.2, 0.76, -20.9]}
                            tableID={"A3"}
                        />
                        <SingleSeat
                            position={[14.2, 0.76, -22.2]}
                            tableID={"A4"}
                        />
                        <SingleSeat
                            position={[14.2, 0.76, -23.5]}
                            tableID={"A5"}
                        />
                        <SingleSeat
                            position={[14.2, 0.76, -24.8]}
                            tableID={"A6"}
                        />
                    </group>
                    <group>
                        <QuadSeat position={[15.3, 0.76, -19]} tableID={"A7"} />
                        <QuadSeat
                            position={[15.3, 0.76, -22.3]}
                            tableID={"A8"}
                        />
                        <QuadSeat
                            position={[21.3, 0.76, -19]}
                            tableID={"A15"}
                        />
                        <QuadSeat
                            position={[21.3, 0.76, -22.3]}
                            tableID={"A16"}
                        />
                    </group>

                    <group>
                        <DoubleSeat
                            position={[17.75, 0.76, -18.5]}
                            tableID={"A9"}
                        />
                        <DoubleSeat
                            position={[17.75, 0.76, -21]}
                            tableID={"A10"}
                        />
                        <DoubleSeat
                            position={[17.75, 0.76, -23.5]}
                            tableID={"A11"}
                        />
                        <DoubleSeat
                            position={[19.4, 0.76, -18.5]}
                            tableID={"A12"}
                        />
                        <DoubleSeat
                            position={[19.4, 0.76, -21]}
                            tableID={"A13"}
                        />
                        <DoubleSeat
                            position={[19.4, 0.76, -23.5]}
                            tableID={"A14"}
                        />
                    </group>
                </group>

                <group>
                    <group>
                        <CavedDoubleSeat
                            position={[14, 3.98, -17.5]}
                            tableID={"B1"}
                        />
                        <CavedDoubleSeat
                            position={[14, 3.98, -20.2]}
                            tableID={"B2"}
                        />
                        <CavedDoubleSeat
                            position={[14, 3.98, -22.9]}
                            tableID={"B3"}
                        />
                    </group>

                    <group>
                        <QuadSeat
                            position={[16.4, 3.98, -18.4]}
                            tableID={"B4"}
                        />
                        <QuadSeat
                            position={[16.4, 3.98, -21.5]}
                            tableID={"B5"}
                        />
                    </group>

                    <group>
                        <DoubleSeat
                            position={[19, 3.98, -17.5]}
                            tableID={"B6"}
                        />
                        <DoubleSeat
                            position={[19, 3.98, -20.25]}
                            tableID={"B7"}
                        />
                        <DoubleSeat position={[19, 3.98, -23]} tableID={"B8"} />
                        <DoubleSeat
                            position={[21, 3.98, -17.5]}
                            tableID={"B9"}
                        />
                        <DoubleSeat
                            position={[21, 3.98, -20.25]}
                            tableID={"B10"}
                        />
                        <DoubleSeat
                            position={[21, 3.98, -23]}
                            tableID={"B11"}
                        />
                    </group>

                    <group>
                        <CavedSingleSeat
                            position={[24.3, 3.98, -24]}
                            tableID={"B12"}
                        />
                        <CavedSingleSeat
                            position={[24.3, 3.98, -21.6]}
                            tableID={"B13"}
                        />
                    </group>
                </group>

                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default CostumerScene;

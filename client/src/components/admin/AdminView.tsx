import { useState } from "react";
import useCostumerFrameProvider from "../../frames/useFrameProvider";
import AdminScene from "./scenes/AdminScene";
import useCameraControl from "../../hooks/useCameraControl";
import SceneCameraController from "../SceneCameraController";
import PendingOrderTab from "./PendingOrderTab";
import NavBar from "./NavBar";
import ViewControl from "./ViewControl";

const AdminView = () => {
    const { admin_init_Frame } = useCostumerFrameProvider();
    const [camPos, setCamPos] = useState<[number, number, number]>(
        admin_init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        admin_init_Frame.rot,
    );

    // const { camPos, camRot, cameraFunctions } = useCameraControl();

    // console.log(
    //     `Cam Pos: PX - ${camPos[0]}    PY - ${camPos[1]}    PZ - ${camPos[2]}`,
    // );
    // console.log(
    //     `Cam Rot: RX - ${camRot[0]}    RY - ${camRot[1]}    RZ - ${camRot[2]}`,
    // );

    return (
        <>
            <div className="w-full, h-screen fixed left-0 right-0 top-0 bottom-0">
                <AdminScene camPos={camPos} camRot={camRot} />
            </div>

            <div className="fixed w-full h-screen">
                <PendingOrderTab />
                <NavBar />
                <ViewControl setCamPos={setCamPos} setCamRot={setCamRot} />
            </div>

            {/* <div className="fixed bottom-4">
                <SceneCameraController cameraFunctions={cameraFunctions} />
            </div> */}
        </>
    );
};

export default AdminView;

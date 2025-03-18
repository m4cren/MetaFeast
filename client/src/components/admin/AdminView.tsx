import useCameraControl from "../../hooks/useCameraControl";
import SceneCameraController from "../SceneCameraController";
import AdminScene from "./scenes/AdminScene";

const AdminView = () => {
    return (
        <>
            <div className="w-full, h-screen">
                <AdminScene />
            </div>
            {/* 
            <div className="fixed bottom-4">
                <SceneCameraController cameraFunctions={cameraFunctions} />
            </div> */}
        </>
    );
};

export default AdminView;

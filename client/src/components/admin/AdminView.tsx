import { useEffect, useState } from "react";
import useCostumerFrameProvider from "../../frames/useFrameProvider";
import AdminScene from "./scenes/AdminScene";

import NavBar from "./panels/NavBar";
import ViewControl from "./panels/ViewControl";
import PendingOrderTab from "./panels/PendingOrderTab";
import TableRequestPopup from "./popups/TableRequestPopup";
import { useSocket } from "../../contexts/SocketContext";

const AdminView = () => {
    const { admin_init_Frame } = useCostumerFrameProvider();
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [camPos, setCamPos] = useState<[number, number, number]>(
        admin_init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        admin_init_Frame.rot,
    );

    const [isTableRequest, setIsTableRequest] = useState<boolean>(false);

    const socket = useSocket();

    useEffect(() => {
        socket?.on("notify-admin", (data) => {
            console.log(data.message);
        });

        return () => {
            socket?.off("notify-admin");
        };
    }, []);

    return (
        <>
            <div className="w-full, h-screen fixed left-0 right-0 top-0 bottom-0">
                <AdminScene camPos={camPos} camRot={camRot} />
            </div>

            <div className="fixed w-full h-screen">
                <PendingOrderTab isTransitioning={isTransitioning} />
                <NavBar
                    isTransitioning={isTransitioning}
                    setIsTableRequest={setIsTableRequest}
                />
                <ViewControl
                    setCamPos={setCamPos}
                    setCamRot={setCamRot}
                    isTransitioning={isTransitioning}
                    setIsTransitioning={setIsTransitioning}
                />

                {isTableRequest && (
                    <TableRequestPopup setIsTableRequest={setIsTableRequest} />
                )}
            </div>
        </>
    );
};

export default AdminView;

import { useEffect, useState } from "react";
import useCostumerFrameProvider from "../../frames/useFrameProvider";
import AdminScene from "./scenes/AdminScene";

import NavBar from "./panels/NavBar";
import ViewControl from "./panels/ViewControl";
import PendingOrderTab from "./panels/PendingOrderTab";
import TableRequestPopup from "./popups/TableRequestPopup";
import { useSocket } from "../../contexts/SocketContext";
import RequestNotification from "./popups/RequestNotification";

type NotificationType = {
    message: string;
    costumerName: string;
    tableID: string;
};

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

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    console.log(notifications);

    const socket = useSocket();

    useEffect(() => {
        socket?.on("notify-admin", (data) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });

        return () => {
            socket?.off("notify-admin");
        };
    }, []);

    const handleAccept = (tableSelected: string, costumerName: string) => {
        const costumerToAccept = {
            costumer_name: costumerName,
            table_selected: tableSelected,
        };

        socket?.emit("accept-request", costumerToAccept);
    };
    const handleDeny = (tableSelected: string, costumerName: string) => {
        const costumerToDeny = {
            costumer_name: costumerName,
            table_selected: tableSelected,
        };

        socket?.emit("deny-request", costumerToDeny);
    };

    return (
        <>
            <div className="w-full, h-screen fixed left-0 right-0 top-0 bottom-0">
                <AdminScene camPos={camPos} camRot={camRot} />
            </div>

            <div className="fixed w-full h-screen">
                {notifications && (
                    <div className="absolute w-[35rem] h-fit z-10 top-5 left-2 flex gap-2 flex-col-reverse">
                        {notifications.map((data, index) => (
                            <RequestNotification
                                key={index}
                                message={data.message}
                                costumer_name={data.costumerName}
                                tableID={data.tableID}
                                handleAccept={handleAccept}
                                handleDeny={handleDeny}
                            />
                        ))}
                    </div>
                )}

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
                    <TableRequestPopup
                        setIsTableRequest={setIsTableRequest}
                        handleAccept={handleAccept}
                        handleDeny={handleDeny}
                    />
                )}
            </div>
        </>
    );
};

export default AdminView;

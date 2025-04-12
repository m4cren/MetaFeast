import React, { memo, useEffect, useState } from "react";

import AdminScene from "./scenes/AdminScene";

import NavBar from "./panels/NavBar";
import ViewControl from "./panels/ViewControl";
import PendingOrderTab from "./panels/PendingOrderTab";
import TableRequestPopup from "./popups/TableRequestPopup";
import { useSocket } from "../../contexts/SocketContext";
import RequestNotification from "./popups/RequestNotification";
import useFrameProvider from "../../frames/useFrameProvider";
import { NotificationType } from "../../types/types";
import DenyConfirmation from "./popups/DenyConfirmation";
import layout from "../../styles/layouts/admin_view.module.css";
import PendingPayments from "./popups/PendingPayments";
import { useTableStatus } from "../../contexts/TableStatusContext";

interface AdminViewProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminView = ({ setIsLoading }: AdminViewProps) => {
    const { admin_init_Frame } = useFrameProvider();
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [camPos, setCamPos] = useState<[number, number, number]>(
        admin_init_Frame.pos,
    );
    const [camRot, setCamRot] = useState<[number, number, number]>(
        admin_init_Frame.rot,
    );

    const [isTableRequest, setIsTableRequest] = useState<boolean>(false);
    const [isPendingPayment, setIsPendingPayment] = useState<boolean>(false);

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const [isDenyConfirm, setIsDenyConfirm] = useState<boolean>(false);

    const [costumerName, setCostumerName] = useState<string>("");
    const [tableSelected, setTableSelected] = useState<string>("");

    const socket = useSocket();
    const notif_sound = new Audio("/audios/admin_notif.mp3");

    const { getTableStatus } = useTableStatus() ?? {
        getTableStatus: () => {},
    };

    useEffect(() => {
        socket?.on("notify-admin", (data) => {
            notif_sound.play();
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });

        socket?.on("push-to-admin-payment", (_) => {
            setTimeout(() => {
                getTableStatus();
            }, 850);
        });

        return () => {
            socket?.off("notify-admin");
            socket?.off("push-to-admin-payment");
        };
    }, [socket]);

    const handleAccept = (tableSelected: string, costumerName: string) => {
        const updatedNotificationList = notifications.filter(
            (notif) => notif.costumerName !== costumerName,
        );

        setNotifications(updatedNotificationList);
        const costumerToAccept = {
            costumer_name: costumerName,
            table_selected: tableSelected,
        };

        socket?.emit("accept-request", costumerToAccept);
    };
    const handleDeny = (
        tableSelected: string,
        costumerName: string,
        message: string,
    ) => {
        const updatedNotificationList = notifications.filter(
            (notif) => notif.costumerName !== costumerName,
        );

        setNotifications(updatedNotificationList);

        const costumerToDeny = {
            costumer_name: costumerName,
            table_selected: tableSelected,
            message: message,
        };

        socket?.emit("deny-request", costumerToDeny);
    };

    return (
        <>
            <div className="w-full, h-screen fixed left-0 right-0 top-0 bottom-0">
                <AdminScene
                    camPos={camPos}
                    camRot={camRot}
                    setIsLoading={setIsLoading}
                />
            </div>

            <div
                className={`${layout.main} pointer-events-none overflow-hidden`}
            >
                <div className={`${layout.navbar}`}>
                    <NavBar
                        isTransitioning={isTransitioning}
                        setIsTableRequest={setIsTableRequest}
                        setIsPendingPayment={setIsPendingPayment}
                    />
                </div>
                <div className={`${layout["pending-tab"]}`}>
                    <PendingOrderTab isTransitioning={isTransitioning} />
                </div>
                <div className={`${layout.footer} flex items-center px-6`}>
                    <ViewControl
                        setCamPos={setCamPos}
                        setCamRot={setCamRot}
                        isTransitioning={isTransitioning}
                        setIsTransitioning={setIsTransitioning}
                    />
                </div>

                {notifications && !isTableRequest && (
                    <div className="fixed w-[35rem] h-fit z-10 top-27 left-0 flex gap-2 flex-col-reverse">
                        {notifications.map((data, index) => (
                            <RequestNotification
                                key={index}
                                message={data.message}
                                costumer_name={data.costumerName}
                                tableID={data.tableID}
                                handleAccept={handleAccept}
                                setIsDenyConfirm={setIsDenyConfirm}
                                setCostumerName={setCostumerName}
                                setTableSelected={setTableSelected}
                            />
                        ))}
                    </div>
                )}
                {isDenyConfirm && (
                    <DenyConfirmation
                        setIsDenyConfirm={setIsDenyConfirm}
                        handleDeny={handleDeny}
                        costumer_name={costumerName}
                        table_selected={tableSelected}
                    />
                )}
                {isTableRequest && (
                    <TableRequestPopup
                        setIsTableRequest={setIsTableRequest}
                        handleAccept={handleAccept}
                        setIsDenyConfirm={setIsDenyConfirm}
                        setCostumerName={setCostumerName}
                        setTableSelected={setTableSelected}
                    />
                )}
                {isPendingPayment && (
                    <PendingPayments
                        setIsPendingPayment={setIsPendingPayment}
                    />
                )}
            </div>
        </>
    );
};

export default memo(AdminView);

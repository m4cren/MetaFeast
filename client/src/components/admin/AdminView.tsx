import React, { lazy, memo, useEffect, useState } from "react";

import AdminScene from "./scenes/AdminScene";

import NavBar from "./panels/NavBar";
import ViewControl from "./panels/ViewControl";
import PendingOrderTab from "./panels/PendingOrderTab";
import TableRequestPopup from "./popups/TableRequestPopup";
import { useSocket } from "../../contexts/SocketContext";
import RequestNotification from "./popups/RequestNotification";
import useFrameProvider from "../../frames/useFrameProvider";
import { NotificationType, TableDetailTypes } from "../../types/types";
import DenyConfirmation from "./popups/DenyConfirmation";
import layout from "../../styles/layouts/admin_view.module.css";
import PendingPayments from "./popups/PendingPayments";
import { useTableStatus } from "../../contexts/TableStatusContext";
import ProductManagement from "./popups/ProductManagement";
import { LogOut } from "lucide-react";
import axios from "axios";
import useServerAddress from "../../../useServerAddress";

const Reviews = lazy(() => import("./popups/Reviews"));

// let costumer_name = response.data.table_detail.costumer_name;
//                 let table_name = response.data.table_detail.table_name;
//                 let current_costumer_status =
//                     response.data.table_detail.current_costumer_status;
//                 let is_available = response.data.table_detail.is_available;

interface AdminViewProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminView = ({ setIsLoading }: AdminViewProps) => {
    const [tableDetails, setTableDetails] = useState<TableDetailTypes | null>(
        null,
    );

    const [isTableDetails, setIsTableDetails] = useState<boolean>(false);

    useEffect(() => {
        if (tableDetails?.table_name) {
            setIsTableDetails(true);
        }
    }, [tableDetails]);
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
    const [pendingPaymentNotification, setPendingPaymentNotification] =
        useState<number>(0);

    const [isReview, setIsReview] = useState<boolean>(false);
    const [isProductManagement, setIsProductManagement] =
        useState<boolean>(false);

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const [isDenyConfirm, setIsDenyConfirm] = useState<boolean>(false);

    const [costumerName, setCostumerName] = useState<string>("");
    const [tableSelected, setTableSelected] = useState<string>("");

    const socket = useSocket();
    const notif_sound = new Audio("/audios/notif.MP3");
    const { server } = useServerAddress();
    const [someoneConfirmed, setSomeoneConfirmed] = useState<number>(0);
    const { getTableStatus } = useTableStatus() ?? {
        getTableStatus: () => {},
    };
    const getPendingPayments = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(
                `${server}/payment/get-pending-payments`,
                {
                    headers,
                    withCredentials: false,
                },
            );

            if (response.data.status) {
                setPendingPaymentNotification(
                    response.data.pending_payment_requests.length,
                );
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPendingPayments();
    }, [someoneConfirmed]);
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
                getPendingPayments();
                notif_sound.play();
            }, 850);
        });

        socket?.on("notify-admin-costumer-exit", (_) => {
            setTimeout(() => {
                getTableStatus();
            }, 850);
        });

        socket?.on("notify_the_admin", (_) => {
            setTimeout(() => {
                getTableStatus();
            }, 850);
        });

        return () => {
            socket?.off("notify-admin");
            socket?.off("push-to-admin-payment");
            socket?.off("notify-admin-costumer-exit");
            socket?.off("notify_the_admin");
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

    const [isTableDetailClose, setIsTableDetailClose] =
        useState<boolean>(false);

    return (
        <>
            {isTableDetails && (
                <div
                    className={`${isTableDetailClose && "pop-close-animation"} fixed top-3 right-3 w-fit h-fit p-4 bg-gradient-to-t from-lightbrown to-darkbrown rounded-xl z-10 [box-shadow:5px_5px_4px_rgba(0,0,0,0.5)] pop-up-animation`}
                >
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-primary text-center mb-2 text-shadow-md">
                            Table Details
                        </h1>
                        <button
                            className="text-primary cursor-pointer"
                            onClick={() => {
                                setIsTableDetailClose(true);
                                setTimeout(() => {
                                    setIsTableDetails(false);
                                    setIsTableDetailClose(false);
                                }, 200);
                            }}
                        >
                            <LogOut />
                        </button>
                    </div>
                    <p className="text-secondary text-[0.8rem] text-shadow-sm">
                        Table Name: {tableDetails?.table_name}
                    </p>
                    <p className="text-secondary text-[0.8rem] text-shadow-sm">
                        Costumer Name: {tableDetails?.costumer_name}
                    </p>
                    <p className="text-secondary text-[0.8rem] text-shadow-sm">
                        Current Costumer Status:{" "}
                        {tableDetails?.current_costumer_status}
                    </p>
                    <p className="text-secondary text-[0.8rem] text-shadow-sm">
                        Table Status:{" "}
                        {tableDetails?.is_available ? "Available" : "Occupied"}
                    </p>

                    <div className="flex flex-col items-center mt-4 border-t-2 border-white/30">
                        <h2 className="text-white/85 text-[1rem] text-shadow-md py-2">
                            Legends
                        </h2>
                        <span className="flex flex-row items-center w-[80%] justify-start gap-3 ">
                            <p className="w-3 h-3 bg-green-600"></p>
                            <p className="text-secondary text-[0.8rem] text-shadow-md">
                                Table is available
                            </p>
                        </span>
                        <span className="flex flex-row items-center w-[80%] justify-start gap-3">
                            <p className="w-3 h-3 bg-yellow-400"></p>
                            <p className="text-secondary text-[0.8rem] text-shadow-md">
                                Costumer is ordering
                            </p>
                        </span>
                        <span className="flex flex-row items-center w-[80%] justify-start gap-3">
                            <p className="w-3 h-3 bg-blue-800"></p>
                            <p className="text-secondary text-[0.8rem] text-shadow-md">
                                Costumer is eating
                            </p>
                        </span>
                        <span className="flex flex-row items-center w-[80%] justify-start gap-3">
                            <p className="w-3 h-3 bg-pink-400"></p>
                            <p className="text-secondary text-[0.8rem] text-shadow-md">
                                Costumer is billing
                            </p>
                        </span>
                    </div>
                </div>
            )}

            <div className="w-full, h-screen fixed left-0 right-0 top-0 bottom-0">
                <AdminScene
                    setTableDetails={setTableDetails}
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
                        setIsReview={setIsReview}
                        setIsProductManagement={setIsProductManagement}
                        pendingPaymentNotification={pendingPaymentNotification}
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
                        setSomeoneConfirmed={setSomeoneConfirmed}
                        setIsPendingPayment={setIsPendingPayment}
                        someoneConfirmed={someoneConfirmed}
                    />
                )}
                {isReview && <Reviews setIsReview={setIsReview} />}
                {isProductManagement && (
                    <ProductManagement
                        setIsProductManagement={setIsProductManagement}
                    />
                )}
            </div>
        </>
    );
};

export default memo(AdminView);

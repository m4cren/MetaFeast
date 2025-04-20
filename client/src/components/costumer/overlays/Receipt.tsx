import { DoorOpen, Star, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import html2canvas from "html2canvas";
import { PendingPaymentType } from "../../../types/types";
import useFrameProvider from "../../../frames/useFrameProvider";
import { useSocket } from "../../../contexts/SocketContext";
import ServiceReview from "./ServiceReview";

interface ReceiptProps {
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const Receipt = ({ setCamPos, setCamRot }: ReceiptProps) => {
    const [myOrders, setMyOrders] = useState<PendingPaymentType | null>(null);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const { server } = useServerAddress();
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isReceipt, setIsReceipt] = useState<boolean>(true);
    const socket = useSocket();
    const printRef = useRef<HTMLDivElement>(null);

    const [isReview, setIsReview] = useState<boolean>(false);

    const [isReceiptDownloaded, setIsReceiptDownloaded] =
        useState<boolean>(false);

    const { to_exit } = useFrameProvider();

    const frame_sec = 350;

    const handleCostumerExit = (costumer_name: string | undefined) => {
        if (costumer_name) {
            setCamPos(to_exit.frame1.pos);
            setCamRot(to_exit.frame1.rot);

            setIsReceipt(false);

            setTimeout(() => {
                setCamPos(to_exit.frame2.pos);
                setCamRot(to_exit.frame2.rot);
                setTimeout(() => {
                    setCamPos(to_exit.frame3.pos);
                    setCamRot(to_exit.frame3.rot);
                    setTimeout(() => {
                        setCamPos(to_exit.frame4.pos);
                        setCamRot(to_exit.frame4.rot);
                        setTimeout(() => {
                            setCamPos(to_exit.frame5.pos);
                            setCamRot(to_exit.frame5.rot);
                            setTimeout(() => {
                                setCamPos(to_exit.frame6.pos);
                                setCamRot(to_exit.frame6.rot);
                                setTimeout(() => {
                                    setCamPos(to_exit.frame7.pos);
                                    setCamRot(to_exit.frame7.rot);
                                    setTimeout(() => {
                                        setCamPos(to_exit.frame8.pos);
                                        setCamRot(to_exit.frame8.rot);
                                        setIsExiting(true);
                                        localStorage.removeItem("token");
                                    }, frame_sec);
                                }, frame_sec);
                            }, frame_sec);
                        }, frame_sec);
                    }, frame_sec);
                }, frame_sec);
            }, frame_sec);
        }

        const costumerExit = async () => {
            const dataToSend = {
                name: myOrders?.costumer_name,
                payment_id: myOrders?.payment_id,
                total_spend: myOrders?.total_payment,
                order_items: totalQuantity,
                orders: myOrders?.orders,
                payment_method: myOrders?.payment_type,
                table_seated: myOrders?.table_id,
            };
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            };

            try {
                const response = await axios.post(
                    `${server}/costumer/exit`,
                    dataToSend,
                    {
                        headers,
                        withCredentials: true,
                    },
                );

                console.log(response.data.status);

                if (response.data.status) {
                    socket?.emit("notify-costumer-exit");
                }
            } catch (error) {
                console.log(error);
            }
        };

        costumerExit();
    };

    const handleSaveAsImage = async () => {
        if (printRef.current) {
            const canvas = await html2canvas(printRef.current);
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = `metafeast_receipt_${myOrders?.payment_id}.png`;
            link.click();

            setIsReceiptDownloaded(true);
            localStorage.setItem("receipt-download", "true");
        }
    };

    const getOrders = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/payment/receipt`, {
                headers,
                withCredentials: true,
            });

            if (response.data.status) {
                setMyOrders(response.data.response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let start = 0;
        if (myOrders?.orders) {
            myOrders.orders.forEach(({ quantity }) => {
                return (start = start + quantity);
            });
        }

        setTotalQuantity(start);
    }, [myOrders]);

    useEffect(() => {
        getOrders();
    }, []);

    return isReceipt && !isReview ? (
        <div className="fixed gap-4 flex items-center justify-start flex-col  w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] ">
            <div>
                <div className="flex flex-row justify-around">
                    <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                    <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                </div>
                <div className="w-[90vw] py-4 min-[390px]:py-6 rounded-2xl bg-gradient-to-b from-lightbrown to-darkbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_2px_rgba(0,0,0,0.3)]">
                    <h1 className="text-primary text-center text-[1.35rem] min-[390px]:text-[1.5rem] font-medium">
                        Payment Confirmed
                    </h1>
                </div>
            </div>
            <div className="relative flex flex-col pt-6 min-[390px]:pt-10 pb-1 items-center px-4 bg-gradient-to-t rounded-2xl w-[90vw] h-[75vh] min-[390px]:h-[70vh] from-darkbrown to-lightbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                <div className="w-[90%] h-[60vh] min-[390px]:h-[55vh] overflow-y-scroll [box-shadow:-2px_2px_5px_rgba(0,0,0,0.4)]  rounded-sm">
                    <div
                        ref={printRef}
                        className="text-[#41484c] pb-4 h-fit min-h-[27rem] min-[390px]:min-h-[30rem] flex flex-col items-center  bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5]"
                    >
                        <h1 className="text-[1.3rem] min-[390px]:text-[1.5rem] font-semibold pt-5 min-[390px]:pt-7 pb-1 min-[390px]:pb-2">
                            Cash Receipt
                        </h1>

                        <div className="w-[80%] flex flex-col items-center">
                            <h2 className="text-[1rem] min-[390px]:text-[1.05rem] font-medium">
                                Metafeast
                            </h2>
                            <p className="text-[0.55rem] min-[390px]:text-[0.58rem] text-center">
                                149 11th Street Brgy, Bulakin II
                            </p>
                            <p className="text-[0.55rem] min-[390px]:text-[0.58rem] text-center">
                                Dolores, Quezon Philippines
                            </p>
                            <p className="text-[0.55rem] min-[390px]:text-[0.58rem] text-center">
                                (000) 222-333-55
                            </p>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <div className="w-[81%] flex flex-col items-start text-[0.58rem] min-[390px]:text-[0.68rem] ">
                            <div className="flex flex-row items-center w-full justify-between font-medium">
                                <p className="">Recipient name:</p>
                                <p>{myOrders?.costumer_name}</p>
                            </div>
                            <div className="flex flex-row items-center w-full justify-between text-[0.48rem] min-[390px]:text-[0.58rem]">
                                <p className="">Transaction ID:</p>
                                <p>{myOrders?.payment_id}</p>
                            </div>
                            <div className="flex flex-row items-center w-full justify-between text-[0.48rem] min-[390px]:text-[0.58rem]">
                                <p className="">Table ID:</p>
                                <p>{myOrders?.table_id}</p>
                            </div>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <div className="flex flex-row items-center w-[81%] justify-between text-[0.48rem] min-[390px]:text-[0.58rem]">
                            <div className="flex flex-row items-center gap-2">
                                <p className="">Qty</p>
                                <p className="">Description(s)</p>
                            </div>
                            <p>Price</p>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <table className="w-[81%] my-3">
                            <tbody>
                                {myOrders?.orders.map(
                                    ({ food_name, price, quantity }, index) => (
                                        <tr
                                            key={index}
                                            className="flex flex-row items-center text-[0.7rem] justify-between"
                                        >
                                            <td>
                                                <div className="flex text-[0.6rem] min-[390px]:text-[0.7rem] flex-row items-center gap-2 ">
                                                    <p>#{quantity}</p>
                                                    <p>{food_name}</p>
                                                </div>
                                            </td>
                                            <td className="text-[0.6rem] min-[390px]:text-[0.6rem]">
                                                ₱ {price}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            -------------------{totalQuantity}{" "}
                            item(s)-------------------
                        </span>
                        <div className="w-[81%] flex flex-col items-end text-[0.6rem] min-[390px]:text-[0.7rem] ">
                            <div className="flex flex-row items-center w-[45%] justify-between font-medium mt-2">
                                <p className="">Total:</p>
                                <p>₱ {myOrders?.total_payment}</p>
                            </div>
                        </div>

                        <div className="text-[0.65rem] min-[390px]:text-[0.7rem] flex flex-row items-center w-[81%] justify-between mt-10">
                            <p>Date & Time:</p>
                            <p>{myOrders?.date_and_time}</p>
                        </div>
                        <div className="text-[0.65rem] min-[390px]:text-[0.7rem] flex flex-row items-center w-[81%] justify-between">
                            <p>Paid thru:</p>
                            <p>{myOrders?.payment_type}</p>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <h1 className="py-3 text-[0.75rem] font-medium min-[390px]:text-[0.8rem]">
                            Thank you for choosing our restaurant!
                        </h1>
                    </div>
                </div>
                <div className="absolute bottom-6 gap-2 w-full flex flex-row items-center justify-center">
                    <button
                        onClick={() =>
                            handleCostumerExit(myOrders?.costumer_name)
                        }
                        className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl border-1 border-white/20"
                    >
                        Exit
                        <DoorOpen size={15} />
                    </button>
                    <button
                        onClick={() => setIsReview(true)}
                        className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl border-1 border-white/20"
                    >
                        Review
                        <Star size={15} />
                    </button>
                    {!isReceiptDownloaded &&
                        localStorage.getItem("receipt-download") !== "true" && (
                            <button
                                onClick={handleSaveAsImage}
                                className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl bg-gradient-to-t from-darkgreen to-lightgreen"
                            >
                                Download receipt
                                <Download size={15} />
                            </button>
                        )}
                </div>
            </div>
        </div>
    ) : isExiting ? (
        <div className="fixed w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-center text-primary">Thanks</h1>
        </div>
    ) : (
        isReview && (
            <ServiceReview
                totalQuantity={totalQuantity}
                isReceipt={isReceipt}
                myOrders={myOrders}
                handleCostumerExit={handleCostumerExit}
            />
        )
    );
};

export default Receipt;

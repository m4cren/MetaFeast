import { DoorOpen, Star, Download } from "lucide-react";

const Receipt = () => {
    return (
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
                    <div className="text-[#41484c] pb-4 h-fit min-h-[27rem] min-[390px]:min-h-[30rem] flex flex-col items-center  bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5]">
                        <h1 className="text-[1.3rem] min-[390px]:text-[1.5rem] font-semibold pt-5 min-[390px]:pt-7 pb-1 min-[390px]:pb-2">
                            Cash Receipt
                        </h1>

                        <div className="w-[80%] flex flex-col items-center">
                            <h2 className="text-[1rem] min-[390px]:text-[1.05rem] font-medium">
                                Metafeast
                            </h2>
                            <p className="text-[0.63rem] min-[390px]:text-[0.65rem] text-center">
                                149 11th Street Brgy, Bulakin II
                            </p>
                            <p className="text-[0.63rem] min-[390px]:text-[0.65rem] text-center">
                                Dolores, Quezon Philippines
                            </p>
                            <p className="text-[0.63rem] min-[390px]:text-[0.65rem] text-center">
                                (000) 222-333-55
                            </p>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <div className="w-[81%] flex flex-col items-start text-[0.7rem] min-[390px]:text-[0.8rem] ">
                            <div className="flex flex-row items-center w-full justify-between font-medium">
                                <p className="">Recipient name:</p>
                                <p>Rainier</p>
                            </div>
                            <div className="flex flex-row items-center w-full justify-between text-[0.55rem] min-[390px]:text-[0.65rem]">
                                <p className="">Transaction ID:</p>
                                <p>192BK0Z1</p>
                            </div>
                            <div className="flex flex-row items-center w-full justify-between text-[0.55rem] min-[390px]:text-[0.65rem]">
                                <p className="">Table ID:</p>
                                <p>A_8</p>
                            </div>
                        </div>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <table className="w-[81%] my-3">
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                            <tr className="flex flex-row items-center text-[0.75rem] justify-between">
                                <span className="flex text-[0.65rem] min-[390px]:text-[0.75rem] flex-row items-center gap-2 ">
                                    <p>#1</p>
                                    <p>Venison Steak</p>
                                </span>
                                <p className="text-[0.65rem] min-[390px]:text-[0.67rem]">
                                    {" "}
                                    ₱ 1299
                                </p>
                            </tr>
                        </table>
                        <span className="text-[0.66rem] min-[390px]:text-[0.75rem]">
                            ------------------------------------------------
                        </span>
                        <div className="w-[81%] flex flex-col items-end text-[0.7rem] min-[390px]:text-[0.8rem] ">
                            <div className="flex flex-row items-center w-[45%] justify-between font-medium">
                                <p className="">Total:</p>
                                <p>₱ 1299</p>
                            </div>
                            <div className="flex flex-row items-center w-[45%] justify-between">
                                <p className="">Cash:</p>
                                <p>₱ 1299</p>
                            </div>
                            <div className="flex flex-row items-center w-[45%] justify-between">
                                <p className="">Change:</p>
                                <p>₱ 0</p>
                            </div>
                        </div>

                        <div className="text-[0.65rem] min-[390px]:text-[0.7rem] flex flex-row items-center w-[81%] justify-between mt-10">
                            <p>Date & Time:</p>
                            <p>10/27/04 | 3:14pm</p>
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
                    <button className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl border-1 border-white/20">
                        Exit
                        <DoorOpen size={15} />
                    </button>
                    <button className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl border-1 border-white/20">
                        Review
                        <Star size={15} />
                    </button>
                    <button className="flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-2 min-[390px]:px-3 rounded-xl bg-gradient-to-t from-darkgreen to-lightgreen">
                        Download receipt
                        <Download size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Receipt;

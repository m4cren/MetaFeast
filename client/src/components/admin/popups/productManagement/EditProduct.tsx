import layout from "../../../../styles/layouts/edit_product.module.css";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { Trash2, FileCheck2, CornerDownLeft } from "lucide-react";

const EditProduct = () => {
    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col leading-6 border-b-3 border-darkbrown/40 w-full pb-4">
                    <h1 className="text-primary text-[1.8rem]">
                        Sirloin Steak
                    </h1>
                    <p className=" text-[0.75rem] font-extralight text-white/60">
                        Main Course
                    </p>
                </div>
            </div>

            <div className={`${layout.main} h-[33rem] w-full mt-4`}>
                <div
                    className={`${layout["img-container"]} flex items-center justify-center`}
                >
                    <div className="bg-darkbrown/60 rounded-xl w-[90%] h-[90%] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.3)]">
                        <img
                            src="/images/products/sirloin_steak.png"
                            alt=""
                            className="scale-90"
                        />
                    </div>
                </div>
                <div
                    className={`${layout["product-details"]} flex items-center justify-center`}
                >
                    <div className="flex flex-col gap-4 w-[90%] h-full pt-6">
                        <div className="flex flex-row items-center text-primary gap-1 justify-center">
                            <>
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStarHalfStroke size={25} />
                            </>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Available Stocks:</p>
                                    <p>28</p>
                                </div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Price:</p>
                                    <p>₱ 699</p>
                                </div>
                            </div>
                            <div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Total Ratings:</p>
                                    <p>120</p>
                                </div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Average Ratings:</p>
                                    <p>4.5</p>
                                </div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Total Calories</p>
                                    <p>781</p>
                                </div>
                                <div className="text-secondary flex flex-row items-center justify-between">
                                    <p>Total Orders:</p>
                                    <p>125</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${layout["title-edit"]} flex items-center`}>
                    <h1 className="text-primary text-[1.4rem]">Edit Product</h1>
                </div>
                <div className={`${layout["edit-product"]}`}>
                    <form action="" className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col w-[60%] gap-1">
                                <label
                                    htmlFor="cuisine_name"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Cuisine Name
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_name"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                            <div className="flex flex-col w-[40%] gap-1">
                                <label
                                    htmlFor="cuisine_category"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Cusine Category
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_category"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col w-[20%] gap-1">
                                <label
                                    htmlFor="cuisine_name"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Quantity
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_name"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                            <div className="flex flex-col w-[30%] gap-1">
                                <label
                                    htmlFor="cuisine_category"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Product Price
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_category"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                            <div className="flex flex-col w-[50%] gap-1">
                                <label
                                    htmlFor="cuisine_category"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Waiting Time
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_category"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`${layout["edit-details"]}`}></div>
                <div
                    className={`${layout["delete-container"]} flex flex-col items-center`}
                >
                    <div className="w-[90%] h-full flex items-center">
                        <button className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2">
                            <Trash2 size={18} />
                            Delete Product
                        </button>
                    </div>
                </div>
                <div className={`${layout["control-container"]}`}>
                    <div className="flex flex-row gap-2 justify-end items-center h-full">
                        <button className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2">
                            <CornerDownLeft size={18} />
                            Back
                        </button>
                        <button className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/70 text-[0.85rem] font-light bg-gradient-to-b from-lightbrown to-darkbrown rounded-md px-6 py-2 border-1 border-darkbrown">
                            <FileCheck2 size={18} />
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;

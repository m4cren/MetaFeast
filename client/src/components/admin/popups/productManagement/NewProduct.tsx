import layout from "../../../../styles/layouts/new_product.module.css";
import { FileCheck2, ChevronUp, ChevronDown, ImagePlus } from "lucide-react";
const NewProduct = () => {
    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col leading-6">
                    <h1 className="text-primary text-[1.75rem] text-shadow-md font-medium">
                        Add New Cuisine
                    </h1>
                    <p className=" text-[0.75rem] font-extralight text-white/60">
                        Something new? Let's add it
                    </p>
                </div>
            </div>
            <form className={`${layout.main} h-[33rem] w-full mt-4`}>
                <div
                    className={`${layout["img-container"]} flex items-center justify-center`}
                >
                    <div className="flex items-center justify-center bg-darkbrown/60 rounded-xl w-[90%] h-[90%] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.3)]">
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer flex flex-row items-center gap-2 bg-lightbrown hover:bg-darkbrown text-primary text-[0.9rem] font-light py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
                        >
                            <ImagePlus size={18} />
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            className="hidden"
                        />
                    </div>
                </div>

                <div className={`${layout["edit-product"]}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col w-[70%] gap-1">
                                <label
                                    htmlFor="cuisine_name"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Cuisine Name
                                </label>
                                <input
                                    type="text"
                                    id="cuisine_name"
                                    name="food_name"
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>

                            <div className="flex flex-col w-[30%] gap-1">
                                <label
                                    htmlFor="calories"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Calories
                                </label>
                                <input
                                    name="calories"
                                    type="number"
                                    id="calories"
                                    className=" border-darkbrown border-2 input-number outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col w-[20%] gap-1">
                                <label
                                    htmlFor="quantity"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Quantity
                                </label>
                                <div className="relative w-full ">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                    />
                                    <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                        <button className="cursor-pointer hover:scale-120 duration-75 transition">
                                            <ChevronUp size={18} />
                                        </button>
                                        <button className="cursor-pointer hover:scale-120 duration-75 transition">
                                            <ChevronDown size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-[30%] gap-1">
                                <label
                                    htmlFor="price"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Product Price (₱)
                                </label>
                                <input
                                    type="number"
                                    name="product_price"
                                    id="price"
                                    className=" border-darkbrown border-2 input-number outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                            <div className="flex flex-col w-[50%] gap-1">
                                <label
                                    htmlFor="waiting_time"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Waiting Time (minutes)
                                </label>
                                <div className="relative w-full ">
                                    <input
                                        type="number"
                                        name="waiting_time"
                                        id="waiting_time"
                                        className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                    />
                                    <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                        <button className="cursor-pointer hover:scale-120 duration-75 transition">
                                            <ChevronUp size={18} />
                                        </button>
                                        <button className="cursor-pointer hover:scale-120 duration-75 transition">
                                            <ChevronDown size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${layout["edit-details"]}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="short-description"
                                className="text-white/60 text-[0.75rem] font-extralight"
                            >
                                Short Description
                            </label>
                            <textarea
                                name="short_desc"
                                className="border-2 border-darkbrown  rounded-md resize-none outline-none text-white/80 px-2 font-extralight text-[0.85rem] "
                                id="short-description"
                            ></textarea>
                        </div>
                        <div className="flex flex-col gap-1  h-[11rem]">
                            <label
                                htmlFor="details"
                                className="text-white/60 text-[0.75rem] font-extralight"
                            >
                                Full Details
                            </label>
                            <textarea
                                name="full_details"
                                className="border-2 border-darkbrown leading-4 rounded-md resize-none h-full outline-none text-white/80 px-2 font-extralight text-[0.8rem] py-1 text-justify"
                                id="details"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className={`${layout["control-container"]}`}>
                    <div className="flex flex-row gap-2 justify-end items-center h-full">
                        <button
                            type="submit"
                            className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/70 text-[0.85rem] font-light bg-gradient-to-b from-lightbrown to-darkbrown rounded-md px-24 py-2 border-1 border-darkbrown"
                        >
                            <FileCheck2 size={18} />
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;

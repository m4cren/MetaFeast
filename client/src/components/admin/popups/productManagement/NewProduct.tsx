import layout from "../../../../styles/layouts/new_product.module.css";
import {
    FileCheck2,
    ChevronUp,
    ChevronDown,
    Info,
    LogOut,
    ImagePlus,
    BookCopy,
    LaptopMinimalCheck,
} from "lucide-react";
import { NewProductDetailTypes } from "../../../../types/types";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../../useServerAddress";
import { useSocket } from "../../../../contexts/SocketContext";

const NewProduct = () => {
    const [isConfirmation, setIsConfirmation] = useState<boolean>(false);

    const [newProduct, setNewProduct] = useState<NewProductDetailTypes>({
        food_name: "",
        cusine_category: "Appetizers",
        calories: 0,
        quantity: 0,
        product_price: 0,
        waiting_time: 0,
        short_desc: "",
        full_details: "",
    });
    const { server } = useServerAddress();
    const socket = useSocket();
    const [newImgPreview, setNewImgPreview] = useState<string | null>(null);
    const [adminPassword, setAdminPassword] = useState<string>("");
    const [isCreatedSuccess, setIsCreatedSuccess] = useState<boolean>(false);
    const [isCreatedFailed, setIsCreatedFailed] = useState<boolean>(false);
    const [isIncorrectPassword, setIsIncorrectPassword] =
        useState<boolean>(false);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdminPassword(e.currentTarget.value);
    };

    const [isSending, setIsSending] = useState<boolean>(false);

    const handleConfirmChanges = async () => {
        setIsSending(true);
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post(
                `${server}/admin-login`,
                {
                    password: adminPassword,
                },
                {
                    headers,
                    withCredentials: true,
                },
            );

            setIsSending(false);

            if (response.data.status) {
                setIsIncorrectPassword(false);
                setIsConfirmation(false);

                addThisProduct();
            } else {
                setIsIncorrectPassword(true);

                setTimeout(() => {
                    setIsIncorrectPassword(false);
                }, 5000);
            }
            setAdminPassword("");
        } catch (error) {
            console.log(error);
        }
    };

    const addThisProduct = async () => {
        const formData = new FormData();

        formData.append("food_name", newProduct.food_name);
        formData.append("cusine_category", newProduct.cusine_category);
        formData.append("calories", String(newProduct.calories));
        formData.append("quantity", String(newProduct.quantity));
        formData.append("product_price", String(newProduct.product_price));
        formData.append("waiting_time", String(newProduct.waiting_time));
        formData.append("short_desc", newProduct.short_desc);
        formData.append("full_details", newProduct.full_details);

        if (newProduct.imgFile) {
            formData.append("new_img_file", newProduct.imgFile);
        }

        const headers = {
            "Content-Type": "multipart/form-data",
        };

        try {
            const response = await axios.post(
                `${server}/admin/create-product`,
                formData,
                {
                    headers,
                },
            );

            if (response.data.status) {
                socket?.emit("handle-update-product", { message: "refresh" });
                setIsCreatedSuccess(true);
                setNewProduct({
                    food_name: "",
                    cusine_category: "Appetizers",
                    calories: 0,
                    quantity: 0,
                    product_price: 0,
                    waiting_time: 0,
                    short_desc: "",
                    full_details: "",
                });
                setNewImgPreview(null);
                setTimeout(() => {
                    setIsCreatedSuccess(false);
                }, 3000);
            } else {
                setIsCreatedFailed(true);
                setTimeout(() => {
                    setIsCreatedFailed(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.currentTarget;
        const numberFields = [
            "calories",
            "quantity",
            "product_price",
            "waiting_time",
        ];

        setNewProduct({
            ...newProduct,
            [name]: numberFields.includes(name) ? Number(value) : value,
        });
    };

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files?.[0];
            setNewImgPreview(URL.createObjectURL(file));

            if (!newProduct) return;

            setNewProduct({
                ...newProduct,
                imgFile: file,
            });
        }
    };

    const handleWaitingTimeValue = (
        type: "Increase" | "Decrease",
        prop: "Waiting Time" | "Quantity",
    ) => {
        if (!newProduct) return;
        if (prop === "Waiting Time") {
            if (type === "Increase") {
                setNewProduct({
                    ...newProduct,
                    waiting_time: newProduct.waiting_time + 1,
                });
            }
            if (type === "Decrease" && newProduct.waiting_time > 0) {
                setNewProduct({
                    ...newProduct,
                    waiting_time: newProduct.waiting_time - 1,
                });
            }
        } else if (prop === "Quantity") {
            if (type === "Increase") {
                setNewProduct({
                    ...newProduct,
                    quantity: newProduct.quantity + 1,
                });
            }
            if (type === "Decrease" && newProduct.quantity > 0) {
                setNewProduct({
                    ...newProduct,
                    quantity: newProduct.quantity - 1,
                });
            }
        }
    };
    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            {isCreatedSuccess && (
                <div className="fixed pop-up-animation top-1/2 flex flex-col items-start justify-center left-1/2 shadow-xl z-10 -translate-x-1/2 w-[30rem] h-[18rem] -translate-y-1/2 bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5] rounded-xl">
                    <div className="flex flex-col items-center w-full gap-2">
                        <i className="text-lightgreen">
                            <LaptopMinimalCheck size={120} />
                        </i>
                        <h1 className="text-[#2c2c2c] text-[1.8rem] font-bold">
                            Product Succesfully Added
                        </h1>
                    </div>

                    <div className="bg-[#2c2c2c] h-[1.25rem] success-timeout absolute bottom-0"></div>
                </div>
            )}
            {isCreatedFailed && (
                <div className="fixed pop-up-animation top-1/2 flex flex-col items-start justify-center left-1/2 shadow-xl z-10 -translate-x-1/2 w-[30rem] h-[18rem] -translate-y-1/2 bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5] rounded-xl">
                    <div className="flex flex-col items-center w-full gap-2">
                        <i className="text-lightred">
                            <BookCopy size={120} />
                        </i>
                        <h1 className="text-[#2c2c2c] text-[1.8rem] font-bold">
                            Product Already Existing
                        </h1>
                    </div>

                    <div className="bg-[#2c2c2c] h-[1.25rem] success-timeout absolute bottom-0"></div>
                </div>
            )}
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
                    <div className="flex relative items-center justify-center bg-darkbrown/60 rounded-xl w-[90%] h-[90%] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.3)]">
                        {newImgPreview ? (
                            <>
                                <div className="absolute bottom-2 right-2">
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-row items-center gap-2 bg-lightbrown hover:bg-darkbrown text-primary text-[0.7rem] font-light py-1 px-3 rounded-md shadow-md transition duration-300 ease-in-out"
                                    >
                                        <ImagePlus size={15} />
                                        Change Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-upload"
                                        className="hidden"
                                        onChange={handleChangeImg}
                                    />
                                </div>
                                <img src={newImgPreview} alt="" />
                            </>
                        ) : (
                            <>
                                {" "}
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer flex flex-row items-center gap-2 bg-lightbrown hover:bg-darkbrown text-primary text-[0.9rem] font-light py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
                                >
                                    <ImagePlus size={18} />
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/png"
                                    id="image-upload"
                                    className="hidden"
                                    onChange={handleChangeImg}
                                />
                            </>
                        )}
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
                                    onChange={handleChange}
                                    value={newProduct?.food_name}
                                    className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                />
                            </div>
                            <div className="flex flex-col w-[30%] gap-1">
                                <label
                                    htmlFor="cuisine-category"
                                    className="text-white/60 text-[0.75rem] font-extralight"
                                >
                                    Category
                                </label>

                                <select
                                    id="cuisine-category"
                                    value={newProduct.cusine_category}
                                    onChange={handleChange}
                                    name="cusine_category"
                                    className="border-darkbrown border-2 input-number outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                >
                                    <option
                                        value="Appetizers"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Appetizers
                                    </option>
                                    <option
                                        value="Main Course"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Main Course
                                    </option>
                                    <option
                                        value="Beverages"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Beverages
                                    </option>
                                    <option
                                        value="Pastries"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Pastries
                                    </option>
                                    <option
                                        value="Healthy Options"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Healthy Options
                                    </option>
                                    <option
                                        value="Desserts"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Desserts
                                    </option>
                                    <option
                                        value="Savory Breakfast"
                                        className="bg-darkbrown cursor-pointer"
                                    >
                                        Savory Breakfast
                                    </option>
                                </select>
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
                                    value={newProduct?.calories}
                                    onChange={handleChange}
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
                                        value={newProduct.quantity}
                                        onChange={handleChange}
                                        className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                    />
                                    <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                        <button
                                            onClick={() =>
                                                handleWaitingTimeValue(
                                                    "Increase",
                                                    "Quantity",
                                                )
                                            }
                                            type="button"
                                            className="cursor-pointer hover:scale-120 duration-75 transition"
                                        >
                                            <ChevronUp size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleWaitingTimeValue(
                                                    "Decrease",
                                                    "Quantity",
                                                )
                                            }
                                            type="button"
                                            className="cursor-pointer hover:scale-120 duration-75 transition"
                                        >
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
                                    value={newProduct.product_price}
                                    onChange={handleChange}
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
                                        value={newProduct.waiting_time}
                                        onChange={handleChange}
                                        id="waiting_time"
                                        className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                    />
                                    <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                        <button
                                            onClick={() =>
                                                handleWaitingTimeValue(
                                                    "Increase",
                                                    "Waiting Time",
                                                )
                                            }
                                            type="button"
                                            className="cursor-pointer hover:scale-120 duration-75 transition"
                                        >
                                            <ChevronUp size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleWaitingTimeValue(
                                                    "Decrease",
                                                    "Waiting Time",
                                                )
                                            }
                                            type="button"
                                            className="cursor-pointer hover:scale-120 duration-75 transition"
                                        >
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
                                value={newProduct.short_desc}
                                onChange={handleChange}
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
                                value={newProduct.full_details}
                                onChange={handleChange}
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
                            onClick={() => {
                                console.dir(newProduct);
                                if (
                                    newProduct.calories > 0 &&
                                    newProduct.cusine_category.length !== 0 &&
                                    newProduct.food_name.length !== 0 &&
                                    newProduct.full_details.length !== 0 &&
                                    newProduct.short_desc.length !== 0 &&
                                    newProduct.product_price > 0 &&
                                    newProduct.quantity > 0 &&
                                    newProduct.waiting_time > 0 &&
                                    newProduct.imgFile
                                ) {
                                    setIsConfirmation(true);
                                } else {
                                    alert("Please fill up all the input");
                                }
                            }}
                            type="button"
                            className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/70 text-[0.85rem] font-light bg-gradient-to-b from-lightbrown to-darkbrown rounded-md px-24 py-2 border-1 border-darkbrown"
                        >
                            <FileCheck2 size={18} />
                            Add
                        </button>
                    </div>
                </div>
            </form>
            {isConfirmation && (
                <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-black/40 flex items-center justify-center">
                    <div className="pop-up-animation flex flex-col items-center gap-4 px-6 w-[50rem] h-fit pb-6 bg-gradient-to-t to-lightbrown from-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="relative border-white/10 w-full border-b-2 py-6 px-4 flex flex-row items-center gap-2 justify-center">
                            <h1 className="text-primary text-[1.7rem] text-shadow-md">
                                Review New Product
                            </h1>
                            <i className="text-primary">
                                <Info size={35} />
                            </i>
                            <button
                                onClick={() => setIsConfirmation(false)}
                                className="cursor-pointer absolute right-8 text-white/75"
                            >
                                <LogOut size={37} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full border-white/10 py-6 border-2 rounded-md">
                            <div className="flex flex-row items-center justify-around w-full">
                                {newImgPreview && (
                                    <div className="flex flex-col py-2 border-1 border-white/20 px-2 rounded-md">
                                        <p className="text-white/85 text-shadow-md text-[0.8rem]">
                                            Image:
                                        </p>
                                        <img
                                            src={newImgPreview}
                                            className="w-[10rem] drop-shadow-lg"
                                            alt=""
                                        />
                                    </div>
                                )}
                                {newProduct.food_name && (
                                    <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Food Name:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.food_name}
                                        </p>
                                    </div>
                                )}

                                {newProduct.cusine_category && (
                                    <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Category:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.cusine_category}
                                        </p>
                                    </div>
                                )}
                                {newProduct.calories && (
                                    <div className="mt-4 flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Calories:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.calories}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row items-center justify-around w-full">
                                {newProduct.quantity && (
                                    <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Quantity:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.quantity}
                                        </p>
                                    </div>
                                )}
                                {newProduct.product_price && (
                                    <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Price:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.product_price}
                                        </p>
                                    </div>
                                )}
                                {newProduct.waiting_time && (
                                    <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                        <p className="text-white/85 text-shadow-md">
                                            Waiting Time:
                                        </p>
                                        <p className="font-extralight text-shadow-md">
                                            {newProduct.waiting_time} mins
                                        </p>
                                    </div>
                                )}
                            </div>

                            {newProduct.short_desc && (
                                <div className="flex mt-8 flex-row items-start justify-start w-[85%] text-white/60 text-[0.8rem] gap-4">
                                    <p className="text-white/85 text-shadow-md">
                                        Short Description:
                                    </p>
                                    <p className="font-extralight text-shadow-md">
                                        {newProduct.short_desc}
                                    </p>
                                </div>
                            )}
                            {newProduct.full_details && (
                                <div className="flex flex-col items-start text-white/60 text-[0.8rem] w-[85%]">
                                    <p className="text-white/85 text-shadow-md">
                                        Full details:
                                    </p>
                                    <p className="font-extralight text-shadow-md">
                                        {newProduct.full_details}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="relative flex flex-row items-center gap-6">
                            <p className="text-white/85 text-[0.9rem] text-shadow-md">
                                Type administrator password to confirm:
                            </p>
                            <div className="relative">
                                {isIncorrectPassword && (
                                    <p className="absolute text-red-600 font-medium -top-[60%] left-0 text-[0.8rem]">
                                        Incorrect password
                                    </p>
                                )}
                                <input
                                    value={adminPassword}
                                    onChange={handlePasswordChange}
                                    type="password"
                                    className="border-1 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.3)] border-white/30 py-1 px-5 rounded-md outline-none text-secondary text-center"
                                />
                            </div>

                            <button
                                onClick={handleConfirmChanges}
                                className="bg-gradient-to-t flex items-center justify-center font-medium cursor-pointer w-[6rem] h-[2.5rem] [box-shadow:-2px_2px_4px_rgba(0,0,0,0.3)] from-yellow-600 to-yellow-500 rounded-md text-[1.1rem] text-white "
                            >
                                {!isSending ? (
                                    "Confirm"
                                ) : (
                                    <span className="loader-white scale-40  pop-up-animation"></span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewProduct;

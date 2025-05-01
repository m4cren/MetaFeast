import {
    Search,
    Pencil,
    Trash2,
    FileCheck2,
    CornerDownLeft,
    ChevronUp,
    ChevronDown,
    Info,
    LaptopMinimalCheck,
    LogOut,
    ImagePlus,
} from "lucide-react";
import {
    ProductDetailsType,
    NewProductDetailTypes,
} from "../../../../types/types";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import useServerAddress from "../../../../../useServerAddress";
import axios from "axios";

import layout from "../../../../styles/layouts/edit_product.module.css";
import { useSocket } from "../../../../contexts/SocketContext";

interface ManageProductsProps {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ManageProducts = ({
    selectedCategory,
    setSelectedCategory,
}: ManageProductsProps) => {
    const [isUpdateConfirm, setIsUpdateConfirm] = useState<boolean>(false);

    const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);

    const [newImgPreview, setNewImgPreview] = useState<string | null>(null);

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files?.[0];
            setNewImgPreview(URL.createObjectURL(file));

            setNewProductsDetails({
                food_name_orig: selectedProduct?.food_name
                    ? selectedProduct.food_name
                    : "",
                food_name: newProductDetails.food_name,
                cusine_category: newProductDetails.cusine_category,
                calories: newProductDetails.calories,
                full_details: newProductDetails.full_details,
                product_price: newProductDetails.product_price,
                short_desc: newProductDetails.short_desc,
                quantity: newProductDetails.quantity,
                waiting_time: newProductDetails.waiting_time,
                imgFile: file,
            });
        }
    };
    useEffect(() => {
        return () => {
            if (newImgPreview) URL.revokeObjectURL(newImgPreview);
        };
    }, [newImgPreview]);

    const handleWaitingTimeValue = (
        type: "Increase" | "Decrease",
        prop: "Waiting Time" | "Quantity",
    ) => {
        if (prop === "Waiting Time") {
            if (type === "Increase") {
                setNewProductsDetails({
                    ...newProductDetails,
                    waiting_time: newProductDetails.waiting_time + 1,
                });
            }
            if (type === "Decrease" && newProductDetails.waiting_time > 0) {
                setNewProductsDetails({
                    ...newProductDetails,
                    waiting_time: newProductDetails.waiting_time - 1,
                });
            }
        } else if (prop === "Quantity") {
            if (type === "Increase") {
                setNewProductsDetails({
                    ...newProductDetails,
                    quantity: newProductDetails.quantity + 1,
                });
            }
            if (type === "Decrease" && newProductDetails.quantity > 0) {
                setNewProductsDetails({
                    ...newProductDetails,
                    quantity: newProductDetails.quantity - 1,
                });
            }
        }
    };

    const [productList, setProductList] = useState<ProductDetailsType[]>([]);
    const [filteredProductList, setFilteredProductList] = useState<
        ProductDetailsType[]
    >([]);

    const [selectedProduct, setSelectedProduct] =
        useState<ProductDetailsType | null>(null);

    const { server } = useServerAddress();

    const [newProductDetails, setNewProductsDetails] =
        useState<NewProductDetailTypes>({
            food_name_orig: selectedProduct?.food_name
                ? selectedProduct.food_name
                : "",
            food_name: "",
            cusine_category: "",
            calories: 0,
            quantity: selectedProduct ? selectedProduct.quantity : 0,
            product_price: 0,
            waiting_time: selectedProduct ? selectedProduct.waiting_time : 0,
            short_desc: "",
            full_details: "",
        });

    const handleChangeEdit = (
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

        setNewProductsDetails({
            ...newProductDetails,
            [name]: numberFields.includes(name) ? Number(value) : value,
        });
    };

    const fetchProductList = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/products/get-details`, {
                headers,
            });

            setProductList(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    useEffect(() => {
        const filtered_products = productList.filter(
            ({ category }) => category === selectedCategory,
        );

        setFilteredProductList(filtered_products);
    }, [productList, selectedCategory]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchProduct = productList.filter(({ food_name }) =>
            food_name
                .toLowerCase()
                .includes(e.currentTarget.value.toLowerCase()),
        );

        setFilteredProductList(searchProduct);

        let cat = "";

        searchProduct.map(({ category }) => {
            cat = category;
        });

        setSelectedCategory(cat);
    };

    const socket = useSocket();

    const [adminPassword, setAdminPassword] = useState<string>("");
    const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
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

            if (response.data.status && !isDeleteProduct) {
                setIsIncorrectPassword(false);
                setIsUpdateConfirm(false);
                setIsEditSuccess(true);
                setTimeout(() => {
                    setIsEditSuccess(false);
                }, 3000);

                updateThisProduct();
            } else if (response.data.status && isDeleteProduct) {
                setIsIncorrectPassword(false);

                setIsEditSuccess(true);
                setTimeout(() => {
                    setIsEditSuccess(false);
                    setIsDeleteProduct(false);
                    setSelectedProduct(null);
                }, 3000);

                socket?.emit("handle-delete-product", newProductDetails);
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
    useEffect(() => {
        socket?.on("refresh-product", (_) => {
            setTimeout(() => {
                fetchProductList();
            }, 2000);
        });
    }, [socket]);

    const updateThisProduct = async () => {
        const formData = new FormData();

        // food_name_orig: string;
        // food_name: string;
        // cusine_category: string;
        // calories: number;
        // quantity: number;
        // product_price: number;
        // waiting_time: number;
        // short_desc: string;
        // full_details: string;
        // imgFile?: File;

        formData.append(
            "food_name_orig",
            newProductDetails.food_name_orig
                ? newProductDetails.food_name_orig
                : "",
        );
        formData.append("food_name", newProductDetails.food_name);
        formData.append("cusine_category", newProductDetails.cusine_category);
        formData.append("calories", String(newProductDetails.calories));
        formData.append("quantity", String(newProductDetails.quantity));
        formData.append(
            "product_price",
            String(newProductDetails.product_price),
        );
        formData.append("waiting_time", String(newProductDetails.waiting_time));
        formData.append("short_desc", newProductDetails.short_desc);
        formData.append("full_details", newProductDetails.full_details);

        if (newProductDetails.imgFile) {
            formData.append("new_img_file", newProductDetails.imgFile);
        }

        const headers = {
            "Content-Type": "multipart/form-data",
        };
        try {
            const response = await axios.post(
                `${server}/admin/update-product`,
                formData,
                {
                    headers,
                },
            );

            if (response.data.status) {
                socket?.emit("handle-update-product", { message: "refresh" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col leading-7">
                    <h1 className="text-primary text-[1.9rem] font-medium text-shadow-md">
                        {!selectedProduct
                            ? "Product Management"
                            : selectedProduct.food_name}
                    </h1>
                    <p className=" text-[0.8rem] font-extralight text-white/60">
                        {!selectedProduct
                            ? "Manage your products"
                            : selectedProduct.category}
                    </p>
                </div>

                <div className="flex flex-row items-center gap-3">
                    {!selectedProduct && (
                        <div className="relative">
                            <input
                                type="text"
                                name="search_name"
                                id="search_name"
                                onChange={handleChange}
                                placeholder="Search products"
                                className="w-[16rem] py-2 border-white/20 rounded-sm text-[0.8rem] pl-8 border-1 text-white/60 outline-none "
                            />
                            <i className="text-white/60 absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2">
                                <Search size={20} />
                            </i>
                        </div>
                    )}
                </div>
            </div>

            {!selectedProduct && (
                <div className="overflow-x-scroll thin-scrollbar px-2 mt-2 py-4 border-b-2 border-darkbrown/50">
                    <div className="flex flex-row items-center gap-4 w-fit">
                        <button
                            onClick={() => setSelectedCategory("Appetizers")}
                            className={`${selectedCategory === "Appetizers" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Appetizers
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Appetizers",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() => setSelectedCategory("Main Course")}
                            className={`${selectedCategory === "Main Course" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Main Course
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Main Course",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() => setSelectedCategory("Beverages")}
                            className={`${selectedCategory === "Beverages" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Beverages
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Beverages",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() => setSelectedCategory("Pastries")}
                            className={`${selectedCategory === "Pastries" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem] px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Pastries
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Pastries",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() =>
                                setSelectedCategory("Healthy Options")
                            }
                            className={`${selectedCategory === "Healthy Options" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Healthy Options
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Healthy Options",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() =>
                                setSelectedCategory("Soups & Salads")
                            }
                            className={`${selectedCategory === "Soups & Salads" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Soups & Salads
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Soups & Salads",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() => setSelectedCategory("Desserts")}
                            className={`${selectedCategory === "Desserts" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Desserts
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Desserts",
                                    ).length
                                }
                            </p>
                        </button>
                        <button
                            onClick={() =>
                                setSelectedCategory("Savory Breakfast")
                            }
                            className={`${selectedCategory === "Savory Breakfast" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[12rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                        >
                            Savory Breakfast
                            <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                                {
                                    productList.filter(
                                        ({ category }) =>
                                            category === "Savory Breakfast",
                                    ).length
                                }
                            </p>
                        </button>
                    </div>
                </div>
            )}

            {!selectedProduct ? (
                <ul className="py-4 flex flex-row flex-wrap justify-start gap-4  h-[29rem] overflow-y-scroll custom-scrollbar">
                    {filteredProductList.map(
                        (
                            {
                                food_name,
                                img,
                                food_price,
                                quantity,
                                calories,
                                category,
                                description,
                                details,
                                ratings,
                                total_orders,
                                waiting_time,
                                total_ratings,
                            },
                            index,
                        ) => (
                            <li
                                key={index}
                                className="relative translate-x-[2px] bg-gradient-to-t [box-shadow:-1px_2px_3px_rgba(0,0,0,0.2)] from-darkbrown to-lightbrown  rounded-2xl w-[12rem] h-[12rem]"
                            >
                                <div className="flex flex-col items-center justify-end h-full gap-1 ">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct({
                                                calories: calories,
                                                category: category,
                                                description: description,
                                                details: details,
                                                food_name: food_name,
                                                ratings: ratings,
                                                total_orders: total_orders,
                                                food_price: food_price,
                                                img: img,
                                                quantity: quantity,
                                                waiting_time: waiting_time,
                                                total_ratings: total_ratings,
                                            });

                                            setNewProductsDetails({
                                                food_name_orig: food_name,
                                                food_name: food_name,
                                                cusine_category: category,
                                                calories: calories,
                                                waiting_time: waiting_time,
                                                product_price: food_price,
                                                quantity: quantity,
                                                short_desc: description,
                                                full_details: details,
                                            });
                                        }}
                                        className="text-white/75 absolute top-2 right-2 cursor-pointer"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <img
                                        src={`/images/products/${img}`}
                                        className="absolute scale-65 -top-1/5"
                                    />
                                    <div className="flex flex-col items-center leading-6">
                                        <h1 className="text-primary text-[1.1rem]">
                                            {food_name}
                                        </h1>
                                        <div className="text-primary flex flex-row items-center gap-1">
                                            <>
                                                {ratings > 4.75 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                    </>
                                                ) : ratings > 4.25 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStarHalfStroke
                                                            size={15}
                                                        />
                                                    </>
                                                ) : ratings > 3.75 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 3.25 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStarHalfStroke
                                                            size={15}
                                                        />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 2.75 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 2.25 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaStarHalfStroke
                                                            size={15}
                                                        />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 1.75 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 1.25 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaStarHalfStroke
                                                            size={15}
                                                        />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 0.75 ? (
                                                    <>
                                                        <FaStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings > 0.25 ? (
                                                    <>
                                                        <FaStarHalfStroke
                                                            size={15}
                                                        />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : ratings >= 0 ? (
                                                    <>
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                        <FaRegStar size={15} />
                                                    </>
                                                ) : null}
                                            </>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between gap-4 py-2">
                                        <button className="text-secondary text-[0.7rem] border-1 border-white/30 rounded-lg px-3 py-1">
                                            ₱ {food_price}
                                        </button>
                                        <button className="text-secondary text-[0.7rem] border-1 border-white/30 rounded-lg px-3 py-1">
                                            {quantity <= 0
                                                ? "Out of stock"
                                                : `Stock: ${quantity}`}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ),
                    )}
                </ul>
            ) : (
                <div className={`${layout.main} h-[33rem] w-full mt-4`}>
                    {isEditSuccess && (
                        <div className="fixed pop-up-animation top-1/2 flex flex-col items-start justify-center left-1/2 shadow-xl z-10 -translate-x-1/2 w-[30rem] h-[18rem] -translate-y-1/2 bg-gradient-to-b from-[#DAE1E5] to-[#EAF2F5] rounded-xl">
                            <div className="flex flex-col items-center w-full gap-2">
                                <i className="text-lightgreen">
                                    <LaptopMinimalCheck size={120} />
                                </i>
                                <h1 className="text-[#2c2c2c] text-[1.8rem] font-bold">
                                    Product{" "}
                                    {!isDeleteProduct ? "Updated" : "Deleted"}{" "}
                                    Succesfully
                                </h1>
                            </div>

                            <div className="bg-[#2c2c2c] h-[1.25rem] success-timeout absolute bottom-0"></div>
                        </div>
                    )}
                    <div
                        className={`${layout["img-container"]} flex items-center justify-center`}
                    >
                        <div className="relative bg-darkbrown/60 rounded-xl w-[90%] h-[90%] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.3)]">
                            {newImgPreview ? (
                                <img
                                    src={newImgPreview}
                                    alt=""
                                    className="scale-90"
                                />
                            ) : (
                                <img
                                    src={`/images/products/${selectedProduct.img}`}
                                    alt=""
                                    className="scale-90"
                                />
                            )}
                            <div className="absolute bottom-2 right-2">
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer flex flex-row items-center gap-1 bg-lightbrown hover:bg-darkbrown text-primary text-[0.75rem] font-light py-1 px-2 rounded-md shadow-md transition duration-200 ease-in-out"
                                >
                                    <ImagePlus size={16} />
                                    Change Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/png"
                                    id="image-upload"
                                    className="hidden"
                                    onChange={handleChangeImg}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${layout["product-details"]} flex items-center justify-center`}
                    >
                        <div className="flex flex-col gap-4 w-[90%] h-full pt-6">
                            <div className="flex flex-row items-center text-primary gap-1 justify-center">
                                {selectedProduct.ratings > 4.75 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 4.25 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStarHalfStroke size={15} />
                                    </>
                                ) : selectedProduct.ratings > 3.75 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 3.25 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStarHalfStroke size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 2.75 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 2.25 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaStarHalfStroke size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 1.75 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 1.25 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaStarHalfStroke size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 0.75 ? (
                                    <>
                                        <FaStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings > 0.25 ? (
                                    <>
                                        <FaStarHalfStroke size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : selectedProduct.ratings >= 0 ? (
                                    <>
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                        <FaRegStar size={15} />
                                    </>
                                ) : null}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Available Stocks:</p>
                                        <p>{selectedProduct.quantity}</p>
                                    </div>
                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Price:</p>
                                        <p>₱ {selectedProduct.food_price}</p>
                                    </div>
                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Total Calories</p>
                                        <p>{selectedProduct.calories}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Total Ratings:</p>
                                        <p>{selectedProduct.total_ratings}</p>
                                    </div>
                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Average Ratings:</p>
                                        <p>
                                            {selectedProduct.ratings.toFixed(1)}
                                        </p>
                                    </div>

                                    <div className="text-secondary flex flex-row items-center justify-between">
                                        <p>Total Orders:</p>
                                        <p>{selectedProduct.total_orders}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${layout["title-edit"]} flex items-center`}
                    >
                        <h1 className="text-primary text-[1.4rem]">
                            Edit Product
                        </h1>
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
                                        placeholder={`${selectedProduct.food_name}`}
                                        id="cuisine_name"
                                        name="food_name"
                                        value={newProductDetails.food_name}
                                        onChange={handleChangeEdit}
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
                                        value={
                                            newProductDetails.cusine_category
                                        }
                                        onChange={handleChangeEdit}
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
                                        placeholder={`${selectedProduct.calories}`}
                                        id="calories"
                                        value={newProductDetails.calories}
                                        onChange={handleChangeEdit}
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
                                            value={newProductDetails.quantity}
                                            onChange={handleChangeEdit}
                                            className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                        />
                                        <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                            <button
                                                className="cursor-pointer hover:scale-120 duration-75 transition"
                                                onClick={() =>
                                                    handleWaitingTimeValue(
                                                        "Increase",
                                                        "Quantity",
                                                    )
                                                }
                                            >
                                                <ChevronUp size={18} />
                                            </button>
                                            <button
                                                className="cursor-pointer hover:scale-120 duration-75 transition"
                                                onClick={() =>
                                                    handleWaitingTimeValue(
                                                        "Decrease",
                                                        "Quantity",
                                                    )
                                                }
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
                                        id="price"
                                        onChange={handleChangeEdit}
                                        value={newProductDetails.product_price}
                                        placeholder={`${selectedProduct.food_price}`}
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
                                            onChange={handleChangeEdit}
                                            value={
                                                newProductDetails.waiting_time
                                            }
                                            id="waiting_time"
                                            className=" border-darkbrown w-full input-number border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                        />
                                        <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-secondary">
                                            <button
                                                className="cursor-pointer hover:scale-120 duration-75 transition"
                                                onClick={() =>
                                                    handleWaitingTimeValue(
                                                        "Increase",
                                                        "Waiting Time",
                                                    )
                                                }
                                            >
                                                <ChevronUp size={18} />
                                            </button>
                                            <button
                                                className="cursor-pointer hover:scale-120 duration-75 transition"
                                                onClick={() =>
                                                    handleWaitingTimeValue(
                                                        "Decrease",
                                                        "Waiting Time",
                                                    )
                                                }
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
                                    value={newProductDetails.short_desc}
                                    onChange={handleChangeEdit}
                                    placeholder={`${selectedProduct.description}`}
                                    className="border-2 border-darkbrown  rounded-md resize-none outline-none text-white/80 px-2 font-extralight text-[0.85rem] py-1"
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
                                    value={newProductDetails.full_details}
                                    onChange={handleChangeEdit}
                                    placeholder={`${selectedProduct.details}`}
                                    className="border-2 border-darkbrown leading-4 rounded-md resize-none h-full outline-none text-white/80 px-2 font-extralight text-[0.8rem] py-1 text-justify"
                                    id="details"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${layout["delete-container"]} flex flex-col items-center`}
                    >
                        <div className="w-[90%] h-full flex items-center">
                            <button
                                onClick={() => setIsDeleteProduct(true)}
                                className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2"
                            >
                                <Trash2 size={18} />
                                Delete Product
                            </button>
                        </div>
                        {isDeleteProduct && (
                            <div className="fixed flex items-center justify-center bg-black/40 top-0 bottom-0 right-0 left-0">
                                <div className="pop-up-animation flex flex-col items-center gap-4 px-6 w-[50rem] h-fit pb-6 bg-gradient-to-t to-lightbrown from-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                                    <div className="relative border-white/10 w-full border-b-2 py-6 px-4 flex flex-col items-center gap-2 justify-center">
                                        <div className=" flex flex-row items-center gap-4">
                                            <h1 className="text-primary text-[1.7rem] text-shadow-md">
                                                Delete This Product?
                                            </h1>
                                            <button
                                                onClick={() =>
                                                    setIsDeleteProduct(false)
                                                }
                                                className="cursor-pointer absolute right-8 text-white/75"
                                            >
                                                <LogOut size={37} />
                                            </button>
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <img
                                                src={`/images/products/${selectedProduct.img}`}
                                                alt=""
                                                className="w-[10rem]"
                                            />
                                            <h1 className="text-primary">
                                                {selectedProduct.food_name}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="relative flex flex-row items-center gap-6">
                                        <p className="text-white/85 text-[0.9rem] text-shadow-md">
                                            Type administrator password to
                                            confirm:
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
                    <div className={`${layout["control-container"]}`}>
                        <div className="flex flex-row gap-2 justify-end items-center h-full">
                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setNewImgPreview(null);
                                }}
                                className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2"
                            >
                                <CornerDownLeft size={18} />
                                Back
                            </button>
                            <button
                                onClick={() => {
                                    if (
                                        newProductDetails.food_name !==
                                            selectedProduct.food_name ||
                                        newProductDetails.cusine_category !==
                                            selectedProduct.category ||
                                        newProductDetails.calories !==
                                            selectedProduct.calories ||
                                        newProductDetails.quantity !==
                                            selectedProduct.quantity ||
                                        newProductDetails.product_price !==
                                            selectedProduct.food_price ||
                                        newProductDetails.waiting_time !==
                                            selectedProduct.waiting_time ||
                                        newProductDetails.short_desc !==
                                            selectedProduct.description ||
                                        newProductDetails.full_details !==
                                            selectedProduct.details ||
                                        newProductDetails.imgFile
                                    ) {
                                        setIsUpdateConfirm(true);
                                    } else {
                                        alert("Nothing changes");
                                    }
                                }}
                                className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/70 text-[0.85rem] font-light bg-gradient-to-b from-lightbrown to-darkbrown rounded-md px-6 py-2 border-1 border-darkbrown"
                            >
                                <FileCheck2 size={18} />
                                Update
                            </button>
                        </div>
                        {isUpdateConfirm && (
                            <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-black/40 flex items-center justify-center">
                                <div className="pop-up-animation flex flex-col items-center gap-4 px-6 w-[50rem] h-fit pb-6 bg-gradient-to-t to-lightbrown from-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                                    <div className="relative border-white/10 w-full border-b-2 py-6 px-4 flex flex-row items-center gap-2 justify-center">
                                        <h1 className="text-primary text-[1.7rem] text-shadow-md">
                                            Update Confirmation
                                        </h1>
                                        <i className="text-primary">
                                            <Info size={35} />
                                        </i>
                                        <button
                                            onClick={() =>
                                                setIsUpdateConfirm(false)
                                            }
                                            className="cursor-pointer absolute right-8 text-white/75"
                                        >
                                            <LogOut size={37} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 w-full border-white/10 py-6 border-2 rounded-md">
                                        <h1 className="text-primary text-[1.4rem] mb-4 text-shadow-md w-full pl-12">
                                            Review Changes
                                        </h1>
                                        <div className="flex flex-row items-center justify-around w-full">
                                            {newImgPreview && (
                                                <div className="flex flex-col py-2 border-1 border-white/20 px-2 rounded-md">
                                                    <p className="text-white/85 text-shadow-md text-[0.8rem]">
                                                        New Image:
                                                    </p>
                                                    <img
                                                        src={newImgPreview}
                                                        className="w-[10rem] drop-shadow-lg"
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                            {newProductDetails.food_name !==
                                                selectedProduct.food_name && (
                                                <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Food Name:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.food_name
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {newProductDetails.cusine_category !==
                                                selectedProduct.category && (
                                                <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Category:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.cusine_category
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {newProductDetails.calories !==
                                                selectedProduct.calories && (
                                                <div className="mt-4 flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Calories:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.calories
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-row items-center justify-around w-full">
                                            {newProductDetails.quantity !==
                                                selectedProduct.quantity && (
                                                <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Quantity:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.quantity
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {newProductDetails.product_price !==
                                                selectedProduct.food_price && (
                                                <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Price:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.product_price
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {newProductDetails.waiting_time !==
                                                selectedProduct.waiting_time && (
                                                <div className="flex flex-row items-center text-white/60 text-[0.8rem] gap-4">
                                                    <p className="text-white/85 text-shadow-md">
                                                        Waiting Time:
                                                    </p>
                                                    <p className="font-extralight text-shadow-md">
                                                        {
                                                            newProductDetails.waiting_time
                                                        }{" "}
                                                        mins
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {newProductDetails.short_desc !==
                                            selectedProduct.description && (
                                            <div className="flex mt-8 flex-row items-start justify-start w-[85%] text-white/60 text-[0.8rem] gap-4">
                                                <p className="text-white/85 text-shadow-md">
                                                    Short Description:
                                                </p>
                                                <p className="font-extralight text-shadow-md">
                                                    {
                                                        newProductDetails.short_desc
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {newProductDetails.full_details !==
                                            selectedProduct.details && (
                                            <div className="flex flex-col items-start text-white/60 text-[0.8rem] w-[85%]">
                                                <p className="text-white/85 text-shadow-md">
                                                    Full details:
                                                </p>
                                                <p className="font-extralight text-shadow-md">
                                                    {
                                                        newProductDetails.full_details
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative flex flex-row items-center gap-6">
                                        <p className="text-white/85 text-[0.9rem] text-shadow-md">
                                            Type administrator password to
                                            confirm:
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
                </div>
            )}
        </div>
    );
};

export default ManageProducts;

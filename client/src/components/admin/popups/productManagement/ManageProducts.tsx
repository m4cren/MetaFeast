import {
    Search,
    Pencil,
    Trash2,
    FileCheck2,
    CornerDownLeft,
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import { ProductDetailsType } from "../../../../types/types";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import useServerAddress from "../../../../../useServerAddress";
import axios from "axios";

import layout from "../../../../styles/layouts/edit_product.module.css";

interface ManageProductsProps {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ManageProducts = ({
    selectedCategory,
    setSelectedCategory,
}: ManageProductsProps) => {
    const [waitingTimeValue, setWaitingTimeValue] = useState<number>(0);
    const [quantityValue, setQuantityValue] = useState<number>(0);

    const handleWaitingTimeValue = (
        type: "Increase" | "Decrease",
        prop: "Waiting Time" | "Quantity",
    ) => {
        if (prop === "Waiting Time") {
            if (type === "Increase") {
                setWaitingTimeValue((prev) => prev + 1);
            }
            if (type === "Decrease" && waitingTimeValue > 0) {
                setWaitingTimeValue((prev) => prev - 1);
            }
        } else if (prop === "Quantity") {
            if (type === "Increase") {
                setQuantityValue((prev) => prev + 1);
            }
            if (type === "Decrease" && waitingTimeValue > 0) {
                setQuantityValue((prev) => prev - 1);
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

    useEffect(() => {
        setWaitingTimeValue(selectedProduct ? selectedProduct.waiting_time : 0);
        setQuantityValue(selectedProduct ? selectedProduct.quantity : 0);
    }, [selectedProduct]);
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

    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col leading-7">
                    <h1 className="text-primary text-[1.9rem] font-medium">
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
                                        onClick={() =>
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
                                            })
                                        }
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
                                            Stock: {quantity}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ),
                    )}
                </ul>
            ) : (
                <div className={`${layout.main} h-[33rem] w-full mt-4`}>
                    <div
                        className={`${layout["img-container"]} flex items-center justify-center`}
                    >
                        <div className="bg-darkbrown/60 rounded-xl w-[90%] h-[90%] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.3)]">
                            <img
                                src={`/images/products/${selectedProduct.img}`}
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
                                <div className="flex flex-col w-[60%] gap-1">
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
                                        placeholder={`${selectedProduct.category}`}
                                        id="cuisine_category"
                                        className=" border-darkbrown border-2 outline-none rounded-md text-white/80 px-2 font-light text-[0.85rem] py-1"
                                    />
                                </div>
                                <div className="flex flex-col w-[20%] gap-1">
                                    <label
                                        htmlFor="calories"
                                        className="text-white/60 text-[0.75rem] font-extralight"
                                    >
                                        Calories
                                    </label>
                                    <input
                                        type="number"
                                        placeholder={`${selectedProduct.calories}`}
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
                                            placeholder={`${quantityValue}`}
                                            id="quantity"
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
                                        id="price"
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
                                            placeholder={`${waitingTimeValue}`}
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
                                    name=""
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
                                    name="details"
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
                            <button className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2">
                                <Trash2 size={18} />
                                Delete Product
                            </button>
                        </div>
                    </div>
                    <div className={`${layout["control-container"]}`}>
                        <div className="flex flex-row gap-2 justify-end items-center h-full">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="flex flex-row gap-2 cursor-pointer [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/60 text-[0.75rem] font-light border-white/20 border-1 rounded-md px-6 py-2"
                            >
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
            )}
        </div>
    );
};

export default ManageProducts;

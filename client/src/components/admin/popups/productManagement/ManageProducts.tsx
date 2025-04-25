import { Search, Pencil } from "lucide-react";
import { ProductDetailsType } from "../../../../types/types";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import useServerAddress from "../../../../../useServerAddress";
import axios from "axios";

interface ManageProductsProps {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ManageProducts = ({
    selectedCategory,
    setSelectedCategory,
}: ManageProductsProps) => {
    const [productList, setProductList] = useState<ProductDetailsType[]>([]);
    const [filteredProductList, setFilteredProductList] = useState<
        ProductDetailsType[]
    >([]);

    const { server } = useServerAddress();

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
                <div className="flex flex-col leading-6">
                    <h1 className="text-primary text-[1.75rem]">
                        Product Management
                    </h1>
                    <p className=" text-[0.75rem] font-extralight text-white/60">
                        Manage your products
                    </p>
                </div>

                <div className="flex flex-row items-center gap-3">
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
                </div>
            </div>

            <div className="overflow-x-scroll thin-scrollbar px-2 mt-2 py-4 border-b-2 border-darkbrown/50">
                <div className="flex flex-row items-center gap-4 w-fit">
                    <button
                        onClick={() => setSelectedCategory("Appetizers")}
                        className={`${selectedCategory === "Appetizers" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                    >
                        Appetizers
                        <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                            {
                                productList.filter(
                                    ({ category }) => category === "Appetizers",
                                ).length
                            }
                        </p>
                    </button>
                    <button
                        onClick={() => setSelectedCategory("Main Course")}
                        className={`${selectedCategory === "Main Course" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
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
                        className={`${selectedCategory === "Beverages" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                    >
                        Beverages
                        <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                            {
                                productList.filter(
                                    ({ category }) => category === "Beverages",
                                ).length
                            }
                        </p>
                    </button>
                    <button
                        onClick={() => setSelectedCategory("Pastries")}
                        className={`${selectedCategory === "Pastries" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem] px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                    >
                        Pastries
                        <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                            {
                                productList.filter(
                                    ({ category }) => category === "Pastries",
                                ).length
                            }
                        </p>
                    </button>
                    <button
                        onClick={() => setSelectedCategory("Healthy Options")}
                        className={`${selectedCategory === "Healthy Options" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
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
                        onClick={() => setSelectedCategory("Soups & Salads")}
                        className={`${selectedCategory === "Soups & Salads" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
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
                        className={`${selectedCategory === "Desserts" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                    >
                        Desserts
                        <p className="border-1 border-white/30 rounded-full px-2 text-[0.7rem] text-white/65">
                            {
                                productList.filter(
                                    ({ category }) => category === "Desserts",
                                ).length
                            }
                        </p>
                    </button>
                    <button
                        onClick={() => setSelectedCategory("Savory")}
                        className={`${selectedCategory === "Savory" && "bg-gradient-to-b from-lightbrown to-darkbrown rounded-sm py-1 px-2 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] "} cursor-pointer w-[10rem] text-[0.85rem]  px-2 text-white/75 flex flex-row items-center justify-center gap-2`}
                    >
                        Savory
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

            <ul className="py-4 flex flex-row flex-wrap justify-start gap-4  h-[25rem] overflow-y-scroll custom-scrollbar">
                {filteredProductList.map(
                    ({ food_name, img, food_price, quantity }, index) => (
                        <li
                            key={index}
                            className="relative translate-x-[2px] bg-gradient-to-t [box-shadow:-1px_2px_3px_rgba(0,0,0,0.2)] from-darkbrown to-lightbrown  rounded-2xl w-[12rem] h-[12rem]"
                        >
                            <div className="flex flex-col items-center justify-end h-full gap-1 ">
                                <button className="text-white/75 absolute top-2 right-2 cursor-pointer">
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
                                            <FaStar size={15} />
                                            <FaStar size={15} />
                                            <FaStar size={15} />
                                            <FaStar size={15} />
                                            <FaStar size={15} />
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
        </div>
    );
};

export default ManageProducts;

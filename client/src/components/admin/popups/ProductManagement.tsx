import React, { useEffect, useState } from "react";
import {
    NotebookTabs,
    ChartNoAxesCombined,
    FileClock,
    LogOut,
    House,
    ChevronRight,
    PackagePlus,
} from "lucide-react";
import OrderHistory from "./productManagement/OrderHistory";
import ManageProducts from "./productManagement/ManageProducts";
import SalesAnalytics from "./productManagement/SalesAnalytics";
import NewProduct from "./productManagement/NewProduct";

interface ProductManagementProps {
    setIsProductManagement: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductManagement = ({
    setIsProductManagement,
}: ProductManagementProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] =
        useState<string>("Appetizers");

    const [selectedTab, setSelectedTab] = useState<
        | "Product Management"
        | "Order History"
        | "Sales Analytics"
        | "Add New Product"
    >("Product Management");

    const [openTabs, setOpenTabs] = useState<string[]>(["Catalouges"]);

    const handleClose = () => {
        setIsClose(true);
        setTimeout(() => {
            setIsClose(false);
            setIsProductManagement(false);
        }, 250);
    };

    useEffect(() => {
        setOpenTabs(["Catalogues", "Product Management"]);
    }, []);
    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex flex-row justify-center items-center pointer-events-auto">
            <div
                className={`${isClose && "to-left-close-animation"} to-left-animation w-[18vw] origin-right h-[45rem] px-6 bg-gradient-to-t from-darkbrown to-lightbrown rounded-tl-3xl rounded-bl-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]`}
            >
                <div
                    className={`${isClose && "pop-close-animation"} pop-up-animation flex items-end pb-2  h-[10%]`}
                >
                    <p className="text-white/70 text-[0.85rem] font-light text-shadow-md">
                        Catalouges
                    </p>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2  h-[78%]">
                    <li
                        onClick={() => {
                            setSelectedTab("Product Management");
                            setOpenTabs(["Catalogues", "Product Management"]);
                        }}
                        className={`${isClose && "pop-close-animation"} cursor-pointer pop-up-animation flex flex-row gap-2 items-center text-primary`}
                    >
                        <i>
                            <NotebookTabs />
                        </i>
                        <h1 className=" text-[1rem] text-shadow-md">
                            Product Management
                        </h1>
                    </li>
                    <li
                        onClick={() => {
                            setSelectedTab("Sales Analytics");
                            setOpenTabs(["Catalogues", "Sales Analytics"]);
                        }}
                        className={`${isClose && "pop-close-animation"} cursor-pointer pop-up-animation flex flex-row gap-2 items-center text-primary`}
                    >
                        <i>
                            <ChartNoAxesCombined />
                        </i>
                        <h1 className=" text-[1rem] text-shadow-md">
                            Sales Analytics
                        </h1>
                    </li>
                    <li
                        onClick={() => {
                            setSelectedTab("Order History");
                            setOpenTabs(["Catalogues", "Order History"]);
                        }}
                        className={`${isClose && "pop-close-animation"} cursor-pointer pop-up-animation flex flex-row gap-2 items-center text-primary`}
                    >
                        <i>
                            <FileClock />
                        </i>
                        <h1 className=" text-[1rem] text-shadow-md">
                            Order History
                        </h1>
                    </li>
                    <li
                        onClick={() => {
                            setSelectedTab("Add New Product");
                            setOpenTabs(["Catalogues", "Add New Product"]);
                        }}
                        className={`${isClose && "pop-close-animation"} cursor-pointer pop-up-animation flex flex-row gap-2 items-center text-primary`}
                    >
                        <i>
                            <PackagePlus />
                        </i>
                        <h1 className=" text-[1rem] text-shadow-md">
                            Add New Product
                        </h1>
                    </li>
                </div>
                <div className="flex flex-row items-start justify-between h-[12%]">
                    <div
                        className={`${isClose && "pop-close-animation"} pop-up-animation flex flex-col leading-6`}
                    >
                        <h1 className="text-primary text-[1.6rem] text-shadow-md">
                            Metafeast
                        </h1>
                        <p className="text-secondary text-[0.75rem] font-extralight text-shadow-md">
                            metafeastxyz@outlook.com
                        </p>
                    </div>
                    <div
                        className={`${isClose && "pop-close-animation"} pop-up-animation`}
                    >
                        <button
                            onClick={handleClose}
                            className="text-primary cursor-pointer"
                        >
                            <LogOut size={33} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between h-[25rem]">
                <div className="w-[1.5rem] relative -z-1 h-2 bg-gradient-to-t from-darkbrown to-lightbrown"></div>
                <div className="w-[1.5rem] relative -z-1 h-2 bg-gradient-to-t from-darkbrown to-lightbrown"></div>
            </div>
            <div
                className={`${isClose && "to-right-close-animation"} to-right-animation w-[50vw] h-[45rem] bg-gradient-to-t from-darkbrown to-lightbrown rounded-tr-3xl rounded-br-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]`}
            >
                <div className="text-pop-up-animation flex items-end h-[4rem] w-full">
                    <span className="pl-12 bg-gradient-to-r from-black/20 to-black/0 w-full py-1 flex flex-row items-center text-[0.7rem] font-extralight text-white/65  gap-5">
                        <House size={18} />

                        {openTabs.map((tab) => (
                            <>
                                <ChevronRight size={20} />
                                <p
                                    key={tab}
                                    className={`${selectedTab === tab && "text-white/90"}`}
                                >
                                    {tab}
                                </p>
                            </>
                        ))}
                    </span>
                </div>
                {selectedTab === "Order History" && <OrderHistory />}
                {selectedTab === "Product Management" && (
                    <ManageProducts
                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}
                    />
                )}
                {selectedTab === "Sales Analytics" && <SalesAnalytics />}

                {selectedTab === "Add New Product" && <NewProduct />}
            </div>
        </div>
    );
};

export default ProductManagement;

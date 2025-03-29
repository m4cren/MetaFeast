import { useEffect, useState } from "react";
import OrderMenu from "./order/OrderMenu";
import ProductDetails from "./order/ProductDetails";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { ProductDetailsType } from "../../../types/types";

const Order = () => {
    const [selectedCuisine, setSelectedCusine] = useState<string>("");
    const { server } = useServerAddress();
    const [productDetails, setProducDetails] = useState<ProductDetailsType[]>(
        [],
    );

    const fetchProductDetails = async () => {
        const headers = {
            "Content-Type": "json/application",
        };
        try {
            const response = await axios.get(`${server}/products/get-details`, {
                headers,
                withCredentials: false,
            });

            setProducDetails(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    return (
        <>
            {selectedCuisine.length !== 0 ? (
                <ProductDetails
                    selectedCuisine={selectedCuisine}
                    setSelectedCuisine={setSelectedCusine}
                    productDetails={productDetails}
                />
            ) : (
                <OrderMenu
                    setSelectedCuisine={setSelectedCusine}
                    productDetails={productDetails}
                />
            )}
        </>
    );
};

export default Order;

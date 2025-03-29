import { useState } from "react";
import OrderMenu from "./order/OrderMenu";
import ProductDetails from "./order/ProductDetails";

const Order = () => {
    const [selected, setSelected] = useState<string>("Appetizers");
    console.log(selected, setSelected);
    return (
        <>
            {/* <OrderMenu selected={selected} setSelected={setSelected} /> */}
            <ProductDetails />
        </>
    );
};

export default Order;

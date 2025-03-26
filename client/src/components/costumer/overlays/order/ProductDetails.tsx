import layout from "../../../../styles/layouts/order_confirmation.module.css";

const ProductDetails = () => {
    return (
        <div className={`${layout.main}`}>
            <div className={`${layout.head}`}></div>
            <div className={`${layout["image-container"]}`}></div>
            <div className={`${layout["food-title"]}`}></div>
            <div className={`${layout["food-price"]}`}></div>
            <div className={`${layout["food-detail"]}`}></div>
            <div>add to basket</div>
        </div>
    );
};

export default ProductDetails;

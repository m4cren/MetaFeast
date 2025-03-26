import layout from "../../../../styles/layouts/order_menu.module.css";

const OrderMenu = () => {
    return (
        <div className={`${layout}`}>
            <div className={`${layout.head}`}></div>
            <div className={`${layout.greet}`}></div>
            <div className={`${layout.category}`}></div>
            <div className={`${layout.cuisine}`}></div>
            <div>basket</div>
        </div>
    );
};

export default OrderMenu;

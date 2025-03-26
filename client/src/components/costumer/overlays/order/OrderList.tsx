import layout from "../../../../styles/layouts/order_list.module.css";

const OrderList = () => {
    return (
        <div className={`${layout.main}`}>
            <div className={`${layout.head}`}></div>
            <div className={`${layout["order-list"]}`}></div>
            <div>
                <div>
                    <h2>
                        <span>Total Cost:</span>
                        <span>₱ 129</span>
                    </h2>
                    <h2>
                        <span>Waiting Time:</span>
                        <span>30mins</span>
                    </h2>
                    <h2>
                        <span>Total Energy:</span>
                        <span>1286cal</span>
                    </h2>
                </div>
                <div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default OrderList;

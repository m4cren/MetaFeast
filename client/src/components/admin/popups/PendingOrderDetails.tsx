import { PendingOrderType } from "../../../types/types";
import { ArrowBigLeft } from "lucide-react";

interface PendingOrderDetailProps {
    pendingOrderDetails?: PendingOrderType | null;
    setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const PendingOrderDetails = ({
    pendingOrderDetails,
    setIsToggle,
}: PendingOrderDetailProps) => {
    return (
        <div className="w-1/2 h-[30rem] bg-[#f3f3f3] relative rounded-2xl pop-up-animation ">
            <button
                onClick={() => setIsToggle(false)}
                className="absolute top-2 left-2 border-1 border-white/10 rounded-2xl cursor-pointer"
            >
                <ArrowBigLeft size={40} />
            </button>
            <h1 className="text-dark-primary text-center">
                {pendingOrderDetails?.costumer_name}'s orders
            </h1>
            <ul>
                {pendingOrderDetails?.orders.map(
                    ({ food_name, price, quantity }, index) => (
                        <li key={index}>
                            <h1>{food_name}</h1>
                            <div>
                                <p>{quantity}</p>
                                <p>₱ {price}</p>
                            </div>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
};

export default PendingOrderDetails;

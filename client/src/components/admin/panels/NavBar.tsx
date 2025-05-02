import { memo } from "react";
import { UtensilsCrossed } from "lucide-react";

interface Props {
    isTransitioning: boolean;
    setIsTableRequest: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPendingPayment: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
    setIsProductManagement: React.Dispatch<React.SetStateAction<boolean>>;
    pendingPaymentNotification: number;
}

const NavBar = ({
    isTransitioning,
    setIsTableRequest,
    setIsPendingPayment,
    setIsReview,
    setIsProductManagement,
    pendingPaymentNotification,
}: Props) => {
    return (
        <div
            className={`${isTransitioning && "translate-y-[-8rem]"} h-[10vh] mr-5 pointer-events-auto transition duration-500  bg-gradient-to-b from-darkbrown to-lightbrown backdrop-blur-lg rounded-br-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)] flex flex-row justify-between px-10 items-center`}
        >
            <div className="text-primary flex gap-2 flex-row items-center text-shadow-md">
                <p className="drop-shadow-xl">
                    <UtensilsCrossed size={40} />
                </p>

                <p className="text-[1.5rem]">Metafeast</p>
            </div>

            <div className="text-primary flex flex-row items-center justify-around w-[60%] text-shadow-md ">
                <p
                    onClick={() => setIsTableRequest(true)}
                    className="cursor-pointer grow-1 text-center border-r-3 border-darkbrown/70 hover:text-white transition duration-100 hover:opacity-80"
                >
                    Table Request
                </p>

                <p
                    onClick={() => setIsPendingPayment(true)}
                    className="relative cursor-pointer grow-1 text-center border-r-3 border-darkbrown/70 hover:text-white transition duration-100 hover:opacity-80"
                >
                    {pendingPaymentNotification !== 0 && (
                        <span className="absolute -top-2 right-7  w-5 h-5 rounded-full flex items-center justify-center bg-lightred text-white/90 text-[0.72rem] z-10 text-shadow-md [box-shadow:-2px_2px_5px_rgba(0,0,0,0.3)]">
                            {pendingPaymentNotification}
                        </span>
                    )}
                    Pending Payment
                </p>
                <p
                    onClick={() => setIsProductManagement(true)}
                    className="cursor-pointer grow-1 text-center border-r-3 border-darkbrown/70 hover:text-white transition duration-100 hover:opacity-80"
                >
                    Products
                </p>
                <p
                    onClick={() => setIsReview(true)}
                    className="cursor-pointer grow-1 text-center  hover:text-white transition duration-100 hover:opacity-80"
                >
                    Ratings
                </p>
            </div>
        </div>
    );
};

export default memo(NavBar);

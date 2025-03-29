import layout from "../../../../styles/layouts/product_details.module.css";
import { ArrowBigLeft, ShoppingBasket, Flame, Hourglass } from "lucide-react";

const ProductDetails = () => {
    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative`}
        >
            <div
                className={`${layout.head} flex flex-row justify-between px-6`}
            >
                <button className="text-primary text-shadow-md">
                    <ArrowBigLeft size={45} />
                </button>
                <button className="text-primary text-shadow-md">
                    <ShoppingBasket size={45} />
                </button>
            </div>
            <div className={`${layout["image-container"]} translate-y-[-30px]`}>
                <img
                    className="drop-shadow-lg"
                    src="/images/products/sirloin_steak.png"
                />
            </div>
            <div
                className={`${layout["food-title"]} flex flex-col justify-between pl-6`}
            >
                <div className="flex flex-col gap-[0.5]">
                    <h1 className="text-primary text-2xl">Sirloin Steak</h1>
                    <p className="text-white/50 font-extralight text-[0.8rem] leading-4">
                        Juicy, flavorful, and perfectly grilled beef cut.
                    </p>
                </div>
                <div className="flex flex-row text-white/60 text-[0.8rem] font-extralight justify-between h-[3.35rem]">
                    <p className="flex flex-row items-center">
                        384cal <Flame size={17} />
                    </p>
                    <p className="flex flex-row items-center">
                        12-15mins <Hourglass size={17} />
                    </p>
                </div>
            </div>
            <div
                className={`${layout["food-price"]} pr-6 flex flex-col justify-between items-end`}
            >
                <h1 className="text-primary text-4xl text-shadow-md">₱ 299</h1>
                <div className="[box-shadow:0_0_8px_rgba(0,0,0,0.5)_inset] bg-gradient-to-t rounded-4xl shadow-md  w-[9.5rem] h-[3.35rem] to-[#9A7E57] from-[#665237] flex flex-row items-center justify-between px-4 text-primary">
                    <button className="text-shadow-md text-5xl">-</button>
                    <p className="text-shadow-md">1</p>
                    <button className="text-shadow-md text-5xl">+</button>
                </div>
            </div>
            <div className={`${layout["food-detail"]} px-6`}>
                <h1 className="text-primary text-lg">Details</h1>
                <p className="text-justify text-white/50 font-extralight text-[0.8rem]">
                    Sirloin steak is a popular cut of beef taken from the rear
                    back portion of the cow, just above the tenderloin. It is
                    known for its balance of tenderness and rich, beefy flavor,
                    making it a favorite for grilling, pan-searing, or broiling.
                    While not as tender as filet mignon, it has more flavor due
                    to its moderate marbling, which keeps it juicy when cooked
                    properly. Sirloin steak is often seasoned with salt, pepper,
                    and garlic, and pairs well with sides like mashed potatoes,
                    roasted vegetables, or a fresh salad.
                </p>
            </div>
            <div className="absolute bottom-10 @sm:bottom-20 w-full h-15 flex items-center justify-center z-10 ">
                <button className="text-primary  px-30 py-3 bg-transparent backdrop-blur-[50px] [-webkit-backdrop-filter:blur(50px)] rounded-[10rem] border-1 border-white/10 shadow-lg">
                    Add to basket
                </button>
            </div>
            <div className="w-full h-[80%] bg-gradient-to-t from-[#0000009e] to-[#ffffff00] absolute bottom-0 z-[-1]"></div>
        </div>
    );
};

export default ProductDetails;

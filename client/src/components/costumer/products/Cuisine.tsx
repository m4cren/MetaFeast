import { CuisineDetailProps as CuisineProps } from "../../../types/types";

const Cuisine: React.FC<CuisineProps> = ({
    img,
    name,
    price,
    quantity,
    height,
    type,
}) => {
    return (
        <div className="flex flex-col items-center w-[8.75rem] h-[8.75rem] min-[390px]:w-[10rem] relative min-[390px]:h-[10rem] overflow-y-hidden bg-gradient-to-t rounded-2xl shadow-md to-[#9A7E57] from-[#665237]">
            <div
                className={`absolute top-0 translate-y-[-${height}px] scale-80 min-[390px]:scale-100`}
            >
                <img
                    className="drop-shadow-lg"
                    src={`/images/products/${img}`}
                />
            </div>
            <div className="absolute bottom-2 flex flex-col items-center space-y-2 w-full">
                <div className="bg-transparent backdrop-blur-[3px] ">
                    <h1 className="text-[1.05rem] min-[390px]:text-[1.2rem] text-primary text-shadow-md text-center leading-5 ">
                        {name}
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center gap-4">
                        <p className="text-primary min-[390px]:text-[0.85rem] text-[0.75rem] font-light text-white/70 text-shadow-sm">
                            ₱ {price}
                        </p>
                        <p className="text-primary min-[390px]:text-[0.7rem] text-[0.6rem] font-extralight text-white/50 text-shadow-md">
                            Available : {quantity}
                        </p>
                    </div>
                    {type && (
                        <p className="text-white/50 min-[390px]:text-[0.65rem] text-[0.6rem] mb-[-5px] ">
                            {type}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cuisine;

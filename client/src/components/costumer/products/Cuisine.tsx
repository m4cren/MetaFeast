import { useState } from "react";
import { CuisineDetailProps as CuisineProps } from "../../../types/types";

const Cuisine: React.FC<CuisineProps> = ({
    img,
    name,
    price,
    quantity,
    type,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className="active:scale-95 active:opacity-95 transition duration-150 [box-shadow:2px_2px_3px_rgba(0,0,0,0.25)_inset] flex flex-col items-center w-[8.75rem] h-[8.75rem] min-[390px]:w-[10rem] min-[390px]:h-[10rem]  min-[580px]:w-[18rem] min-[580px]:h-[18rem] overflow-y-hidden brown-gradient-to-b rounded-xl shadow-md ">
            {isLoading && (
                <div className="img-loading [box-shadow:2px_2px_3px_rgba(0,0,0,0.25)_inset]"></div>
            )}
            <div className={``}>
                <img
                    className={`${isLoading && "hidden"} drop-shadow-lg w-[7rem] min-[390px]:w-[8rem] aspect-square min-[580px]:w-[14rem]`}
                    src={`/images/products/${img}`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div
                className={`${isLoading && "hidden"} -mt-4 min-[390px]:-mt-5  flex flex-col items-center space-y-[0.5px] min-[390px]:space-y-[4px] w-full`}
            >
                <div className="bg-transparent backdrop-blur-[3px] ">
                    <h1
                        className={`${name.length <= 16 ? "text-[0.95rem] min-[580px]:text-[1.5rem] min-[390px]:text-[1.1rem]" : name.length <= 18 ? "text-[0.85rem] min-[390px]:text-[0.95rem] min-[580px]:text-[1.5rem]" : name.length <= 20 && "text-[0.8rem] min-[390px]:text-[0.85rem] min-[580px]:text-[1.4rem]"}  text-primary text-shadow-md text-center leading-5 `}
                    >
                        {name}
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center gap-4">
                        <p className="text-primary min-[580px]:text-[1.4rem] min-[390px]:text-[0.85rem] text-[0.75rem] font-light text-[rgba(255,255,255,0.7)] text-shadow-sm">
                            ₱ {price}
                        </p>
                        <p className="text-primary min-[390px]:text-[0.7rem] min-[580px]:text-[1.05rem] text-[0.6rem] font-extralight text-[rgba(255,255,255,0.5)] text-shadow-md">
                            Available : {quantity}
                        </p>
                    </div>
                    {type && (
                        <p className="text-[rgba(255,255,255,0.5)] min-[390px]:text-[0.65rem] text-[0.6rem] mb-[-5px] ">
                            {type}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cuisine;

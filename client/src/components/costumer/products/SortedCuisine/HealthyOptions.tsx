import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const HealthyOptions = () => {
    const healthy_products: CuisineDetailProps[] = [
        {
            name: "Greek Yougart",
            img: "greek_yougart.png",
            quantity: 19,
            price: 189,
            height: 30,
        },
        {
            name: "Berry Bliss",
            img: "berry_bliss.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
    ];
    return (
        <>
            {healthy_products.map(
                ({ name, img, quantity, price, height }, index) => (
                    <Cuisine
                        key={index}
                        name={name}
                        img={img}
                        quantity={quantity}
                        price={price}
                        height={height}
                    />
                ),
            )}
        </>
    );
};

export default HealthyOptions;

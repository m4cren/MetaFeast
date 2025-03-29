import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const Pastries = () => {
    const pastries_products: CuisineDetailProps[] = [
        {
            name: "Croissants",
            img: "croissants.png",
            quantity: 19,
            price: 189,
            height: 20,
        },
        {
            name: "Waffle",
            img: "waffle.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
    ];
    return (
        <>
            {pastries_products.map(
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

export default Pastries;

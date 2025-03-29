import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const SoupsAndSalads = () => {
    const soups_salads_products: CuisineDetailProps[] = [
        {
            name: "Velouté of White Asparagus",
            img: "veloute.png",
            quantity: 19,
            price: 189,
            height: 30,
        },
        {
            name: "Vichyssoise",
            img: "vichyssoise.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
        {
            name: "Prosciutto Wrapped Figs",
            img: "prosciutto_wrapped.png",
            quantity: 19,
            price: 189,
            height: 30,
        },
    ];
    return (
        <>
            {soups_salads_products.map(
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

export default SoupsAndSalads;

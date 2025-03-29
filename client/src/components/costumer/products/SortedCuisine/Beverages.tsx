import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const Beverages = () => {
    const beverage_products: CuisineDetailProps[] = [
        {
            name: "Rose & Lychee",
            img: "rose_and_lychee.png",
            quantity: 19,
            price: 189,
            height: 27,
            type: "Non-Alcoholic",
        },
        {
            name: "Iced Matcha",
            img: "sugar_free_mint.png",
            quantity: 19,
            price: 189,
            height: 26,
            type: "Non-Alcoholic",
        },
        {
            name: "Honey-Fermented",
            img: "honey_fermented.png",
            quantity: 19,
            price: 189,
            height: 40,
            type: "Non-Alcoholic",
        },
        {
            name: "Rosemary Paloma",
            img: "rosemary_paloma.png",
            quantity: 19,
            price: 189,
            height: 30,
            type: "Cocktails",
        },
        {
            name: "Hibiscus ",
            img: "hibiscus_cocktail.png",
            quantity: 19,
            price: 189,
            height: 27,
            type: "Cocktails",
        },
        {
            name: "Cherry Blossom ",
            img: "cherry_blossom.png",
            quantity: 19,
            price: 189,
            height: 32,
            type: "Cocktails",
        },
        {
            name: "Red Wine",
            img: "red_wine.png",
            quantity: 19,
            price: 189,
            height: 29,
            type: "Champagne",
        },
        {
            name: "White Wine",
            img: "white_wine.png",
            quantity: 19,
            price: 189,
            height: 29,
            type: "Champagne",
        },
    ];

    return (
        <>
            {beverage_products.map(
                ({ name, img, quantity, price, height, type }, index) => (
                    <Cuisine
                        key={index}
                        name={name}
                        img={img}
                        quantity={quantity}
                        price={price}
                        height={height}
                        type={type}
                    />
                ),
            )}
        </>
    );
};

export default Beverages;

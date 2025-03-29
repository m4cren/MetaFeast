import React from "react";
import Cuisine from "../Cuisine";
import { CuisineDetailProps } from "../../../../types/types";

const SavoryBreakfast = () => {
    const savory_breakfast_products: CuisineDetailProps[] = [
        {
            name: "Salmon Bagel",
            img: "smoke_salmon.png",
            quantity: 19,
            price: 189,
            height: 20,
        },
        {
            name: "Avocado Bacon",
            img: "avocado_bacon.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
        {
            name: "Sushi",
            img: "sushi.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
    ];
    return (
        <>
            {savory_breakfast_products.map(
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

export default SavoryBreakfast;

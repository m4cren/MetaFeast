import React from "react";
import Cuisine from "../Cuisine";
import { CuisineDetailProps } from "../../../../types/types";

const Desserts = () => {
    const desserts_products: CuisineDetailProps[] = [
        {
            name: "Pistachio Cheesecake",
            price: 299,
            quantity: 25,
            img: "pistachio_cheesecake.png",
            height: 35,
        },
        {
            name: "Miso Caramel Pot de Crème",
            price: 299,
            quantity: 25,
            img: "miso_caramel.png",
            height: 35,
        },
        {
            name: "Chocolate Mousse Verrine",
            price: 299,
            quantity: 25,
            img: "chocolate_mousse.png",
            height: 33,
        },
        {
            name: "Raspberry Glazed Cake",
            price: 299,
            quantity: 25,
            img: "raspberry_glazed_cake.png",
            height: 38,
        },
        {
            name: "Brown Sugar Pavlovas",
            price: 299,
            quantity: 25,
            img: "brown_sugar_pavlovas.png",
            height: 35,
        },
        {
            name: "Salted Caramel Chocolate ",
            price: 299,
            quantity: 25,
            img: "salted_caramel.png",
            height: 27,
        },
        {
            name: "Coffee Tiramisu Cake",
            price: 299,
            quantity: 25,
            img: "coffee_tiramisu.png",
            height: 33,
        },
    ];

    return (
        <>
            {desserts_products.map(
                ({ name, img, price, quantity, height }, index) => (
                    <Cuisine
                        key={index}
                        name={name}
                        img={img}
                        price={price}
                        quantity={quantity}
                        height={height}
                    />
                ),
            )}
        </>
    );
};

export default Desserts;

import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const Appetizers = () => {
    const appetizers_products: CuisineDetailProps[] = [
        {
            name: "Pan-Seared Cod",
            img: "pan_seared_cod.png",
            quantity: 19,
            price: 189,
            height: 20,
        },
        {
            name: "Kombu-Cured Bream",
            img: "kombu_cured.png",
            quantity: 19,
            price: 189,
            height: 26,
        },
        {
            name: "Shrimp & Crispy Vegetable",
            img: "shrimp_and_crispy.png",
            quantity: 19,
            price: 189,
            height: 40,
        },
        {
            name: "Foie Gras Terrine",
            img: "foie_gras.png",
            quantity: 19,
            price: 189,
            height: 30,
        },
        {
            name: "Caesar Salad Croquettes",
            img: "caesar_salad.png",
            quantity: 19,
            price: 189,
            height: 35,
        },
        {
            name: "Chargrilled Octopus",
            img: "chargrilled_octopus.png",
            quantity: 19,
            price: 189,
            height: 32,
        },
    ];
    return (
        <>
            {appetizers_products.map(
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

export default Appetizers;

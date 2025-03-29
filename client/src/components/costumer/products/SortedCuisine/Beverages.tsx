import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";
import Cuisine from "../Cuisine";

const Beverages = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    console.log(setSelectedCuisine);
    const beverage_products: CuisineDetailProps[] = [
        {
            name: "Rose & Lychee",
            img: "rose_and_lychee.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Rose & Lychee",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Rose & Lychee",
            )?.food_price,
            height: 30,
            type: "Non-Alcoholic",
        },
        {
            name: "Iced Matcha",
            img: "sugar_free_mint.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Iced Matcha",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Iced Matcha",
            )?.food_price,
            height: 30,
            type: "Non-Alcoholic",
        },
        {
            name: "Honey-Fermented",
            img: "honey_fermented.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Honey-Fermented",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Honey-Fermented",
            )?.food_price,
            height: 30,
            type: "Non-Alcoholic",
        },
        {
            name: "Rosemary Paloma",
            img: "rosemary_paloma.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Rosemary Paloma",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Rosemary Paloma",
            )?.food_price,
            height: 30,
            type: "Cocktails",
        },
        {
            name: "Hibiscus",
            img: "hibiscus_cocktail.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Hibiscus",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Hibiscus",
            )?.food_price,
            height: 30,
            type: "Cocktails",
        },
        {
            name: "Cherry Blossom",
            img: "cherry_blossom.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Cherry Blossom",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Cherry Blossom",
            )?.food_price,
            height: 30,
            type: "Cocktails",
        },
        {
            name: "Red Wine",
            img: "red_wine.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Red Wine",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Red Wine",
            )?.food_price,
            height: 30,
            type: "Champagne",
        },
        {
            name: "White Wine",
            img: "white_wine.png",
            quantity: productDetails.find(
                (product) => product.food_name === "White Wine",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "White Wine",
            )?.food_price,
            height: 30,
            type: "Champagne",
        },
    ];

    return (
        <>
            {beverage_products.map(
                ({ name, img, quantity, price, height, type }, index) => (
                    <div key={index} onClick={() => setSelectedCuisine(name)}>
                        <Cuisine
                            name={name}
                            img={img}
                            quantity={quantity}
                            price={price}
                            height={height}
                            type={type}
                        />
                    </div>
                ),
            )}
        </>
    );
};

export default Beverages;

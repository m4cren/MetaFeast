import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";
import Cuisine from "../Cuisine";

const SoupsAndSalads = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const soups_salads_products: CuisineDetailProps[] = [
        {
            name: "White Asparagus",
            img: "veloute.png",
            quantity: productDetails.find(
                (product) => product.food_name === "White Asparagus",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "White Asparagus",
            )?.food_price,
            height: 30,
        },
        {
            name: "Vichyssoise",
            img: "vichyssoise.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Vichyssoise",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Vichyssoise",
            )?.food_price,
            height: 30,
        },
        {
            name: "Prosciutto Figs",
            img: "prosciutto_wrapped.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Prosciutto Figs",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Prosciutto Figs",
            )?.food_price,
            height: 30,
        },
    ];
    return (
        <>
            {soups_salads_products.map(
                ({ name, img, quantity, price, height }, index) => (
                    <div key={index} onClick={() => setSelectedCuisine(name)}>
                        <Cuisine
                            name={name}
                            img={img}
                            quantity={quantity}
                            price={price}
                            height={height}
                        />
                    </div>
                ),
            )}
        </>
    );
};

export default SoupsAndSalads;

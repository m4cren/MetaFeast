import Cuisine from "../Cuisine";
import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";

const SavoryBreakfast = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const savory_breakfast_products: CuisineDetailProps[] = [
        {
            name: "Salmon Bagel",
            img: "smoke_salmon.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Salmon Bagel",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Salmon Bagel",
            )?.food_price,
            height: 20,
        },
        {
            name: "Avocado Bacon",
            img: "avocado_bacon.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Avocado Bacon",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Avocado Bacon",
            )?.food_price,
            height: 30,
        },
        {
            name: "Sushi",
            img: "sushi.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Sushi",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Sushi",
            )?.food_price,
            height: 30,
        },
    ];
    return (
        <>
            {savory_breakfast_products.map(
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

export default SavoryBreakfast;

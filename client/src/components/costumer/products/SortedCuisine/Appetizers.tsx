import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";
import { SelectedCuisineProps } from "../../../../types/types";

const Appetizers = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const appetizers_products: CuisineDetailProps[] = [
        {
            name: "Pan-Seared Cod",
            img: "pan_seared_cod.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Pan-Seared Cod",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Pan-Seared Cod",
            )?.food_price,
            height: 20,
        },
        {
            name: "Kombu-Cured Bream",
            img: "kombu_cured.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Kombu-Cured Bream",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Kombu-Cured Bream",
            )?.food_price,
            height: 30,
        },
        {
            name: "Shrimp & Vegetable",
            img: "shrimp_and_crispy.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Shrimp & Vegetable",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Shrimp & Vegetable",
            )?.food_price,
            height: 30,
        },
        {
            name: "Foie Gras Terrine",
            img: "foie_gras.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Foie Gras Terrine",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Foie Gras Terrine",
            )?.food_price,
            height: 30,
        },
        {
            name: "Caesar Salad",
            img: "caesar_salad.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Caesar Salad",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Caesar Salad",
            )?.food_price,
            height: 30,
        },
        {
            name: "Chargrilled Octopus",
            img: "chargrilled_octopus.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Chargrilled Octopus",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Chargrilled Octopus",
            )?.food_price,
            height: 30,
        },
    ];
    return (
        <>
            {appetizers_products.map(
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

export default Appetizers;

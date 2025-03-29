import Cuisine from "../Cuisine";
import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";

const Desserts = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const desserts_products: CuisineDetailProps[] = [
        {
            name: "Pistachio Cheesecake",
            quantity: productDetails.find(
                (product) => product.food_name === "Pistachio Cheesecake",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Pistachio Cheesecake",
            )?.food_price,
            img: "pistachio_cheesecake.png",
            height: 30,
        },
        {
            name: "Miso Caramel",
            quantity: productDetails.find(
                (product) => product.food_name === "Miso Caramel",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Miso Caramel",
            )?.food_price,
            img: "miso_caramel.png",
            height: 30,
        },
        {
            name: "Chocolate Mousse",
            quantity: productDetails.find(
                (product) => product.food_name === "Chocolate Mousse",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Chocolate Mousse",
            )?.food_price,
            img: "chocolate_mousse.png",
            height: 30,
        },
        {
            name: "Raspberry Cake",
            quantity: productDetails.find(
                (product) => product.food_name === "Raspberry Cake",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Raspberry Cake",
            )?.food_price,
            img: "raspberry_glazed_cake.png",
            height: 30,
        },
        {
            name: "Brown Pavlovas",
            quantity: productDetails.find(
                (product) => product.food_name === "Brown Pavlovas",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Brown Pavlovas",
            )?.food_price,
            img: "brown_sugar_pavlovas.png",
            height: 30,
        },
        {
            name: "Salted Caramel",
            quantity: productDetails.find(
                (product) => product.food_name === "Salted Caramel",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Salted Caramel",
            )?.food_price,
            img: "salted_caramel.png",
            height: 30,
        },
        {
            name: "Coffee Tiramisu",
            quantity: productDetails.find(
                (product) => product.food_name === "Coffee Tiramisu",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Coffee Tiramisu",
            )?.food_price,
            img: "coffee_tiramisu.png",
            height: 30,
        },
    ];

    return (
        <>
            {desserts_products.map(
                ({ name, img, price, quantity, height }, index) => (
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

export default Desserts;

import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";
import Cuisine from "../Cuisine";

const MainCourse = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const main_course_products: CuisineDetailProps[] = [
        {
            name: "Sirloin Steak",
            quantity: productDetails.find(
                (product) => product.food_name === "Sirloin Steak",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Sirloin Steak",
            )?.food_price,
            img: "sirloin_steak.png",
            height: 20,
        },
        {
            name: "Salmon Fillet",
            quantity: productDetails.find(
                (product) => product.food_name === "Salmon Fillet",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Salmon Fillet",
            )?.food_price,
            img: "salmon_fillet.png",
            height: 30,
        },
        {
            name: "Wagyu Yakiniku",
            quantity: productDetails.find(
                (product) => product.food_name === "Wagyu Yakiniku",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Wagyu Yakiniku",
            )?.food_price,
            img: "wagyu_yakiniku.png",
            height: 30,
        },
        {
            name: "Grilled Octopus",
            quantity: productDetails.find(
                (product) => product.food_name === "Grilled Octopus",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Grilled Octopus",
            )?.food_price,
            img: "grilled_octopus.png",
            height: 30,
        },
        {
            name: "King Crab",
            quantity: productDetails.find(
                (product) => product.food_name === "King Crab",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "King Crab",
            )?.food_price,
            img: "butter_poached.png",
            height: 30,
        },
        {
            name: "Roast Lamb",
            quantity: productDetails.find(
                (product) => product.food_name === "Roast Lamb",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Roast Lamb",
            )?.food_price,
            img: "garlic_fennel.png",
            height: 30,
        },
        {
            name: "Curried Cod",
            quantity: productDetails.find(
                (product) => product.food_name === "Curried Cod",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Curried Cod",
            )?.food_price,
            img: "curried_cod.png",
            height: 30,
        },
        {
            name: "Venison Steak",
            quantity: productDetails.find(
                (product) => product.food_name === "Venison Steak",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Venison Steak",
            )?.food_price,
            img: "venison_steak.png",
            height: 30,
        },
        {
            name: "Pork Chop",
            quantity: productDetails.find(
                (product) => product.food_name === "Pork Chop",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Pork Chop",
            )?.food_price,
            img: "honey_butter_pork.png",
            height: 30,
        },
    ];

    return (
        <>
            {main_course_products.map(
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

export default MainCourse;

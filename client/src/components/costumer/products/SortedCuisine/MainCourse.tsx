import { CuisineDetailProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const MainCourse = () => {
    const main_course_products: CuisineDetailProps[] = [
        {
            name: "Sirlion Steak",
            price: 299,
            quantity: 25,
            img: "sirloin_steak.png",
            height: 20,
        },
        {
            name: "Salmon Fillet",
            price: 299,
            quantity: 25,
            img: "salmon_fillet.png",
            height: 25,
        },
        {
            name: "Wagyu Yakiniku",
            price: 299,
            quantity: 25,
            img: "wagyu_yakiniku.png",
            height: 25,
        },
        {
            name: "Grilled Octopus",
            price: 299,
            quantity: 25,
            img: "grilled_octopus.png",
            height: 30,
        },
        {
            name: "King Crab",
            price: 299,
            quantity: 25,
            img: "butter_poached.png",
            height: 30,
        },
        {
            name: "Roast Lamb",
            price: 299,
            quantity: 25,
            img: "garlic_fennel.png",
            height: 27,
        },
        {
            name: "Curried Cod",
            price: 299,
            quantity: 25,
            img: "curried_cod.png",
            height: 27,
        },
        {
            name: "Venison Steak",
            price: 299,
            quantity: 25,
            img: "venison_steak.png",
            height: 30,
        },
        {
            name: "Pork Chop",
            price: 299,
            quantity: 25,
            img: "honey_butter_pork.png",
            height: 30,
        },
    ];

    return (
        <>
            {main_course_products.map(
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

export default MainCourse;

import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";
import Cuisine from "../Cuisine";

const Pastries = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const pastries_products: CuisineDetailProps[] = [
        {
            name: "Croissants",
            img: "croissants.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Croissants",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Croissants",
            )?.food_price,
            height: 20,
        },
        {
            name: "Waffle",
            img: "waffle.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Waffle",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Waffle",
            )?.food_price,
            height: 30,
        },
    ];
    return (
        <>
            {pastries_products.map(
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

export default Pastries;

import {
    CuisineDetailProps,
    SelectedCuisineProps,
} from "../../../../types/types";
import Cuisine from "../Cuisine";

const HealthyOptions = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const healthy_products: CuisineDetailProps[] = [
        {
            name: "Greek Yougart",
            img: "greek_yougart.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Greek Yougart",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Greek Yougart",
            )?.food_price,
            height: 30,
        },
        {
            name: "Berry Bliss",
            img: "berry_bliss.png",
            quantity: productDetails.find(
                (product) => product.food_name === "Berry Bliss",
            )?.quantity,
            price: productDetails.find(
                (product) => product.food_name === "Berry Bliss",
            )?.food_price,
            height: 30,
        },
    ];
    return (
        <>
            {healthy_products.map(
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

export default HealthyOptions;

import { SelectedCuisineProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const HealthyOptions = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const healthy_products = productDetails.filter(
        (product) => product.category === "Healthy Options",
    );
    return (
        <>
            {healthy_products.map(
                ({ food_name, img, quantity, food_price }, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedCuisine(food_name)}
                    >
                        <Cuisine
                            name={food_name}
                            img={img}
                            quantity={quantity}
                            price={food_price}
                        />
                    </div>
                ),
            )}
        </>
    );
};

export default HealthyOptions;

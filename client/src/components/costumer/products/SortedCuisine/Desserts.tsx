import Cuisine from "../Cuisine";
import { SelectedCuisineProps } from "../../../../types/types";

const Desserts = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const desserts_products = productDetails.filter(
        (product) => product.category === "Desserts",
    );

    return (
        <>
            {desserts_products.map(
                ({ food_name, img, food_price, quantity }, index) => (
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

export default Desserts;

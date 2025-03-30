import { SelectedCuisineProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const Beverages = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const beverage_products = productDetails.filter(
        (product) => product.category === "Beverages",
    );
    return (
        <>
            {beverage_products.map(
                ({ food_name, img, quantity, food_price, type }, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedCuisine(food_name)}
                    >
                        <Cuisine
                            name={food_name}
                            img={img}
                            quantity={quantity}
                            price={food_price}
                            type={type}
                        />
                    </div>
                ),
            )}
        </>
    );
};

export default Beverages;

import Cuisine from "../Cuisine";
import { SelectedCuisineProps } from "../../../../types/types";

const SavoryBreakfast = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const savory_breakfast_products = productDetails.filter(
        (product) => product.category === "Savory Breakfast",
    );
    return (
        <>
            {savory_breakfast_products.map(
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

export default SavoryBreakfast;

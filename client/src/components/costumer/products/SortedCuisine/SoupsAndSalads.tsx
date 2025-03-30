import { SelectedCuisineProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const SoupsAndSalads = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const soups_salads_products = productDetails.filter(
        (product) => product.category === "Soups & Salads",
    );
    return (
        <>
            {soups_salads_products.map(
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

export default SoupsAndSalads;

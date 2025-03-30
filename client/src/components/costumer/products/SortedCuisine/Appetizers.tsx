import Cuisine from "../Cuisine";
import { SelectedCuisineProps } from "../../../../types/types";

const Appetizers = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const appetizers_products = productDetails.filter(
        (product) => product.category === "Appetizers",
    );
    return (
        <>
            {appetizers_products.map(
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

export default Appetizers;

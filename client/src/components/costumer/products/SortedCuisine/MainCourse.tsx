import { SelectedCuisineProps } from "../../../../types/types";
import Cuisine from "../Cuisine";

const MainCourse = ({
    setSelectedCuisine,
    productDetails,
}: SelectedCuisineProps) => {
    const main_course_products = productDetails.filter(
        (product) => product.category === "Main Course",
    );

    return (
        <>
            {main_course_products.map(
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

export default MainCourse;

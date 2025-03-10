import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";

const CostumerScene = lazy(() => import("./scenes/CostumerScene"));

const MainCostumer = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {isLoading && <LoadingScreen />}
            <div className="w-full h-screen fixed">
                <Suspense fallback={<LoadingScreen />}>
                    <CostumerScene />
                </Suspense>
            </div>
        </>
    );
};

export default MainCostumer;

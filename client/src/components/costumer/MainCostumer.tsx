import LoadingScreen from "../LoadingScreen";

const MainCostumer = () => {
    return (
        <>
            <div className="w-full h-screen fixed">
                <LoadingScreen />
            </div>
        </>
    );
};

export default MainCostumer;

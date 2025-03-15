import "../loading.css";

const LoadingScreen = () => {
    return (
        <div className="h-screen w-screen  flex flex-col items-center justify-center overflow-hidden bg-[#161616] ">
            <h1 className="text-[3.8vh] text-[#333] opacity-75 animate-pulse md:text-[7vh] title-loading">
                Cooking in progress..
            </h1>
        </div>
    );
};

export default LoadingScreen;

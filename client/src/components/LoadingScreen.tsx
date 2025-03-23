import "../loading.css";

interface LoadingProps {
    isLoading: boolean;
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen = ({ isLoading, setIsStart }: LoadingProps) => {
    return (
        <div className="h-screen w-screen  flex flex-col items-center justify-center overflow-hidden bg-[#161616] fixed z-10">
            {isLoading ? (
                <h1 className="text-[3.8vh] text-[#333] opacity-75 animate-pulse md:text-[7vh] title-loading">
                    Cooking in progress..
                </h1>
            ) : (
                <button
                    className="text-white/90 text-3xl"
                    onClick={() => setIsStart(true)}
                >
                    Start
                </button>
            )}
        </div>
    );
};

export default LoadingScreen;

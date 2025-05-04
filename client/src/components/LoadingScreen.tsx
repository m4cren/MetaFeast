import "../styles/loading.css";

interface LoadingProps {
    isLoading: boolean;
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen = ({ isLoading, setIsStart }: LoadingProps) => {
    return (
        <div className="h-screen w-screen  flex flex-col items-center justify-center fixed z-10  brown-gradient-to-b ">
            {isLoading ? (
                <div className="flex flex-col items-center ">
                    <h1 className="text-primary text-4xl min-[390px]:text-5xl min-[580px]:text-[4.5rem] font-medium title-animation">
                        Metafeast
                    </h1>
                    <span className="loader"></span>
                </div>
            ) : (
                <button
                    className="text-primary text-5xl min-[580px]:text-7xl min-[390px]:text-6xl font-medium tracking-wider  py-50 px-30 active:scale-110 active:opacity-65 transition duration-100"
                    onClick={() => setIsStart(true)}
                >
                    Start
                </button>
            )}
        </div>
    );
};

export default LoadingScreen;

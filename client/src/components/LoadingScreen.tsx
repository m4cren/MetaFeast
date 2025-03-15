import "../loading.css";

const LoadingScreen = () => {
    return (
        <div className="h-screen w-screen  flex flex-col items-center justify-center overflow-hidden bg-[#161616] ">
            <h1 className="text-[3.8vh] text-[#333] opacity-75 animate-pulse mb-40 md:text-[7vh] title-loading">
                Cooking in progress..
            </h1>

            <div className="fixed top-1/2 left-[45%] translate-y-[-50%] translate-x-[-50%] md:scale-40 md:mt-20">
                <div
                    id="cooking"
                    className="relative w-[75vh] h-[75vh] overflow-hidden"
                >
                    {/* Bubbles */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`bubble`} />
                    ))}

                    <div id="area" className="area h-1/2 w-1/2">
                        <div id="sides" className="sides">
                            <div id="handle" className="handle" />
                            <div id="pan" className="pan" />
                        </div>

                        <div id="pancake" className="pancake">
                            <div id="pastry" className="pastry" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;

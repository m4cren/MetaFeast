const PhaseOne = () => {
    return (
        <div className="flex flex-col border-1 border-white/10 rounded-xl h-[50vh] items-center justify-center w-[90vw] gap-12 bg-white/5 backdrop-blur-[5px]">
            <h1 className="text-white text-2xl font-bold">
                What do we want to call you
            </h1>

            <form className="w-full flex justify-center flex-col items-center gap-10">
                <input
                    type="text"
                    className="border-1 h-10 w-[90%] outline-none text-white text-center rounded-2xl"
                />
                <button className="text-white border-1 p-2 rounded-2xl">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PhaseOne;

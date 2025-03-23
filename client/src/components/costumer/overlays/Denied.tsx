const Denied = () => {
    return (
        <div className="fixed z-10 w-full h-screen bg-black/40 flex justify-center items-center ">
            <div className="w-[80vw] h-[30rem] bg-white/90 rounded-2xl flex items-center justify-center pop-up-animation">
                <h1 className="text-2xl text-center">
                    You have been declined by the owner
                </h1>
            </div>
        </div>
    );
};

export default Denied;

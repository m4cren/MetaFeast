interface DenyProps {
    denyMessage: string;
}

const Denied = ({ denyMessage }: DenyProps) => {
    return (
        <div className="fixed z-10 w-full h-screen bg-black/40 flex justify-center items-center ">
            <div className="flex-col gap-8 p-2 w-[80vw] h-[30rem] bg-white/90 rounded-2xl flex items-center justify-center pop-up-animation ">
                <h1 className="text-2xl text-center">
                    You have been denied by the owner
                </h1>
                <p className="text-center">{denyMessage}</p>
            </div>
        </div>
    );
};

export default Denied;

interface Props {
    isTransitioning: boolean;
}

const NavBar = ({ isTransitioning }: Props) => {
    return (
        <div
            className={`${isTransitioning && "translate-y-[-8rem]"} transition duration-500 fixed w-[79vw] h-[5.5rem] bg-white/10 backdrop-blur-2xl rounded-b-2xl top-0 flex flex-row justify-between px-10 items-center`}
        >
            <button className="bg-white/90 rounded-2xl text-black/80 flex justify-center p-2 h-[3rem] items-center font-bold text-lg cursor-pointer">
                Products
            </button>
            <button className="bg-white/90 rounded-2xl text-black/80 flex justify-center p-2 h-[3rem] items-center font-bold text-lg cursor-pointer">
                Pending Payment
            </button>
            <button className="bg-white/90 rounded-2xl text-black/80 flex justify-center p-2 h-[3rem] items-center font-bold text-lg cursor-pointer">
                Ratings
            </button>
        </div>
    );
};

export default NavBar;

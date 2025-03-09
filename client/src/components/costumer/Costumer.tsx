import CostumerScene from "./costumerScene/CostumerScene";
import PhaseOne from "./PhaseOne";

const Costumer = () => {
    return (
        <>
            <div className="fixed w-full h-screen z-[-1]">
                <CostumerScene />
            </div>
            <div className=" w-full h-screen flex items-center justify-center">
                <PhaseOne />
            </div>
        </>
    );
};

export default Costumer;

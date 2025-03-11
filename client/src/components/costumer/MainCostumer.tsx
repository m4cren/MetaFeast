import { useEffect, useState } from "react";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

const MainCostumer = () => {
    const [phase, setPhase] = useState<number>(0);
    console.log(phase, setPhase);

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        if (get_phase === "phase_1") {
            setPhase(1);
        } else {
            setPhase(0);
        }
    }, []);
    return (
        <>
            <div>
                {phase === 0 && <GetName setPhase={setPhase} />}
                {phase === 1 && <SelectTable setPhase={setPhase} />}
            </div>
        </>
    );
};

export default MainCostumer;

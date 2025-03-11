import { useCallback, useEffect, useState } from "react";
import GetName from "./GetName";
import SelectTable from "./SelectTable";

const MainCostumer = () => {
    const [phase, setPhase] = useState<number>(0);

    useEffect(() => {
        let get_phase = localStorage.getItem("current_phase");

        if (get_phase === "phase_1") {
            setPhase(1);
        } else {
            setPhase(0);
        }
    }, []);

    const stableSetPhase = useCallback<
        React.Dispatch<React.SetStateAction<number>>
    >((value) => {
        setPhase(value);
    }, []);
    return (
        <>
            <div>
                {phase === 0 && <GetName setPhase={stableSetPhase} />}
                {phase === 1 && <SelectTable setPhase={stableSetPhase} />}
            </div>
        </>
    );
};

export default MainCostumer;

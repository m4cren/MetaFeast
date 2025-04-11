import { useEffect, useState } from "react";

const useCostumerName = () => {
    const [costumerName, setCostumerName] = useState<string>("");

    useEffect(() => {
        const current_costumer_name = localStorage.getItem("costumer_name");

        if (current_costumer_name) {
            setCostumerName(current_costumer_name);
        }
    }, []);

    return { costumerName, setCostumerName };
};

export default useCostumerName;

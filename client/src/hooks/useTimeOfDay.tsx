import { useState, useEffect } from "react";

const getTimeOfDay = () => {
    const now = new Date();
    let hours = now.getHours();

    if (hours > 5) return "Araw";
    if (hours > 17) return "Gabi";

    return "wala";
};

const useTimeOfDay = () => {
    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    return timeOfDay;
};

export default useTimeOfDay;

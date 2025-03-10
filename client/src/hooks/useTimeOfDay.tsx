import { useState, useEffect } from "react";

const getTimeOfDay = () => {
    const now = new Date();
    let hours = now.getHours();

    if (hours < 6) return "Madaling Araw";
    if (hours < 12) return "Umaga";
    if (hours < 18) return "Hapon";
    if (hours < 20) return "Gabi na";
    return "Maghahating Gabi na";
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

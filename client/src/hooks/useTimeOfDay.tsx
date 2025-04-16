import { useState, useEffect } from "react";

const getTimeOfDay = () => {
    const now = new Date();
    let hours = now.getHours();

    if (hours > 5) return "Araw";
    if (hours > 17) return "Gabi";

    return "wala";
};

const useTimeOfDay = (): {
    timeOfDay: string;
    seconds: string;
    minute: string;
    hours: number;
    amPm: string;
} => {
    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 1000 * 60);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const intervalTime = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalTime);
    }, []);

    const hours = currentTime.getHours() % 12 || 12;
    const minute = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const amPm = currentTime.getHours() >= 12 ? "pm" : "am";

    return { timeOfDay, seconds, minute, hours, amPm };
};

export default useTimeOfDay;

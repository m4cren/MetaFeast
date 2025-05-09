import { SetStateAction, useEffect, useState } from "react";
import layout from "../../../styles/layouts/eating.module.css";
import { Scroll } from "lucide-react";
import Order from "./Order";
import useTimeOfDay from "../../../hooks/useTimeOfDay";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import { triviaMessage } from "../../../types/types";
import { useSocket } from "../../../contexts/SocketContext";
interface EatingProps {
    setPhase: React.Dispatch<SetStateAction<number>>;
    setCamPos: React.Dispatch<SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<SetStateAction<[number, number, number]>>;
}

const Eating = ({ setPhase, setCamPos, setCamRot }: EatingProps) => {
    const socket = useSocket();
    const kelvinToCelius = (kelvin: number) => {
        return kelvin - 273.15;
    };
    const name = localStorage.getItem("costumer_name");
    const [isOrderMore, setIsOrderMore] = useState<boolean>(false);
    const [isBillingConfirmation, setIsBillingConfirmation] =
        useState<boolean>(false);
    const [weatherApiKey, setWeatherApiKey] = useState<string>("");

    const [isPromptClose, setIsPromptClose] = useState<boolean>(false);
    const { server } = useServerAddress();
    const { seconds, minute, hours, amPm, day } = useTimeOfDay();

    const [temperature, setTemperature] = useState<number>(0);

    let second_angle = Number(seconds) * 6;
    let minute_angle = Number(minute) * 6;
    let hours_angle = Number(hours) * 30;

    const [triviaIndex, setTriviaIndex] = useState<number>(0);
    const getWeatherApiKey = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await axios.get(
                `${server}/costumer/get-weather-api-key`,
                {
                    headers,
                    withCredentials: false,
                },
            );

            setWeatherApiKey(response.data.weather_api_key);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherApiKey();

        const intervalId = setInterval(() => {
            setTriviaIndex((prev) => (prev + 1) % triviaMessage.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // const cityID = 1712027; //Dolores Quezon PH
        const cityID = 1688812; //SanPabloCIty
        const request_weather = async (cityId: number) => {
            try {
                if (weatherApiKey) {
                    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${weatherApiKey}`;

                    const response = await axios.get(url);
                    console.dir(response);
                    const kelvinTemp = response.data.main.temp;

                    setTemperature(kelvinToCelius(kelvinTemp));
                }
            } catch (error) {
                console.log(error);
            }
        };

        request_weather(cityID);
    }, [weatherApiKey]);

    return isOrderMore ? (
        <div>
            <Order
                setCamPos={setCamPos}
                setCamRot={setCamRot}
                setPhase={setPhase}
                isOrderMore={isOrderMore}
                setIsOrderMore={setIsOrderMore}
            />
        </div>
    ) : (
        <div
            className={`${layout.main} fixed w-full h-screen backdrop-blur-[12px] [-webkit-backdrop-blur:(12px)]`}
        >
            {isBillingConfirmation && (
                <div
                    className={
                        " fixed flex items-center justify-center z-20 w-full h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-[15px] [-webkit-backdrop-blur:(15px)] "
                    }
                >
                    <div
                        className={`${isPromptClose && "pop-close-animation"} pop-up-animation flex flex-col items-center justify-center gap-4 min-[580px]:gap-10 w-[90%] min-[390px]:w-[85%] h-[14rem] min-[580px]:h-[18rem] brown-gradient-to-b rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="flex flex-col items-center gap-4 min-[580px]:gap-6">
                            {" "}
                            <i className="text-primary opacity-80 min-[580px]:scale-150">
                                <Scroll size={40} />
                            </i>
                            <h1 className="text-primary min-[580px]:text-[1.9rem] text-shadow-md text-[1.3rem] min-[390px]:text-[1.4rem] text-center leading-6">
                                Please confirm if you’ve completed your meal.
                            </h1>
                        </div>

                        <div className="flex flex-row items-center gap-2 min-[580px]:gap-4">
                            <button
                                onClick={() => {
                                    setIsPromptClose(true);
                                    setTimeout(() => {
                                        setIsPromptClose(false);
                                        setIsBillingConfirmation(false);
                                    }, 200);
                                }}
                                style={{
                                    border: "1px solid rgba(255,255,255,0.2)",
                                }}
                                className="p-2 min-[580px]:text-[1.4rem] min-[580px]:py-3 min-[580px]:px-10 text-[0.9rem] min-[390px]:text-[1rem] px-2 min-[390px]:px-3  text-shadow-md  rounded-xl text-[rgba(255,255,255,0.7)] font-extralight [box-shadow:-1px_1px_3px_rgba(0,0,0,0.3)]"
                            >
                                No, I’m still eating
                            </button>
                            <button
                                onClick={() => {
                                    setIsPromptClose(true);
                                    setTimeout(() => {
                                        setIsPromptClose(false);
                                        setIsBillingConfirmation(false);
                                        setPhase(5);
                                        localStorage.setItem(
                                            "current_phase",
                                            "phase_5",
                                        );

                                        socket?.emit(
                                            "update-costumer-to-billing",
                                        );
                                    }, 200);
                                }}
                                className="p-2 min-[580px]:text-[1.4rem] min-[580px]:py-3 min-[580px]:px-20 text-[0.9rem] min-[390px]:text-[1rem] px-2 min-[390px]:px-3 green-gradient-to-b text-shadow-md  rounded-xl text-[rgba(255,255,255,0.7)] font-extralight [box-shadow:-1px_1px_3px_rgba(0,0,0,0.3)]"
                            >
                                Proceed to Billing
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`${layout.temperature} flex flex-col justify-end pl-6 min-[580px]:pl-12`}
            >
                <h1 className="text-primary font-light text-[1.65rem] min-[390px]:text-[1.8rem] min-[580px]:text-[3.1rem] text-shadow-md">
                    {temperature.toFixed(2)}
                    <span className="text-lightbrown">&deg;</span>c
                </h1>
                <p className="text-[rgba(255,255,255,0.7)] font-extralight text-[1rem] min-[580px]:text-[1.5em]  min-[390px]:text-[1.1rem] -mt-2 text-shadow-md">
                    San Pablo City
                </p>
            </div>

            <div
                className={`${layout.time} w-full flex flex-col items-center pt-10`}
            >
                <div className="aspect-square scale-90 min-[390px]:scale-100 min-[580px]:scale-150 flex items-center justify-center">
                    <div
                        style={{ border: "3px solid #9a7e57" }}
                        className="relative overflow-hidden rounded-full min-[580px]:mt-15  shadow-xl  bg-[rgba(0,0,0,0.35)] [box-shadow:0_0_15px_rgba(0,0,0,0.7)] w-[14rem] h-[14rem] min-[390px]:w-[17rem] min-[390px]:h-[17rem] min-[580px]:w-[21rem] min-[580px]:h-[21rem]  flex"
                    >
                        <span className="w-3 h-3 bg-lightbrown [box-shadow:0_0_8px_rgba(0,0,0,6)] z-10 drop-shadow-md absolute rounded-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
                        <span
                            style={{ transform: `rotate(${minute_angle}deg)` }}
                            className={`  shadow-md  absolute  h-[100%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center  `}
                        >
                            <span className="h-[33%] shadow-md [box-shadow:0_0_6px_rgba(0,0,0,0.6)] w-1 bg-lightbrown absolute top-[33%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
                        </span>
                        <span
                            style={{ transform: `rotate(${hours_angle}deg)` }}
                            className={` absolute  h-[100%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center   `}
                        >
                            <span className="h-[20%]  w-[7px] [box-shadow:0_0_6px_rgba(0,0,0,0.6)] bg-lightbrown absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
                        </span>
                        <span
                            style={{ transform: `rotate(${second_angle}deg)` }}
                            className={`absolute  h-[100%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center   `}
                        >
                            <span className="h-[45%] transition duration-75  w-[2px] [box-shadow:0_0_6px_rgba(0,0,0,0.6)] bg-lightbrown absolute top-[33%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
                        </span>

                        <span className="w-1 h-2 rounded-b-2xl bg-lightbrown absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-t-2xl bg-lightbrown absolute top-[100%] left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-t-2xl bg-lightbrown absolute rotate-90  top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-b-2xl bg-lightbrown absolute rotate-90  top-1/2 left-[100%] -translate-y-1/2 -translate-x-1/2"></span>
                    </div>
                </div>
                <div className="flex flex-row items-center min-[580px]:mt-35 w-[60%] justify-around">
                    <h1 className="text-primary text-[1.6rem] min-[390px]:text-[1.85rem] min-[580px]:text-[3.25rem] font-light text-shadow-md tracking-wider">
                        {hours}:{minute}:
                        <span className="text-white/50 font-extralight text-[1.45rem] min-[580px]:text-[2rem]">
                            {seconds}
                        </span>{" "}
                        {amPm}
                    </h1>
                    <p className="text-[rgba(255,255,255,0.6)] font-extralight text-shadow-md text-[1rem] min-[580px]:text-[2.25rem]">
                        {day === 1
                            ? " Monday"
                            : day === 2
                              ? " Tuesday"
                              : day === 3
                                ? " Wednesday"
                                : day === 4
                                  ? " Thursday"
                                  : day === 5
                                    ? " Friday"
                                    : day === 6
                                      ? " Saturday"
                                      : day === 0
                                        ? " Sunday"
                                        : null}
                    </p>
                </div>
            </div>
            <div
                className={`${layout["trivia"]} flex items-center justify-center`}
            >
                <p className="text-[rgba(255,255,255,0.6)] min-[580px]:text-[1.2rem] text-[0.7rem] min-[390px]:text-[0.8rem] font-extralight text-shadow-md">
                    {triviaMessage[triviaIndex]}
                </p>
            </div>
            <div
                className={`${layout.greet} pl-6 min-[580px]:pl-12 flex flex-col justify-center`}
            >
                <h1 className="text-primary text-[1.55rem] min-[390px]:text-[1.7rem] min-[580px]:text-[2.75rem] min-[580px]:leading-11 leading-8 text-shadow-md ">
                    B<span className="text-lightbrown">o</span>n ap
                    <span className="text-lightbrown">pé</span>tit
                    <span className="text-lightbrown">,</span> {name}
                    <span className="text-lightbrown">!</span>
                </h1>
                <p className="text-[rgba(255,255,255,0.6)] font-extralight min-[580px]:text-[1.4rem] text-[0.8rem] min-[390px]:text-[0.85rem] text-shadow-md">
                    Assigned to table A_7
                </p>
            </div>
            <div
                className={`${layout["action-container"]} flex flex-col justify-center items-end pr-6 min-[580px]:pr-12 gap-3`}
            >
                <button
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    onClick={() => setIsOrderMore(true)}
                    className="px-4 min-[580px]:text-[1.5rem]  py-1 min-[580px]:py-3 min-[580px]:px-8 text-[rgba(255,255,255,0.8)] font-extralight min-[390px]:py-2 text-[1rem] min-[390px]:text-[1.1rem]  rounded-xl text-primary text-shadow-md [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)] "
                >
                    Order more
                </button>
                <button
                    onClick={() => setIsBillingConfirmation(true)}
                    className="px-4 min-[580px]:text-[1.5rem]  py-1 min-[580px]:py-3 min-[580px]:px-8 text-[rgba(255,255,255,0.8)]font-extralight min-[390px]:py-2 text-[1rem] min-[390px]:text-[1.1rem] brown-gradient-to-b rounded-xl text-primary text-shadow-md [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
                >
                    Complete dining
                </button>
            </div>
        </div>
    );
};

export default Eating;

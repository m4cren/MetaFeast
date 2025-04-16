import { SetStateAction, useEffect, useState } from "react";
import layout from "../../../styles/layouts/eating.module.css";
import { MessageSquareText, Scroll } from "lucide-react";
import Order from "./Order";
import useTimeOfDay from "../../../hooks/useTimeOfDay";

interface EatingProps {
    setPhase: React.Dispatch<SetStateAction<number>>;
    setCamPos: React.Dispatch<SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<SetStateAction<[number, number, number]>>;
}

const Eating = ({ setPhase, setCamPos, setCamRot }: EatingProps) => {
    const name = localStorage.getItem("costumer_name");
    const [isOrderMore, setIsOrderMore] = useState<boolean>(false);
    const [isBillingConfirmation, setIsBillingConfirmation] =
        useState<boolean>(false);

    const [isPromptClose, setIsPromptClose] = useState<boolean>(false);

    const { seconds, minute, hours, amPm, day } = useTimeOfDay();

    let second_angle = Number(seconds) * 6;
    let minute_angle = Number(minute) * 6;
    let hours_angle = Number(hours) * 30;

    const triviaMessage = [
        "Did you know that egg contains 6-7 grams of protein?",
        "Bananas are rich in magnesium and potassium",
        "You look good, you feel good, you do good",
        "Our system saves the customer's last activity phase",
        "Hydration boosts focus and mood—drink water!",
        "Our smart menu adapts to your past choices",
        "Healthy habits lead to a healthy lifestyle",
        "Your preferences help us serve you better",
        "Small changes make a big difference in health",
        "We remember your favorites, so you don’t have to",
        "Our system ensures a smooth and personalized experience",
    ];

    const [triviaIndex, setTriviaIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTriviaIndex((prev) => (prev + 1) % triviaMessage.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

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
                        " fixed flex items-center justify-center z-20 w-full h-screen bg-black/30 backdrop-blur-[15px] [-webkit-backdrop-blur:(15px)] "
                    }
                >
                    <div
                        className={`${isPromptClose && "pop-close-animation"} pop-up-animation flex flex-col items-center justify-center gap-4 w-[90%] min-[390px]:w-[85%] h-[14rem] bg-gradient-to-b from-darkbrown to-lightbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="flex flex-col items-center gap-4">
                            {" "}
                            <i className="text-primary opacity-80">
                                <Scroll size={40} />
                            </i>
                            <h1 className="text-primary text-shadow-md text-[1.3rem] min-[390px]:text-[1.4rem] text-center leading-6">
                                Please confirm if you’ve completed your meal.
                            </h1>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <button
                                onClick={() => {
                                    setIsPromptClose(true);
                                    setTimeout(() => {
                                        setIsPromptClose(false);
                                        setIsBillingConfirmation(false);
                                    }, 200);
                                }}
                                className="p-2 text-[0.9rem] min-[390px]:text-[1rem] px-2 min-[390px]:px-3 border-1 text-shadow-md border-white/20 rounded-xl text-white/70 font-extralight [box-shadow:-1px_1px_3px_rgba(0,0,0,0.3)]"
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
                                    }, 200);
                                }}
                                className="p-2 text-[0.9rem] min-[390px]:text-[1rem] px-2 min-[390px]:px-3 bg-gradient-to-t text-shadow-md from-darkgreen to-lightgreen rounded-xl text-white/70 font-extralight [box-shadow:-1px_1px_3px_rgba(0,0,0,0.3)]"
                            >
                                Proceed to Billing
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`${layout.temperature} flex flex-col justify-end pl-6`}
            >
                <h1 className="text-primary font-light text-[1.9rem] min-[390px]:text-[2rem] text-shadow-md">
                    25<span className="text-lightbrown">&deg;</span>c
                </h1>
                <p className="text-white/70 font-extralight text-[1.1rem] min-[390px]:text-[1.2rem] -mt-2 text-shadow-md">
                    Sunny
                </p>
            </div>
            <div
                className={`${layout["chat-container"]} text-white/85 flex justify-end pr-6 items-end`}
            >
                <p className="py-6">
                    <MessageSquareText size={37} />
                </p>
            </div>
            <div
                className={`${layout.time} w-full flex flex-col items-center pt-10`}
            >
                <div className="w-[18rem] h-[18rem] flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-full border-4 shadow-xl border-lightbrown bg-black/35 [box-shadow:0_0_15px_rgba(0,0,0,0.7)] w-[14rem] h-[14rem] min-[390px]:w-[17rem] min-[390px]:h-[17rem] flex">
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
                            <span className="h-[45%]  w-[2px] [box-shadow:0_0_6px_rgba(0,0,0,0.6)] bg-lightbrown absolute top-[33%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
                        </span>

                        <span className="w-1 h-2 rounded-b-2xl bg-lightbrown absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-t-2xl bg-lightbrown absolute top-[100%] left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-t-2xl bg-lightbrown absolute rotate-90  top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"></span>
                        <span className="w-1 h-2 rounded-b-2xl bg-lightbrown absolute rotate-90  top-1/2 left-[100%] -translate-y-1/2 -translate-x-1/2"></span>
                    </div>
                </div>
                <div className="flex flex-row items-center w-[60%] justify-around">
                    <h1 className="text-primary text-[1.8rem] font-light text-shadow-md tracking-wider">
                        {hours}
                        <span className="text-lightbrown">:</span>
                        {minute}
                        <span className="text-lightbrown">:</span>
                        <span className="text-white/50 font-extralight text-[1.45rem]">
                            {seconds}
                        </span>
                        {amPm}
                    </h1>
                    <p className="text-white/60 font-extralight text-shadow-md text-[1rem]">
                        {day === 1
                            ? "Monday"
                            : day === 2
                              ? "Tuesday"
                              : day === 3
                                ? "Wednesday"
                                : day === 4
                                  ? "Thursday"
                                  : day === 5
                                    ? "Friday"
                                    : day === 6
                                      ? "Saturday"
                                      : day === 7
                                        ? "Sunday"
                                        : null}
                    </p>
                </div>
            </div>
            <div
                className={`${layout["trivia"]} flex items-center justify-center`}
            >
                <p className="text-white/60 text-[0.7rem] min-[390px]:text-[0.8rem] font-extralight text-shadow-md">
                    {triviaMessage[triviaIndex]}
                </p>
            </div>
            <div
                className={`${layout.greet} pl-6 flex flex-col justify-center`}
            >
                <h1 className="text-primary text-[1.55rem] min-[390px]:text-[1.7rem] leading-8 text-shadow-md ">
                    B<span className="text-lightbrown">o</span>n ap
                    <span className="text-lightbrown">pé</span>tit
                    <span className="text-lightbrown">,</span> {name}
                    <span className="text-lightbrown">!</span>
                </h1>
                <p className="text-white/60 font-extralight text-[0.8rem] min-[390px]:text-[0.85rem] text-shadow-md">
                    Assign to table A_7
                </p>
            </div>
            <div
                className={`${layout["action-container"]} flex flex-col justify-center items-end pr-6 gap-3`}
            >
                <button
                    onClick={() => setIsOrderMore(true)}
                    className="px-4 py-1 text-white/80 font-extralight min-[390px]:py-2 text-[1rem] min-[390px]:text-[1.1rem] border-white/10 border-1 rounded-xl text-primary text-shadow-md [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)] "
                >
                    Order more
                </button>
                <button
                    onClick={() => setIsBillingConfirmation(true)}
                    className="px-4 py-1 text-white/80 font-extralight min-[390px]:py-2 text-[1rem] min-[390px]:text-[1.1rem] bg-gradient-to-t from-darkbrown to-lightbrown rounded-xl text-primary text-shadow-md [box-shadow:-2px_2px_6px_rgba(0,0,0,0.4)]"
                >
                    Complete dining
                </button>
            </div>
        </div>
    );
};

export default Eating;

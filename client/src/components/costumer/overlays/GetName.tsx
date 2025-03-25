import React, { useState } from "react";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";
import useFrameProvider from "../../../frames/useFrameProvider";
import { UtensilsCrossed } from "lucide-react";
import { CircleHelp } from "lucide-react";
import layout from "../../../styles/layouts/get_name.module.css";

interface FormType {
    costumer_name: string;
}

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsName: React.Dispatch<React.SetStateAction<boolean>>;
    setCostumerName: React.Dispatch<React.SetStateAction<string>>;
}

const GetName = ({
    setPhase,
    setCamPos,
    setCamRot,
    setIsName,
    setCostumerName,
}: Props) => {
    const { server } = useServerAddress();
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [warningContent, setWarningContent] = useState<string>("");

    const { afterName_Frames, selTable1stF_Frames } = useFrameProvider();

    const setFrameOne = () => {
        setCamPos(afterName_Frames.frame1.pos);
        setCamRot(afterName_Frames.frame1.rot);

        setTimeout(() => {
            setCamPos(afterName_Frames.frame2.pos);
            setCamRot(afterName_Frames.frame2.rot);

            setTimeout(() => {
                setCamPos(afterName_Frames.frame3.pos);
                setCamRot(afterName_Frames.frame3.rot);
                setTimeout(() => {
                    setCamPos(afterName_Frames.frame4.pos);
                    setCamRot(afterName_Frames.frame4.rot);
                    setTimeout(() => {
                        setCamPos(afterName_Frames.frame5.pos);
                        setCamRot(afterName_Frames.frame5.rot);
                        setTimeout(() => {
                            setCamPos(selTable1stF_Frames.mid.pos);
                            setCamRot(selTable1stF_Frames.mid.rot);
                            setPhase(1);
                            localStorage.setItem("current_phase", "phase_1");
                        }, 700);
                    }, 400);
                }, 400);
            }, 400);
        }, 400);
    };

    const [name, setName] = useState<FormType>({
        costumer_name: "",
    });

    const submitToServer = async () => {
        try {
            const response = await axios.post(
                `${server}/costumer/register`,
                name,
            );
            const token = response.data.access_token;

            if (!response.data.status) {
                setWarningContent(response.data.message);
                setIsWarning(true);

                const timer = setTimeout(() => {
                    setIsWarning(false);
                }, 5000);

                return () => clearTimeout(timer);
            } else if (response.data.status) {
                localStorage.setItem("token", token);
                setIsName(true);
                setFrameOne();
                setCostumerName(name.costumer_name);
                localStorage.setItem("costumer_name", name.costumer_name);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.costumer_name.length == 0) {
            setWarningContent("Please enter your name :<");
            setIsWarning(true);

            setTimeout(() => {
                setIsWarning(false);
            }, 5000);

            return;
        }

        if (name.costumer_name.length < 3) {
            setWarningContent("Name must be greater than 3 characters");
            setIsWarning(true);

            setTimeout(() => {
                setIsWarning(false);
            }, 5000);

            return;
        }

        if (name.costumer_name.length > 15) {
            setWarningContent("Name must be less than 15 characters");
            setIsWarning(true);

            setTimeout(() => {
                setIsWarning(false);
            }, 5000);

            return;
        }

        submitToServer();

        setName({ costumer_name: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ ...name, [e.currentTarget.name]: e.currentTarget.value });
    };

    return (
        <>
            <div className="bg-gradient-to-t to-[#dedede00] from-[#8f8f8f] w-full h-[13rem] fixed bottom-0 opacity-60"></div>

            <div
                className={`${layout.main} w-full h-screen  bg-black/25 backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)]`}
            >
                <div
                    className={` ${layout.head} flex justify-between items-center px-4`}
                >
                    <div className="flex items-center space-x-1.5 text-xl">
                        <span className="text-primary text-shadow-md">
                            <UtensilsCrossed />
                        </span>

                        <p className="text-primary text-[1rem] phone:text-[5rem] text-shadow-md">
                            Metafeast
                        </p>
                    </div>
                    <span className="text-primary text-shadow-md">
                        <CircleHelp />
                    </span>
                </div>

                <div
                    className={`${layout.body} flex flex-col items-center gap-8 justify-center`}
                >
                    <h1 className="text-primary text-[5.5vw] text-shadow-lg text-center">
                        What do you want us to call you?
                    </h1>
                    <form
                        className="flex flex-col items-center gap-8 w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex w-full justify-center flex-col items-center">
                            {isWarning ? (
                                <p className="text-primary text-[0.8rem] mb-2 phone:text-[1rem]">
                                    {warningContent}
                                </p>
                            ) : null}
                            <input
                                required
                                type="text"
                                className="text-center font-light border-1 outline-none border-white/40 w-[90%] h-[2.4rem] rounded-2xl text-primary text-shadow-lg"
                                name="costumer_name"
                                onChange={handleChange}
                                value={name.costumer_name}
                                placeholder="...Nickname"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-primary  border-white/40 text-shadow-lg border-1 p-3 rounded-2xl hover:scale-50 active:scale-80 transition-[200] text-lg shadow-[-2px_2px_4px_rgba(255,255,255,0.2),-3px_3px_0_rgba(255,255,255,0.05),-4px_4px_4px_rgba(255,255,255,0.2)]"
                        >
                            Proceed
                        </button>
                    </form>
                </div>

                <div
                    className={` ${layout.footer} flex flex-row items-center justify-around`}
                >
                    <p className="text-primary text-sm text-shadow-lg">
                        Privacy Policy
                    </p>
                    <p className="text-primary text-sm text-shadow-lg">
                        Terms and Condition
                    </p>
                </div>
            </div>
        </>
    );
};

export default GetName;

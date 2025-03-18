import React, { useEffect, useState } from "react";
import axios from "axios";

import useServerAddress from "../../../useServerAddress";
import useCostumerFrameProvider from "../../frames/useCostumerFrameProvider";

interface FormType {
    costumer_name: string;
}

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsName: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetName = ({ setPhase, setCamPos, setCamRot, setIsName }: Props) => {
    const { server } = useServerAddress();
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [warningContent, setWarningContent] = useState<string>("");

    const { afterName_Frames, selTable1stF_Frames } =
        useCostumerFrameProvider();

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
                `${server}/get-costumer-name`,
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

        submitToServer();

        setName({ costumer_name: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ ...name, [e.currentTarget.name]: e.currentTarget.value });
    };

    return (
        <div className="fixed w-full h-screen flex items-center justify-center">
            <div className="w-[90vw]  flex flex-col justify-center items-center h-[30rem] gap-16 bg-white/10 backdrop-blur-[5px] border-1 rounded-2xl border-white/20">
                <h1 className="text-[1.4rem] text-white font-[500] phone:text-[1.6rem] text-shadow-lg">
                    What do we want to call you?
                </h1>
                <form
                    className="flex flex-col items-center gap-8 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex w-full justify-center flex-col items-center">
                        {isWarning ? (
                            <p className="text-white text-[0.8rem] mb-2 phone:text-[1rem]">
                                {warningContent}
                            </p>
                        ) : null}
                        <input
                            type="text"
                            className="text-center border-1 outline-none border-white w-[90%] h-[2.4rem] rounded-2xl text-white text-shadow-lg"
                            name="costumer_name"
                            onChange={handleChange}
                            value={name.costumer_name}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white text-shadow-lg border-1 p-4 rounded-2xl hover:scale-50 active:scale-80 transition-[200] text-2xl"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GetName;

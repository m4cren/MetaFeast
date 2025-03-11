import { memo, useState } from "react";
import axios from "axios";

interface FormType {
    costumer_name: string;
}

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}

const GetName = ({ setPhase }: Props) => {
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [warningContent, setWarningContent] = useState<string>("");
    const [name, setName] = useState<FormType>({
        costumer_name: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.costumer_name == "") {
            setWarningContent("Please enter your name :<");
            setIsWarning(true);

            setTimeout(() => {
                setIsWarning(false);
            }, 5000);
        }

        const submitToServer = async () => {
            try {
                const response = await axios.post(
                    "http://192.168.1.33:6969/get-costumer-name",
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
                    setPhase(1);
                    localStorage.setItem("current_phase", "phase_1");
                }
            } catch (error) {
                console.error(error);
            }
        };

        submitToServer();

        setName({ costumer_name: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ ...name, [e.currentTarget.name]: e.currentTarget.value });
    };

    return (
        <div className="fixed w-full h-screen flex items-center justify-center">
            <div className="w-[90vw]  flex flex-col justify-center items-center h-[30rem] gap-16">
                <h1 className="text-[1.4rem] text-white font-[500] phone:text-[1.6rem]">
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
                            className="text-center border-1 border-white w-[90%] h-[2.4rem] rounded-2xl text-white"
                            name="costumer_name"
                            onChange={handleChange}
                            value={name.costumer_name}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white border-1 p-4 rounded-2xl hover:scale-50 active:scale-80 transition-[200] text-2xl"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(GetName);

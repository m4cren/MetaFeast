import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import useServerAddress from "../../../useServerAddress";
import { useNavigate } from "react-router-dom";
type FormType = {
    password: string;
};

const AdminLogin = () => {
    const [input, setInput] = useState<FormType>({
        password: "",
    });
    const [warningMessage, setWarningMessage] = useState<string>("");
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const inputRef = useRef(null);
    const { server } = useServerAddress();

    const navigate = useNavigate();

    useEffect(() => {
        const authentication = localStorage.getItem("authenticated");

        if (authentication && authentication === "true") {
            navigate("/admin");
        }
    }, []);

    const submitToServer = async () => {
        try {
            const response = await axios.post(`${server}/admin-login`, input);

            if (response.data.status) {
                localStorage.setItem("authenticated", "true");
                setWarningMessage("Sucess, please wait...");
                setIsWarning(true);

                setTimeout(() => {
                    setIsWarning(false);
                    navigate("/admin");
                }, 3000);
            } else {
                setWarningMessage("Incorrect password");
                setIsWarning(true);
                setTimeout(() => {
                    setIsWarning(false);
                }, 5000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        submitToServer();
    };
    return (
        <div className="w-full h-screen bg-[url('/images/admin_bg.gif')] bg-no-repeat bg-center bg-cover flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-[9px] w-full h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center bg-white/60 rounded-2xl p-25 gap-8 backdrop-blur-[30px]">
                    <h1 className="text-black/70 font-bold text-3xl">
                        Administrator Login
                    </h1>
                    <form
                        className="w-full flex flex-col items-center justify-center gap-4"
                        onSubmit={handleSubmit}
                    >
                        {isWarning && (
                            <p
                                className={` text-[0.9rem] ${warningMessage === "Sucess, please wait..." ? "text-green-500" : "text-red-800"} `}
                            >
                                {warningMessage}
                            </p>
                        )}

                        <input
                            className="border-black/70 border-2 rounded-2xl text-center outline-none w-full"
                            type="password"
                            ref={inputRef}
                            onChange={handleChange}
                            name="password"
                        />
                        <button
                            type="submit"
                            className="rounded-2xl bg-black/70 text-white/90 px-10 py-3"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

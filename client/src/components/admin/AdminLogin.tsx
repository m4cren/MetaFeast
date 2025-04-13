import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import useServerAddress from "../../../useServerAddress";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Eye } from "lucide-react";

import { OrbitControls } from "@react-three/drei";
import Landscape from "../models/Landscape";
import AdminLandingTemplate from "./AdminLandingTemplate";

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
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
            setIsSubmitting(false);
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
        setIsSubmitting(true);
    };
    return (
        <AdminLandingTemplate
            description={
                <p className="text-softblack font-semibold text-[1.5rem]">
                    Administrator <br />
                    Authentication
                </p>
            }
            content={
                <div className="flex flex-col gap-6 items-center justify-center w-[48rem] h-[35rem]">
                    <h1 className="text-softblack font-semibold text-[1.1rem]">
                        Welcome back, Please authenticate to access the admin
                        panel
                    </h1>
                    <form
                        className="flex flex-row w-[70%] items-center gap-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="relative w-full">
                            <label className="absolute -top-[29%] left-4 rounded-xl px-1 text-softblack text-[0.85rem] bg-[#f5f5f5] font-semibold ">
                                Password
                            </label>
                            <i
                                onClick={() =>
                                    setIsPasswordShow(!isPasswordShow)
                                }
                                className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            >
                                <Eye />
                            </i>
                            <input
                                ref={inputRef}
                                name="password"
                                onChange={handleChange}
                                type={`${isPasswordShow ? "text" : "password"}`}
                                className="w-full text-[0.85rem] pl-4 text-softblack py-2 outline-none border-2 border-softblack rounded-xl [box-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-primary text-[1.1rem] bg-gradient-to-b from-darkbrown to-lightbrown  [box-shadow:-2px_2px_4px_rgba(0,0,0,0.4)] rounded-xl w-[6rem] h-[2.5rem] cursor-pointer"
                        >
                            {isSubmitting ? (
                                <span className="loader-white scale-40 -translate-y-3 pop-up-animation"></span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    {isWarning && (
                        <p className="text-lightred text-[0.9rem] font-semibold">
                            {warningMessage}
                        </p>
                    )}
                </div>
            }
        />
    );
};

export default AdminLogin;

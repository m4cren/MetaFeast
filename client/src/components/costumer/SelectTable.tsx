import axios from "axios";
import { memo, useEffect, useState } from "react";

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
}

const SelectTable = ({ setPhase }: Props) => {
    const [costumerName, setCostumerName] = useState<string>("Loading..");

    useEffect(() => {
        const fetchCostumer = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setPhase(0);
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const response = await axios.get(
                    "http://192.168.1.33:6969/phase-1",
                    {
                        headers,
                        withCredentials: false,
                    },
                );

                setCostumerName(response.data.costumer_name);
            } catch (error) {
                localStorage.removeItem("token");
                setPhase(0);
            }
        };

        fetchCostumer();
    });

    const handleExit = async () => {
        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const response = await axios.get(
            "http://192.168.1.33:6969/costumer-exit",
            {
                headers,
                withCredentials: false,
            },
        );
        console.log(response.data.message);
        localStorage.removeItem("current_phase");
        localStorage.removeItem("token");
        setPhase(0);
    };
    return (
        <div className="flex justify-center w-full h-screen items-center flex-col gap-10">
            <h1 className="text-white text-4xl">Welcome, {costumerName}</h1>

            <button
                className="text-white p-4 text-2xl rounded-2xl border-1"
                onClick={handleExit}
            >
                Exit
            </button>
        </div>
    );
};

export default memo(SelectTable);

import axios from "axios";
import { useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";

const useCostumerName = () => {
    const [costumerName, setCostumerName] = useState<string>("");
    const [token] = useState<string | null>(localStorage.getItem("token"));
    const { server } = useServerAddress();
    useEffect(() => {
        const fetchCostumerName = async () => {
            if (!token) return;

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
            try {
                const response = await axios.get(
                    `${server}/costumer/get-name`,
                    {
                        headers,
                        withCredentials: false,
                    },
                );

                setCostumerName(response.data.costumer_name);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCostumerName();
    });

    return { costumerName, setCostumerName };
};

export default useCostumerName;

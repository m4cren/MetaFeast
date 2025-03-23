import { useEffect, useState } from "react";

import AdminView from "./AdminView";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";

const MainAdmin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        const authentication = localStorage.getItem("authenticated");

        if (!authentication) {
            navigate("admin-login");
        } else if (authentication) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <AdminView />

            {isLoading && <LoadingScreen />}
        </>
    );
};

export default MainAdmin;

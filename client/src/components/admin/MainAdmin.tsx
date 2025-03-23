import { useEffect } from "react";

import AdminView from "./AdminView";
import { useNavigate } from "react-router-dom";

interface AdminProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainAdmin = ({ setIsLoading }: AdminProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const authentication = localStorage.getItem("authenticated");

        if (!authentication) {
            navigate("admin-login");
        }
    }, []);

    return (
        <>
            <AdminView setIsLoading={setIsLoading} />
        </>
    );
};

export default MainAdmin;

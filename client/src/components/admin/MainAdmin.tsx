import { useEffect } from "react";

import AdminView from "./AdminView";
import { useNavigate } from "react-router-dom";

const MainAdmin = ({}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const authentication = localStorage.getItem("authenticated");

        if (!authentication) {
            navigate("admin-login");
        }
    }, []);

    return <AdminView />;
};

export default MainAdmin;

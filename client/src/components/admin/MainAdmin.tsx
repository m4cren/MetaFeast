import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useServerAddress from "../../../useServerAddress";
import AdminLogin from "./AdminLogin";
import AdminScene from "./scenes/AdminScene";
import AdminView from "./AdminView";

const MainAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authentication = localStorage.getItem("authenticated");

        if (authentication === "true" && authentication) {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated ? (
        <AdminView />
    ) : (
        <AdminLogin setIsAuthenticated={setIsAuthenticated} />
    );
};

export default MainAdmin;

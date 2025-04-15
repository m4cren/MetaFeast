import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { lazy, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { SocketProvider } from "./contexts/SocketContext";
import { TableStatusProvider } from "./contexts/TableStatusContext";
import AdminLogin from "./components/admin/AdminLogin";
import QrCode from "./components/QrCode";
import axios from "axios";
import useServerAddress from "../useServerAddress";

const MainCostumer = lazy(() => import("./components/costumer/MainCostumer"));
const MainAdmin = lazy(() => import("./components/admin/MainAdmin"));

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { server } = useServerAddress();
    const [token] = useState<string | null>(localStorage.getItem("token"));
    const [isStart, setIsStart] = useState<boolean>(false);

    const fetchCostumerData = async () => {
        let current_name = {
            name: localStorage.getItem("costumer_name"),
        };

        if (!current_name) {
            current_name = {
                name: "not_existing__404",
            };
        }
        try {
            const response = await axios.post(
                `${server}/costumer/get-name`,
                current_name,
            );

            if (response.data.status) {
                return;
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("current_phase");
                localStorage.removeItem("table-picked");
                localStorage.removeItem("costumer_name");
                localStorage.removeItem("last-product-placed");
                localStorage.removeItem("checkout_url");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCostumerData();
        if (!token) {
            localStorage.removeItem("current_phase");
            localStorage.removeItem("table-picked");
            localStorage.removeItem("costumer_name");
            localStorage.removeItem("last-product-placed");
        }
    }, []);

    return (
        <SocketProvider>
            <TableStatusProvider>
                <Router>
                    {!isStart && (
                        <div className="fixed w-full h-screen z-10">
                            <LoadingScreen
                                isLoading={isLoading}
                                setIsStart={setIsStart}
                            />
                        </div>
                    )}
                    <Routes>
                        <Route
                            path="/admin"
                            element={<MainAdmin setIsLoading={setIsLoading} />}
                        />
                        <Route
                            path="/admin/admin-login"
                            element={<AdminLogin />}
                        />

                        <Route
                            path="/"
                            element={
                                <MainCostumer
                                    setIsLoading={setIsLoading}
                                    isStart={isStart}
                                />
                            }
                        />
                        <Route path="/qr-code" element={<QrCode />} />
                    </Routes>
                </Router>
            </TableStatusProvider>
        </SocketProvider>
    );
};

export default App;

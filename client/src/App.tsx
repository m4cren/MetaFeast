import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { lazy, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { SocketProvider } from "./contexts/SocketContext";
import { TableStatusProvider } from "./contexts/TableStatusContext";
import AdminLogin from "./components/admin/AdminLogin";
import QrCode from "./components/QrCode";

const MainCostumer = lazy(() => import("./components/costumer/MainCostumer"));
const MainAdmin = lazy(() => import("./components/admin/MainAdmin"));

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [token] = useState<string | null>(localStorage.getItem("token"));
    const [isStart, setIsStart] = useState<boolean>(false);

    useEffect(() => {
        if (!token) {
            console.log("There is no token");
            localStorage.removeItem("current_phase");
            localStorage.removeItem("table-picked");
            localStorage.removeItem("costumer_name");
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

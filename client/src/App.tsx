import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { SocketProvider } from "./contexts/SocketContext";
import { TableStatusProvider } from "./contexts/TableStatusContext";
import AdminLogin from "./components/admin/AdminLogin";

const MainCostumer = lazy(() => import("./components/costumer/MainCostumer"));
const MainAdmin = lazy(() => import("./components/admin/MainAdmin"));

export const loader_timer = 2000;

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [token] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (!token) {
            console.log("There is no token");
            localStorage.removeItem("current_phase");
            localStorage.removeItem("table-picked");
            localStorage.removeItem("costumer_name");
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, loader_timer);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SocketProvider>
            <TableStatusProvider>
                <Router>
                    {isLoading && (
                        <div className="fixed w-full h-screen z-10">
                            <LoadingScreen />
                        </div>
                    )}
                    <Routes>
                        <Route
                            path="/admin"
                            element={
                                <Suspense fallback={null}>
                                    <MainAdmin />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/admin/admin-login"
                            element={<AdminLogin />}
                        />

                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<LoadingScreen />}>
                                    <MainCostumer />
                                </Suspense>
                            }
                        />
                    </Routes>
                </Router>
            </TableStatusProvider>
        </SocketProvider>
    );
};

export default App;

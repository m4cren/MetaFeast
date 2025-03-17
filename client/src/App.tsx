import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { SocketContext, SocketProvider } from "./contexts/SocketContext";
import { TableStatusProvider } from "./contexts/TableStatusContext";

const MainCostumer = lazy(() => import("./components/costumer/MainCostumer"));
const MainAdmin = lazy(() => import("./components/admin/MainAdmin"));

export const loader_timer = 20000;

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("current_phase");
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
                                <Suspense fallback={<LoadingScreen />}>
                                    <MainAdmin />
                                </Suspense>
                            }
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

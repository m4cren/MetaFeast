import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminConfirmation from "./routes/AdminConfirmation";
import CostumerAuthentication from "./routes/CostumerAuthentication";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminConfirmation />} />
                <Route path="/" element={<CostumerAuthentication />} />
            </Routes>
        </Router>
    );
};

export default App;

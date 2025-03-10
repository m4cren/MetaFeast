import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainCostumer from "./components/costumer/MainCostumer";
import MainAdmin from "./components/admin/MainAdmin";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<MainAdmin />} />
                <Route path="/" element={<MainCostumer />} />
            </Routes>
        </Router>
    );
};

export default App;

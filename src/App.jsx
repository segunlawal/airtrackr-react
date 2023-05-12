import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { ActiveTabProvider } from "./hooks/TabContext";
import { ToastContainer } from "react-toastify";
import LogIn from "./pages/LogIn";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <ActiveTabProvider>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </ActiveTabProvider>
    );
}

export default App;

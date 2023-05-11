import { useTabContext } from "../hooks/TabContext";
import Flights from "../components/flights/Flights";
import Statistics from "../components/dashboard/statistics/Statistics";
import Settings from "../components/dashboard/Settings";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { activeTab } = useTabContext();

    const token = localStorage.getItem("openSkyToken");
    if (!token) {
        return <Navigate to="/" />;
    }

    const tabComponents = {
        Flights,
        Statistics,
        Settings
    };

    const Component = tabComponents[activeTab];
    return <Component />;
};

export default Dashboard;

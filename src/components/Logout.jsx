import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("openSkyToken");
        navigate("/");
    };
    return (
        <div
            className="flex ml-5 items-center gap-2 cursor-pointer"
            onClick={handleLogOut}
        >
            <BiLogOut />
            <p>Logout</p>
        </div>
    );
};

export default Logout;

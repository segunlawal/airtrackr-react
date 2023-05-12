import Logout from "../../Logout";

const Header = () => {
    const token = localStorage.getItem("openSkyToken");
    const name = token.split("@")[0];
    const username = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div className="flex justify-between px-1">
            <p className="text-2xl text-[#c99c33] font-semibold">
                Welcome, {username}
            </p>
            <Logout />
        </div>
    );
};

export default Header;

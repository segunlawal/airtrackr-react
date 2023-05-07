import Logout from "../Logout";

const Settings = () => {
    const token = localStorage.getItem("openSkyToken");

    return (
        <div className="sm:pl-60 pl-5 py-3 flex flex-col text-left font-semibold text-custom-blue">
            <p className="text-2xl">ACCOUNT SETTINGS</p>
            <div className="flex justify-between">
                <p>
                    <span className="font-bold">E-mail:</span>
                    <span className="text-custom-black">{token}</span>
                </p>
                <Logout />
            </div>
        </div>
    );
};

export default Settings;

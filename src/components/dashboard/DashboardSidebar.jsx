import { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { useTabContext } from "../../hooks/TabContext";
import Logout from "../Logout";

const links = [
    { id: 1, path: "Flights", icon: MdFlightTakeoff },
    { id: 2, path: "Statistics", icon: GoGraph },
    { id: 3, path: "Settings", icon: FiSettings }
];

// links For mobile
const mobileOrder = [1, 0, 2];
const mobileLinks = mobileOrder.map(i => links[i]);

const DashboardSidebar = () => {
    const { setActiveTab } = useTabContext();
    const [selectedLink, setSelectedLink] = useState("Flights");

    const handleTabClick = tab => {
        setActiveTab(tab);
        setSelectedLink(tab);
    };

    return (
        <>
            <div className="hidden sm:flex fixed bg-custom-blue min-h-screen w-48 flex-col px-10">
                <div className="flex items-center gap-2 pt-10 pb-20 text-[#c99c33]">
                    <BsFillAirplaneEnginesFill className="text-3xl " />
                    <p className="font-bold">OpenSKY</p>
                </div>
                {links.map(({ id, path, icon }) => {
                    const Icon = icon;
                    const isSelected = path === selectedLink;
                    return (
                        <li
                            key={id}
                            className={`cursor-pointer list-none mb-10 grid grid-cols-4 text-xl ${
                                isSelected ? "font-semibold" : "text-[#999999] "
                            }`}
                            onClick={() => handleTabClick(path)}
                        >
                            <Icon className="my-auto" />
                            <p>{path}</p>
                        </li>
                    );
                })}
                <div className="fixed bottom-5">
                    <Logout />
                </div>
            </div>
            <div className="fixed bottom-0 sm:hidden flex justify-center gap-16 bg-custom-blue w-full">
                {mobileLinks.map(({ id, path, icon }) => {
                    const Icon = icon;
                    const isSelected = path === selectedLink;
                    return (
                        <li
                            key={id}
                            className={`cursor-pointer list-none my-2 flex flex-col gap-3 text-lg ${
                                isSelected ? "font-semibold" : "text-[#999999] "
                            }`}
                            onClick={() => handleTabClick(path)}
                        >
                            <Icon className="m-auto" />
                            <p>{path}</p>
                        </li>
                    );
                })}
            </div>
        </>
    );
};

export default DashboardSidebar;

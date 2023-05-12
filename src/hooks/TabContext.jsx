import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
    // create active tab provider
    const [activeTab, setActiveTab] = useState("Flights");
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};
export const useTabContext = () => {
    const context = useContext(TabContext);
    return context;
};

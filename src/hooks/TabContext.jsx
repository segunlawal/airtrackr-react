import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

// create active tab provider
export const ActiveTabProvider = ({ children }) => {
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

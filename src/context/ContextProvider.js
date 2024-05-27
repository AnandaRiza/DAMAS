"use client";
const { createContext, useContext, useState } = require("react");

export const stateContext = createContext();

export const ContexProvider = ({ children }) => {
    
    const [showSideBar, setShowSideBar] = useState(true);
    const [header, setHeader] = useState("Home");
    const { user } = useStateContext();

    return (
        <stateContext.Provider
            value={{
                showSideBar,
                setShowSideBar,
                header,
                setHeader,
                user,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(stateContext);
};

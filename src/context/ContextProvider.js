"use client";

import { createContext, useContext, useState } from "react";

export const stateContext = createContext();

export const ContexProvider = ({ children }) => {
    const [showSideBar, setShowSideBar] = useState(true);
    const [header, setHeader] = useState("Home");
    const [userAplikasi, setUserAplikasi] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <stateContext.Provider
            value={{
                showSideBar,
                setShowSideBar,
                header,
                setHeader,
                user,
                setUser,
                userAplikasi,
                setUserAplikasi,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(stateContext);
};

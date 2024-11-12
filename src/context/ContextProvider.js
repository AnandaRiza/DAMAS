"use client";

import { createContext, useContext, useState } from "react";

export const stateContext = createContext();

export const ContexProvider = ({ children }) => {
    const [showSideBar, setShowSideBar] = useState(true);
    const [header, setHeader] = useState("Home");
    const [userAplikasi, setUserAplikasi] = useState(null);
    const [user, setUser] = useState(null);
    const [isOperatorDpti, setIsOperatorDpti] = useState(false);
    const [isAdminMemo, setIsAdminMemo] = useState(false);

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
                isOperatorDpti,
                setIsOperatorDpti,
                isAdminMemo,
                setIsAdminMemo,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(stateContext);
};

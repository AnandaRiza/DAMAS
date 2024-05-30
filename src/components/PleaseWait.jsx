"use client";
import React from "react";
import { FiLoader, FiRefreshCw } from "react-icons/fi";

const PleaseWait = () => {
    return (
        <div className="font-terminal w-full">
            <div className="min-h-screen min-w-full bg-white-300 text-black flex gap-3 items-center justify-center">
                    <p>Please Wait</p>{" "}
                    <FiLoader size={20} className="animate-spin-slow" />
                </div>
        </div>
    );
};

export default PleaseWait;

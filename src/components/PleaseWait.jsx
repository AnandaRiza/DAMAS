"use client";
import React from "react";
import { FiLoader, FiRefreshCw } from "react-icons/fi";

const PleaseWait = () => {
    return (
        <div className="font-terminal w-full">
            <div className="bg-[#00A6B4] my-3 rounded-xl py-2 px-4 flex items-center justify-center">
                <div className="flex gap-3 items-center">
                    <p>Please wait</p>{" "}
                    <FiLoader size={20} className="animate-spin-slow" />
                </div>
            </div>
        </div>
    );
};

export default PleaseWait;

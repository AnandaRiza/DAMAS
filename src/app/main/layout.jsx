"use client";
import Footer from "@/components/Footer";
import Header from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import { IsLogin } from "@/validation/IsLogin";
import Link from "next/link";
import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <IsLogin>
            <div className="w-full h-full relative bg-[#00A6B4] bg-opacity-25 ">
                <div className="sticky z-50 w-full top-0">
                    <Header title="DAMAS" />
                </div>
                <button
                    className={`rounded-full fixed z-50 ${isSidebarOpen ? "left-[270px]" : "left-0" }`}
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <FaAngleDoubleLeft size={24} /> : <FaAngleDoubleRight size={20} /> }
                    
                </button>
                <div className="w-full h-full overflow-hidden relative flex">
                    <div
                        className={`overflow-auto relative ${
                            isSidebarOpen
                                ? "w-[15%]"
                                : "w-0 -translate-x-[1000px]"
                        } `}
                    >
                        {/* <div className="hidden lg:block lg:w-[15%]"> */}
                        {/* <div className="relative w-relative"> */}
                        <Sidebar />
                    </div>
                    <div
                        className={`px-6 ${
                            isSidebarOpen ? "w-[85%]" : "w-full"
                        } h-full`}
                    >
                        <div className="">{children}</div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </IsLogin>
    );
};

export default layout;

"use client";
import Footer from "@/components/Footer";
import Header from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import Sidebarold from "@/components/Trash/sidebarterakhir";
import { IsLogin } from "@/validation/IsLogin";
import Link from "next/link";
import React, { useState } from "react";

const layout = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <IsLogin>
            <div className="w-full h-full relative bg-[#00A6B4] bg-opacity-25 ">
                <Header title="DAMAS" />
                <button onClick={toggleSidebar}>open</button>
                <div className="w-full h-full relative pb-10 flex">
                    <div className={`relative ${isSidebarOpen ? "w-[15%]" : "w-0 -translate-x-[1000px]"} `}>
                    {/* <div className="hidden lg:block lg:w-[15%]"> */}
                    {/* <div className="relative w-relative"> */}
                        <Sidebar />
                        {/* <Sidebarold /> */}
                    </div>
                    <div className={`px-6 ${isSidebarOpen ? "w-[85%]" : "w-full"} h-full`}>
                        <div className="">{children}</div> 
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </IsLogin>
    );
};

export default layout;

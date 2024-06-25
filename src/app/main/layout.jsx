"use client";
import Footer from "@/components/Footer";
import Header from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import { IsLogin } from "@/validation/IsLogin";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
    return (
        <IsLogin>
            <div className="w-full h-full relative bg-[#00A6B4] bg-opacity-25 ">
                <Header title="DAMAS" />
                <div className="w-full h-full relative pb-10 flex">
                    <div className="relative">
                        <Sidebar />
                    </div>
                    <div className="px-6 w-full h-full">
                        <div className="">{children}</div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </IsLogin>
    );
};

export default layout;

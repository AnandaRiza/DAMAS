"use client"
import Footer from "@/components/Footer";
import Navbarnew from "@/components/navbarnew";
import Sidebarnew from "@/components/sidebarnew";
import Cardtesting from "@/components/Headertesting";
import { IsLogin } from "@/validation/IsLogin";
import React from "react";

const layout = ({ children }) => {
    return (
        <IsLogin>
            <div className="min-h-[100vh] bg-[#00A6B4] bg-opacity-25 ">
            <Navbarnew title="DAMAS" />
                <div className="w-full relative pb-10 flex">
                    <Sidebarnew />
                    <div className="px-10 w-full">
                        <div className="">{children}</div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </IsLogin>
    );
};

export default layout;

"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ title }) => {
    const router = useRouter();
    const [isProfileShow, setIsProfileShow] = useState(false);
    const [isLogoutShow, setIsLogoutShow] = useState(false);

    const handleLogout = () => {
        document.cookie = "token=; expires=; path=/";
        router.push("/login");
    };

    return (
        <div className="flex justify-between items-center p-3 bg-[#00A6B4] bg-opacity-25 px-8 h-20 font-roboto text-5xl">
            <Link href="/main">
                <button className="text-2xl text-[#0066AE] font-bold">
                    {title}
                </button>
            </Link>
            <div className="dropdown">
                <button
                    className="flex items-center font-roboto text-base tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
                    onClick={() => setIsProfileShow(!isProfileShow)}
                >
                    <CgProfile className="mr-1" />
                    <span className="flex items-center font-roboto text-base tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
                        Mayastri Devana
                    </span>
                    <IoMdArrowDropdown className="mt-1" />
                </button>
                <div className="dropdown-content flex flex-col items-start ml-5 mt-1">
                    {/* <Link href="/profile">
              <button className="flex items-center font-roboto text-base tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
                Profile
              </button>
            </Link > */}

                    <button
                        type="button"
                        className="flex items-center font-roboto text-base tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

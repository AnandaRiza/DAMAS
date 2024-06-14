"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PleaseWait from "./PleaseWait";
import axios from "axios";

const Header = ({ title }) => {
    const router = useRouter();
    const [isProfileShow, setIsProfileShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogoutShow, setIsLogoutShow] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const userid = document.cookie
                .split("; ")
                .find((row) => row.startsWith("DAMAS-USERID="))
                ?.split("=")[1];
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/logout?userid=${userid}`
            );
            document.cookie = "DAMAS-USERID=; Max-Age=0; Path=/";
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="navbar bg-[#FFFFFF] rounded shadow-lg">
  <div className="flex-1">
    <a className="ml-10 text-xl font-bold text-[#0066AE]" href="/main">DAMAS</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
        <details className="mr-10">
          <summary className="font-bold text-[#0066AE]">
            Welcome Riza Ganteng
          </summary>
          <ul className="rounded-t-none text-black absolute top-full right-10 z-10 shadow-md">
            <li>
              <button className="btn btn-error" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    );
};

export default Header;
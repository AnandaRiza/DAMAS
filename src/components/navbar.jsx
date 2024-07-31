"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";
import Image from "next/image";
import logo2 from '../assets/logo2.png'; // Correct relative path

const Header = ({ title }) => {
  const router = useRouter();
  const { user } = useStateContext();
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
    <div className="navbar bg-[#FFFFFF] rounded shadow-lg w-full h-full">
      <div className="flex-1">
      <a href="/main" className="ml-4">
          <Image src={logo2} alt="Damas Logo" width={150} />
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            Welcome,{" "}
            <span className="font-bold capitalize">{user?.userdomain}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
            <li>
              <a className="btn btn-error" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

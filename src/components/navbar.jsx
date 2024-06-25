"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";

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
        <a className="ml-10 text-xl font-bold text-[#0066AE]" href="/main">
          DAMAS
        </a>
      </div>
      <div className="flex-none">
        {/* <ul className="menu menu-horizontal px-1">
                    <li>
                        <details className="mr-10">
                            <h3 className="font-bold text-[#0066AE]">
                                Welcome,{" "}
                                <span className="font-bold capitalize">
                                    {user.username}
                                </span>
                            </h3>
                            <ul className="rounded-t-none text-black absolute top-full right-10 z-10 shadow-md">
                                <li>
                                    <button
                                        className="btn btn-error"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul> */}

        {/* <div className="pr-3 relative">
          <h3
            onClick={() => setIsLogoutShow(!isLogoutShow)}
            className="font-bold text-[#0066AE] cursor-pointer"
          >
            Welcome,{" "}
            <span className="font-bold capitalize">{user.username}</span>
          </h3>

          {isLogoutShow && (
            <div className="bg-white rounded-xl shadow-md py-5 px-10 absolute top-10 right-2 z-50">
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div> */}

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details className="mr-5">
                <summary className="font-bold text-[#0066AE]" style={{ fontSize: '1rem' }}>
                  Welcome,{" "}
                  <span className="font-bold capitalize">{user.username}</span>
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
    </div>
  );
};

export default Header;

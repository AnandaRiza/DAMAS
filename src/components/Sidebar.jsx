"use client";
import React, { useEffect, useState } from "react";
import { PiPath } from "react-icons/pi";
import { GoFile } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { CiMemoPad } from "react-icons/ci";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Pastikan untuk mengirimkan token autentikasi jika diperlukan
  //           'Authorization': 'Bearer ' + localStorage.getItem('token')
  //         }
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error('Failed to fetch user:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const [isSdlcShow, setIsSdlcShow] = useState(false);
  const [isPpoSdlcShow, setIsPpoSdlcShow] = useState(false);
  const [isPpoSkseShow, setIsPpoSkseShow] = useState(false);
  const [IsOpsMonitorSystemShow, setIsOpsMonitorSystemShow] = useState(false);
  const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] = useState(false);
  // const [isOperationMonitoringSystemShow, setOperationMonitoringSystemShow] =
  //   useState(false);
  const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);
  // const user = {
  //   role: "SUPER_ADMIN",
  //   role: "DEV_ADMIN"
  // };
  return (

    // Start Button Development
    <div className="bg-[#00A6B4]/[0.5] text-black w-80 min-h-screen p-4 sticky top-0">
      <span className="text-[#0066AE] font-semibold">Development</span>
      <div className="h-[0.5px] bg-black"></div>
      <div className="">
        {/* {user && user.role === "SUPER_ADMIN" &&(
            <div className="">
            menampilkan yg diinginkan
            </div>
        )} */}
        <button
            className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
            onClick={() => setIsSdlcShow(!isSdlcShow)}
          >
            
            <span className="flex items-center">
              <MdArrowDropDown className="mr-1" />
              SDLC
            </span>
          </button>
        <div
          className={`${
            isSdlcShow ? "flex flex-col items-start pl-5 mt-2" : "hidden"
          }  `}
        >
          <Link href="/main/development">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <PiPath className="mr-1" />
              All Project
            </button>
          </Link>
          <Link href="/main/development/myproject">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <GoTasklist className="mr-1" />
              My Project
            </button>
          </Link>
          <Link href="/main/development/createnewproject">
            <button className="flex items-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <IoCreateOutline className="mr-1" />
              Create New Project
            </button>
          </Link>
        </div>
      </div>
      {/* End Button Development */}
      

      {/* Start Button PPO */}
      <div className="mt-3">
        <span className="text-[#0066AE] font-semibold">PPO</span>
        <div className="h-[0.5px] bg-black"></div>
        <div className="">
          <button
            className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
            onClick={() => setIsPpoSdlcShow(!isPpoSdlcShow)}
          >
            <span className="flex items-center">
              <MdArrowDropDown className="mr-1" />
              SDLC
            </span>
          </button>
        </div>
        <div
          className={`${
            isPpoSdlcShow ? "flex  flex-col items-start pl-5 mt-2" : "hidden"
          }  `}
        >
          <Link href="/main/ppo">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <PiPath className="mr-1" />
              All Project
            </button>
          </Link>
          <Link href="/main/ppo/myproject">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <GoTasklist className="mr-1" />
              My Project
            </button>
          </Link>
          <Link href="/main/ppo/createnewproject">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <IoCreateOutline className="mr-1" />
              Create New Project
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <button
          className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-gray-600 mb-4"
          onClick={() => setIsPpoSkseShow(!isPpoSkseShow)}
        >
          <span className="flex items-center">
            <MdArrowDropDown className="mr-1" />
            SK/SE
          </span>
        </button>
        <div
          className={`${
            isPpoSkseShow ? "flex  flex-col items-start pl-5 mt-2" : "hidden"
          }  `}
        >
          <Link href="/main/ppo/allskse">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <GoFile className="mr-1" />
              All SK/SE
            </button>
          </Link>
          <Link href="/main/ppo/myskse">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <FaRegFolderOpen className="mr-1" />
              My SK/SE
            </button>
          </Link>
          <Link href="/main/ppo/createnewskse">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <IoCreateOutline className="mr-1" />
              Create New SK/SE
            </button>
          </Link>
        </div>
      </div>
      {/* End Button PPO */}
      

      {/* Start Button Operation */}
      <div className="mt-3">
        <span className="text-[#0066AE] font-semibold">Operation</span>
        <div className="h-[0.5px] bg-black"></div>
        <div className="">
          <button
            className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
            onClick={() => setIsOpsMonitorSystemShow(!IsOpsMonitorSystemShow)}
          >
            <span className="flex items-center">
              <MdArrowDropDown className="mr-1" />
              Monitoring System
            </span>
          </button>
        </div>
        <div
          className={`${
            IsOpsMonitorSystemShow ? "flex  flex-col items-start pl-5 mt-2" : "hidden"
          }  `}
        >
          <Link href="/main/operation">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <PiPath className="mr-1" />
              Monitoring System
            </button>
          </Link>
          <Link href="/main/operation/settingthreshold">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <GoTasklist className="mr-1" />
              Setting Threshold
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <button
          className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-gray-600 mb-4"
          onClick={() => setIsOpsMonitorNetworkShow(!IsOpsMonitorNetworkShow)}
        >
          <span className="flex items-center">
            <MdArrowDropDown className="mr-1" />
            Monitoring Network
          </span>
        </button>
        <div
          className={`${
            IsOpsMonitorNetworkShow ? "flex  flex-col items-start pl-5 mt-2" : "hidden"
          }  `}
        >
          <Link href="/main/operation/allprogress">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <GoFile className="mr-1" />
              All Network Progress
            </button>
          </Link>
          <Link href="/main/operation/myprogress">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
              <FaRegFolderOpen className="mr-1" />
              My Progress
            </button>
          </Link>
          <Link href="/main/operation/createnewprogress">
            <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <IoCreateOutline className="mr-1" />
              Create New Progress
            </button>
          </Link>
        </div>
      </div>
      {/* End Button Operation */}

      {/* Start Button Logistic */}
      <div>
        {/* <span className="text-[#0066AE] font-semibold">Operation</span>
        <div className=" h-[0.5px] bg-black"></div>
        <Link href="/main/operation">
          <button className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
            <span className="flex items-center">
              <IoStatsChartOutline className="mr-1" />
              Monitoring System
            </span>
          </button>
        </Link>
        <Link href="/main/operation/monitoringnetwork">
          <button className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
            <span className="flex items-center">
              <IoMdSettings className="mr-1" />
              Monitoring Network
            </span>
          </button>
        </Link> */}


        
        <div>
          <span className="text-[#0066AE] font-semibold">Logistic</span>
          <div className="h-[0.5px] bg-black"></div>
          <button
            className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600"
            onClick={() => setIsLogisticMemoShow(!isLogisticMemoShow)}
          >
            <span className="flex items-center">
              <MdArrowDropDown className="mr-1" />
              Memo
            </span>
          </button>
          <div
            className={`${
              isLogisticMemoShow
                ? "flex  flex-col items-start pl-5 mt-2"
                : "hidden"
            }  `}
          >
            <Link href="/main/logistic">
              <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
                <CiMemoPad className="mr-1" />
                All Memo
              </button>
            </Link>
            <Link href="/main/logistic/mymemo">
              <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
                <FaRegFolderOpen className="mr-1" />
                My Memo
              </button>
            </Link>
            <Link href="/main/logistic/createnewmemo">
              <button className="flex items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600">
                <IoCreateOutline className="mr-1" />
                Create New Memo
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* End Button Logistic */}
    </div>
  );
};

export default Sidebar;

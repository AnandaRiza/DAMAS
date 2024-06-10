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

  const [isSdlcShow, setIsSdlcShow] = useState(false);
  const [isPpoSdlcShow, setIsPpoSdlcShow] = useState(false);
  const [isPpoSkseShow, setIsPpoSkseShow] = useState(false);
  const [IsOpsMonitorSystemShow, setIsOpsMonitorSystemShow] = useState(false);
  const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] = useState(false);
  const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen 
        // state to control width and visibility
        className={`bg-[#00A6B4]/[0.5] text-black 
                    min-h-screen transition-all p-4
                    duration-300 z-10 rounded
                    ${isOpen ? 'w-64' : 'w-0 overflow-hidden px-0 py-0'
          }`}>
        {/* Sidebar content */}
        <span className="text-[#0066AE] font-semibold">Development</span>
      <div className="h-[0.5px] bg-black"></div>
      <div className="">
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
      {/* Main content */}
      <div className={`flex-1 p-4 
                        ${isOpen ? 'ml-30' : 'ml-0'}`}>
        {/* Button to toggle sidebar */}
        <div className="ml-auto">
          <button
            className="bg-[#00A6B4] hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}>
            {/* Toggle icon based on isOpen state */}
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;

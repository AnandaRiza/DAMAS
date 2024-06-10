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
import { IconName } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";
import { IoIosGitNetwork } from "react-icons/io";
import { FaServer } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { GoWorkflow } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";

const Sidebar = () => {

  const [isSdlcShow, setIsSdlcShow] = useState(false);
  const [isPpoSdlcShow, setIsPpoSdlcShow] = useState(false);
  const [isPpoSkseShow, setIsPpoSkseShow] = useState(false);
  const [IsOpsMonitorSystemShow, setIsOpsMonitorSystemShow] = useState(false);
  const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] = useState(false);
  const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="bg-[#00A6B4]/[0.5] text-w w-80 min-h-screen p-4 ml-4 mt-3 rounded-xl ">
      <ul className="collapse collapse-arrow ">
  <li>
    <a>
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />

      {/* start button Dev */}
        <div className="collapse-title text-xl font-medium font-bold flex items-center">
    <div className="mr-2">
    <FaProjectDiagram />
    </div>
      Development
    </div>

    <div className="collapse-content">

    <Link href="/main/development/myproject">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/development">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/development/createnewproject">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Project</button>
    </div>
    </Link>
  </div>

    </div>

    <hr className="my-4 border-gray-300" />
    {/* End Button Dev */}


    {/* start button PPO */}
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
  <div className="mr-2">
    
  <HiOutlineClipboardDocumentList />
    </div>  
      PPO
    </div>
    <div className="collapse-content"> 
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
    <div className="mr-2">
    <GoWorkflow />
    </div>
    SDLC
    </div>

        <div className="collapse-content">

    <Link href="/main/ppo/myproject">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/ppo">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/ppo/createnewproject">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Project</button>
    </div>
    </Link>
  </div>


    </div>
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
  <div className="mr-2">
  <AiOutlineMail />
    </div>
        SK/SE
    </div>

    <div className="collapse-content">

    <Link href="/main/ppo/myskse">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My SK/SE</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/ppo/allskse">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All SK/SE</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/ppo/createnewskse">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New SK/SE</button>
    </div>
    </Link>
  </div>

    </div>
  </div>
    </div>
    {/* End Button PPO */}

    <hr className="my-4 border-gray-300" />

    {/* start button Operation */}
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
    <div className="mr-2">
    <FaUsersGear />
    </div>
      Operation
    </div>
    <div className="collapse-content"> 
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
    <div className="mr-2">
    <IoIosGitNetwork />
    </div>
    Network
    </div>
    <div className="collapse-content">

    <Link href="/main/operation/network/myprogress">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My Network Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/operation/network/allprogress">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All Network Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/operation/network/createnewprogress">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Network Project</button>
    </div>
    </Link>
  </div>

    </div>
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center ">
    <div className="mr-2">
    <FaServer />
    </div>
    Server
    </div>

    <div className="collapse-content">

    <Link href="/main/operation/server/myserver">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My Server Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/operation/server/allserver">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All Server Project</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/operation/server/createnewserver">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Server Project</button>
    </div>
    </Link>
  </div>
    </div>

    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
    <div className="mr-2">
    <MdMonitor />

    </div>
    Monitoring
    </div>

     <div className="collapse-content">

     <Link href="/main/logistic/mymemo">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Grafana</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/logistic">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">SNMP</button>
    </div>
    </Link>

    {/* <hr className="my-4 border-gray-300" /> */}

    {/* <Link href="/main/logistic/createnewmemo">
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Memo</button>
    </div>
    </Link> */}
  </div>
    </div>
  </div>
    </div>
    {/* end button Operation */}

    <hr className="my-4 border-gray-300" />

    {/* start button Logistic */}
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
  <div className="collapse-title text-xl font-medium font-bold flex items-center">
  <div className="mr-2">
  <FaTools />
    </div>
        Logistic
    </div>
        <div className="collapse-content">

        <Link href="/main/logistic/mymemo">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">My Memo</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/logistic">
    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">All Memo</button>
    </div>
    </Link>

    <hr className="my-4 border-gray-300" />

    <Link href="/main/logistic/createnewmemo"> 
    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New Memo</button>
    </div>
    </Link>
  </div>
    </div>
    {/* end button Logistic */}
    


    </a>
  </li>
</ul>
    </div>
    
    
  );
};

export default Sidebar;

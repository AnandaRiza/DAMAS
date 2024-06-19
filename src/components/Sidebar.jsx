"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUsersGear } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";
import { IoIosGitNetwork } from "react-icons/io";
import { FaServer } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { GoWorkflow } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { MdApproval } from "react-icons/md";

const Sidebar = () => {
    const [isSdlcShow, setIsSdlcShow] = useState(false);
    const [isPpoSdlcShow, setIsPpoSdlcShow] = useState(false);
    const [isPpoSkseShow, setIsPpoSkseShow] = useState(false);
    const [IsOpsMonitorSystemShow, setIsOpsMonitorSystemShow] = useState(false);
    const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] =
        useState(false);
    const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-[#00A6B4]/[0.5] text-w w-full h-full p-4 ml-4 mt-3 rounded-xl shadow-r-md">
            <ul className="collapse collapse-arrow ">
                <li>
                    <a>
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                        >
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
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            My Project
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/development">
                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            All Project
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/development/createnewproject">
                                    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            Create New Project
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <hr className="my-4 border-gray-300" />
                        {/* End Button Dev */}

                        {/* start button PPO */}
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                        >
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title text-xl font-medium font-bold flex items-center">
                                <div className="mr-2">
                                    <HiOutlineClipboardDocumentList />
                                </div>
                                PPO
                            </div>
                            <div className="collapse-content">
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
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
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    My Project
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/ppo">
                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    All Project
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/ppo/createnewproject">
                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Create New Project
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200"
                                >
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
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    My SK/SE
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/ppo/allskse">
                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    All SK/SE
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/ppo/createnewskse">
                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Create New SK/SE
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Button PPO */}

                        <hr className="my-4 border-gray-300" />

                        {/* start button Operation */}
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                        >
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title text-xl font-medium font-bold flex items-center">
                                <div className="mr-2">
                                    <FaUsersGear />
                                </div>
                                Operation
                            </div>
                            <div className="collapse-content">
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
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
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    My Network Project
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/network/allprogress">
                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    All Network Project
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                            <Link href="/main/operation/network/createnewprogress">
                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">Create New  Project</button>
                            </div>
                            </Link>
                        </div>

                            </div>
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
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
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                My Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />
                                        
                                        <Link href="/main/operation/server/allserver">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/server/createnewserver">
                                        <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                Create New  Project
                                            </button>
                                        </div>
                                         </Link>
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-xl font-medium font-bold flex items-center ">
                                        <div className="mr-2">
                                        <FaDatabase />
                                        </div>
                                        Data Center
                                    </div>
                                    <div className="collapse-content">
                                    <Link href="/main/operation/datacenter/myprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                My Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />
                                        
                                        <Link href="/main/operation/datacenter/allprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/datacenter/createnewprogress">
                                        <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                Create New  Project
                                            </button>
                                        </div>
                                         </Link>
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-xl font-medium font-bold flex items-center ">
                                        <div className="mr-2">
                                        <BiSupport />
                                        </div>
                                        IT Support
                                    </div>
                                    <div className="collapse-content">
                                    <Link href="/main/operation/itsupport/myprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                My Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />
                                        
                                        <Link href="/main/operation/itsupport/allprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/itsupport/createnewprogress">
                                        <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                Create New  Project
                                            </button>
                                        </div>
                                         </Link>
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-xl font-medium font-bold flex items-center ">
                                        <div className="mr-2">
                                        <GrUserManager />
                                        </div>
                                        IT-MO
                                    </div>
                                    <div className="collapse-content">
                                    <Link href="/main/operation/itmo/myprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                My Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />
                                        
                                        <Link href="/main/operation/itmo/allprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/itmo/createnewprogress">
                                        <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                Create New  Project
                                            </button>
                                        </div>
                                         </Link>
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-xl font-medium font-bold flex items-center ">
                                        <div className="mr-2">
                                        <MdOutlineSecurity />
                                        </div>
                                        IT Security
                                    </div>
                                    <div className="collapse-content">
                                    <Link href="/main/operation/itsecurity/myprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                My Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />
                                        
                                        <Link href="/main/operation/itsecurity/allprogress">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="/main/operation/itsecurity/createnewprogress">
                                        <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                Create New  Project
                                            </button>
                                        </div>
                                         </Link>
                                    </div>
                                </div>

                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-xl font-medium font-bold flex items-center">
                                        <div className="mr-2">
                                            <MdMonitor />
                                        </div>
                                        Monitoring
                                    </div>

                                    <div className="collapse-content">
                                        <Link href="">
                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Grafana
                                                </button>
                                            </div>
                                        </Link>

                                        <hr className="my-4 border-gray-300" />

                                        <Link href="">
                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    SNMP
                                                </button>
                                            </div>
                                        </Link>

                                        {/* <hr className="my-4 border-gray-300" /> */}

                                        {/* <Link href="/main/logistic/createnewmemo">
                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Create New Memo
                                                </button>
                                            </div>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end button Operation */}

                        <hr className="my-4 border-gray-300" />

                        {/* start button Logistic */}
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                        >
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
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            My Memo
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/logistic">
                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            All Memo
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/logistic/createnewmemo">
                                    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            Create New
                                         Memo</button>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <hr className="my-4 border-gray-300" />
                        {/* end button Logistic */}

                         {/* start button Approvement */}
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                        >
                            <input type="checkbox" className="peer" />

                            {/* start button Approval */}
                            <div className="collapse-title text-xl font-medium font-bold flex items-center">
                                <div className="mr-2">
                                <MdApproval />
                                </div>
                                Approval 
                            </div>

                            <div className="collapse-content">
                                <Link href="/main/status/approveprojectdev">
                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            SDLC
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/status/approveskse">
                                    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            SK/SE
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />

                                <Link href="/main/status/approveoperation">
                                    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            Operation
                                        </button>
                                    </div>
                                </Link>

                                <hr className="my-4 border-gray-300" />


                                <Link href="/main/status/approvelogistic">
                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                            Logistic
                                        </button>
                                    </div>
                                </Link>

                                
                                
                            </div>
                        </div>
                        {/* End Button Approvement */}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

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
import {
    IsDacenOperator,
    IsDevOperator,
    IsDevSupervisor,
    IsItmoOperator,
    IsItsecurityOperator,
    IsItsupportOperator,
    IsLogisticOperator,
    IsLogisticSupervisor,
    IsNetworkOperator,
    IsOperationSupervisor,
    IsOperator,
    IsPpoOperator,
    IsPpoSupervisor,
    IsReviewerSupervisor,
    IsServerOperator,
    IsSkseOperator,
    IsSupervisor,
} from "@/validation/validateGroupAkses";

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
            <div className="collapse collapse-arrow ">
                <div>
                    <div>
                        {(IsDevSupervisor() ||
                            IsOperator() ||
                            IsSupervisor() ||
                            IsDevOperator()) && (
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                            >
                                <input type="checkbox" className="peer" />

                                {/* start button Dev */}
                                <div className="collapse-title text-xl font-bold flex items-center">
                                    <div className="mr-2">
                                        <FaProjectDiagram />
                                    </div>
                                    Development
                                </div>

                                <div className="collapse-content">
                                    {(IsDevOperator() || IsOperator()) && (
                                        <div>
                                            <Link href="/main/development/myproject">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        My Project
                                                    </button>
                                                </div>
                                            </Link>
                                            <hr className="my-4 border-gray-300" />
                                        </div>
                                    )}

                                    <Link href="/main/development">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Project
                                            </button>
                                        </div>
                                    </Link>

                                    {(IsDevOperator() || IsOperator()) && (
                                        <div>
                                            <hr className="my-4 border-gray-300" />
                                            <Link href="/main/development/createnewproject">
                                                <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        Create New Project
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* End Button Dev */}

                        {/* start button PPO */}
                        {(IsPpoSupervisor() ||
                            IsPpoOperator() ||
                            IsSupervisor() ||
                            IsSkseOperator() ||
                            IsOperator()) && (
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                            >
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title text-xl  font-bold flex items-center">
                                    <div className="mr-2">
                                        <HiOutlineClipboardDocumentList />
                                    </div>
                                    PPO
                                </div>
                                <div className="collapse-content">
                                    {(IsPpoOperator() ||
                                        IsSupervisor() ||
                                        IsOperator() ||
                                        IsPpoSupervisor()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center">
                                                <div className="mr-2">
                                                    <GoWorkflow />
                                                </div>
                                                SDLC
                                            </div>

                                            <div className="collapse-content">
                                                {(IsPpoOperator() ||
                                                    IsOperator()) && (
                                                    <div>
                                                        <Link href="/main/ppo/myproject">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/ppo">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsPpoOperator() ||
                                                    IsOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />
                                                        <Link href="/main/ppo/createnewproject">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {(IsSkseOperator() ||
                                        IsSupervisor() ||
                                        IsOperator() ||
                                        IsPpoSupervisor() ||
                                        IsSkseOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center">
                                                <div className="mr-2">
                                                    <AiOutlineMail />
                                                </div>
                                                SK/SE
                                            </div>

                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsSkseOperator()) && (
                                                    <div>
                                                        <Link href="/main/ppo/myskse">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My SK/SE
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/ppo/allskse">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All SK/SE
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsOperator() ||
                                                    IsSkseOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/ppo/createnewskse">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    SK/SE
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* End Button PPO */}

                        {/* start button Operation */}
                        {(IsSupervisor() ||
                            IsOperationSupervisor() ||
                            IsNetworkOperator() ||
                            IsServerOperator() ||
                            IsDacenOperator() ||
                            IsItmoOperator() ||
                            IsItsecurityOperator() ||
                            IsItsupportOperator() ||
                            IsOperator()) && (
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                            >
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title text-xl  font-bold flex items-center ">
                                    <div className="mr-2">
                                        <FaUsersGear />
                                    </div>
                                    Operation
                                </div>
                                <div className="collapse-content">
                                    {(IsOperationSupervisor() ||
                                        IsNetworkOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl font-bold flex items-center">
                                                <div className="mr-2">
                                                    <IoIosGitNetwork />
                                                </div>
                                                Network
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsNetworkOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/network/myprogress">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Network
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/operation/network/allprogress">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Network Project
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsOperator() ||
                                                    IsNetworkOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/operation/network/createnewprogress">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {(IsOperationSupervisor() ||
                                        IsServerOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center ">
                                                <div className="mr-2">
                                                    <FaServer />
                                                </div>
                                                Server
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsServerOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/server/myserver">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/operation/server/allserver">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>
                                                {(IsOperator() ||
                                                    IsServerOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/operation/server/createnewserver">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {(IsOperationSupervisor() ||
                                        IsDacenOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center ">
                                                <div className="mr-2">
                                                    <FaDatabase />
                                                </div>
                                                Data Center
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsDacenOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/datacenter/myprogress">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/operation/datacenter/allprogress">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsOperator() ||
                                                    IsDacenOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/operation/datacenter/createnewprogress">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {(IsOperationSupervisor() ||
                                        IsItsupportOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center ">
                                                <div className="mr-2">
                                                    <BiSupport />
                                                </div>
                                                IT Support
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsItsupportOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/itsupport/myprogress">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/operation/itsupport/allprogress">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsOperator() ||
                                                    IsItsupportOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/operation/itsupport/createnewprogress">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {(IsOperationSupervisor() ||
                                        IsItmoOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center ">
                                                <div className="mr-2">
                                                    <GrUserManager />
                                                </div>
                                                IT-MO
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsItmoOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/itmo/myprogress">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}

                                                <Link href="/main/operation/itmo/allprogress">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>

                                                {(IsOperator() ||
                                                    IsItmoOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />
                                                        <Link href="/main/operation/itmo/createnewprogress">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {(IsOperationSupervisor() ||
                                        IsItsecurityOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center ">
                                                <div className="mr-2">
                                                    <MdOutlineSecurity />
                                                </div>
                                                IT Security
                                            </div>
                                            <div className="collapse-content">
                                                {(IsOperator() ||
                                                    IsItsecurityOperator()) && (
                                                    <div>
                                                        <Link href="/main/operation/itsecurity/myprogress">
                                                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    My Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        <hr className="my-4 border-gray-300" />
                                                    </div>
                                                )}

                                                <Link href="/main/operation/itsecurity/allprogress">
                                                    <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            All Project
                                                        </button>
                                                    </div>
                                                </Link>
                                                {(IsOperator() ||
                                                    IsItsecurityOperator()) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/operation/itsecurity/createnewprogress">
                                                            <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                                <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                                    Create New
                                                                    Project
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {(IsOperationSupervisor() ||
                                        IsNetworkOperator() ||
                                        IsServerOperator() ||
                                        IsSupervisor() ||
                                        IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center">
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
                                    )}
                                </div>
                            </div>
                        )}

                        {/* end button Operation */}

                        {/* start button Logistic */}
                        {(IsLogisticSupervisor() ||
                            IsLogisticOperator() ||
                            IsOperator() ||
                            IsSupervisor() ||
                            IsReviewerSupervisor()) && (
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                            >
                                <input type="checkbox" className="peer" />

                                <div className="collapse-title text-xl  font-bold flex items-center">
                                    <div className="mr-2">
                                        <FaTools />
                                    </div>
                                    Logistic
                                </div>

                                <div className="collapse-content">
                                    {IsLogisticOperator()|| IsOperator() && (
                                        <div>
                                            <Link href="/main/logistic/mymemo">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        My Memo
                                                    </button>
                                                </div>
                                            </Link>
                                            <hr className="my-4 border-gray-300" />
                                        </div>
                                    )}

                                    <Link href="/main/logistic">
                                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                All Memo
                                            </button>
                                        </div>
                                    </Link>

                                    {IsLogisticOperator()|| IsOperator() && (
                                        <div>
                                            <hr className="my-4 border-gray-300" />

                                            <Link href="/main/logistic/createnewmemo">
                                                <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        Create New Memo
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* end button Logistic */}

                        {/* start button Approvement */}

                        {(IsSupervisor() ||
                            IsDevSupervisor() ||
                            IsPpoSupervisor() ||
                            IsLogisticSupervisor() ||
                            IsOperationSupervisor() || IsOperator() ||
                            IsReviewerSupervisor()) && (
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-200"
                            >
                                <input type="checkbox" className="peer" />

                                {/* start button Approval */}
                                <div className="collapse-title text-xl  font-bold flex items-center">
                                    <div className="mr-2">
                                        <MdApproval />
                                    </div>
                                    Approval
                                </div>

                                <div className="collapse-content">
                                    {(IsPpoSupervisor() ||
                                        IsSupervisor() ||
                                        IsDevSupervisor() || IsOperator()) && (
                                        <div>
                                            <Link href="/main/status/approveprojectdev">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        SDLC
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    )}

                                    {(IsPpoSupervisor() || IsSupervisor()) || IsOperator() && (
                                        <div>
                                            <hr className="my-4 border-gray-300" />

                                            <Link href="/main/status/approveskse">
                                                <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        SK/SE
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    )}

                                    {(  IsLogisticSupervisor() ||
                                        IsSupervisor() || IsOperator() ) && (
                                        <div>
                                            <hr className="my-4 border-gray-300" />

                                            <Link href="/main/status/approvelogistic">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Logistic Reviewer 
                                                    </button>
                                                </div>
                                            </Link>
                                            <hr className="my-4 border-gray-300" />
                                        </div>
                                    )}

                                    {(IsReviewerSupervisor() ||
                                        IsSupervisor() || IsOperator()) && (
                                        <div>
                                            <hr className="my-4 border-gray-300" />

                                            <Link href="/main/status/approvelogistic_supervisor">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                    Logistic Supervisor
                                                    </button>
                                                </div>
                                            </Link>
                                            <hr className="my-4 border-gray-300" />
                                        </div>
                                    )}

                                    {/* start button Operation */}
                                    {(IsSupervisor() ||
                                        IsOperationSupervisor() || IsOperator()) && (
                                        <div
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                                        >
                                            <input
                                                type="checkbox"
                                                className="peer"
                                            />
                                            <div className="collapse-title text-xl  font-bold flex items-center">
                                                <div className="mr-2">
                                                    <FaUsersGear />
                                                </div>
                                                Operation
                                            </div>
                                            <div className="collapse-content">
                                                {(IsNetworkOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator() ) && (
                                                    <div>
                                                        <Link href="/main/status/approveoperation/network">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <IoIosGitNetwork />
                                                                </div>
                                                                Network
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                                {(IsServerOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator() ) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/status/approveoperation/server">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <FaServer />
                                                                </div>
                                                                Server
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}

                                                {(IsDacenOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator() ) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/status/approveoperation/dacen">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <FaDatabase />
                                                                </div>
                                                                Data Center
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}

                                                {(IsItsupportOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator() ) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/status/approveoperation/itsupport">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <BiSupport />
                                                                </div>
                                                                IT Support
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}

                                                {(IsItmoOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator() ) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/status/approveoperation/itmo">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <GrUserManager />
                                                                </div>
                                                                IT MO
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}

                                                {(IsItsecurityOperator() || IsSupervisor() ||
                                                    IsOperationSupervisor()|| IsOperator()  ) && (
                                                    <div>
                                                        <hr className="my-4 border-gray-300" />

                                                        <Link href="/main/status/approveoperation/itsecurity">
                                                            <div className="collapse-title font-bold flex items-center hover:bg-[#ACC8E5] rounded mb-2 bg-base-200 ">
                                                                <div className="mr-2">
                                                                    <MdOutlineSecurity />
                                                                </div>
                                                                IT Security
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {/* end button Operation */}
                                </div>
                            </div>
                        )}
                        {/* End Button Approvement */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

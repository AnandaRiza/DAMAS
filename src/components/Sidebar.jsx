"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUsersGear } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsBuildingFillGear } from "react-icons/bs";
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
  IsOperatorDev,
  IsOperatorOps,
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
  const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] = useState(false);
  const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen
        // state to control width and visibility
        className={`text-black 
                  min-h-screen transition-all
                  duration-300 z-10 rounded
                  ${isOpen ? "w-full" : "w-0 overflow-hidden"}`}
      >
        <div className="bg-[#00A6B4]/[0.5] text-w w-full h-full p-4 ml-4 mt-3 rounded-xl shadow-r-md">
          <div className="collapse collapse-arrow ">
            <div>
              <div>
                {(IsOperatorDev() || IsSupervisor()) && (
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
                      Project
                    </div>
                    <div className="collapse-content">
                      {(IsOperatorDev() || IsSupervisor() || IsOperatorOps) && (
                        <div>
                          <Link href="/main/development/home">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                Project Dashboard
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
                    </div>
                  </div>
                )}

                {/* End Button Dev */}

                {/* Start New Operation */}

                {(IsSupervisor() ||
                  IsOperationSupervisor() ||
                  IsNetworkOperator() ||
                  IsServerOperator() ||
                  IsDacenOperator() ||
                  IsItmoOperator() ||
                  IsItsecurityOperator() ||
                  IsItsupportOperator() ||
                  IsOperatorOps()) && (
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                  >
                    <input type="checkbox" className="peer" />

                    {/* start button NEWOP */}
                    <div className="collapse-title text-xl font-bold flex items-center">
                      <div className="mr-2">
                        <BsBuildingFillGear />
                      </div>
                      Operation
                    </div>

                    <div className="collapse-content">
                      {(IsOperationSupervisor() ||
                        IsNetworkOperator() ||
                        IsServerOperator() ||
                        IsDacenOperator() ||
                        IsItmoOperator() ||
                        IsItsecurityOperator() ||
                        IsItsupportOperator() ||
                        IsOperatorOps()) && (
                        <div>
                          <Link href="/main/operation/general">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                Operation Dashboard
                              </button>
                            </div>
                          </Link>
                          <hr className="my-4 border-gray-300" />
                        </div>
                      )}

                      {/* {(IsOperationSupervisor() ||
                        IsNetworkOperator() ||
                        IsServerOperator() ||
                        IsDacenOperator() ||
                        IsItmoOperator() ||
                        IsItsecurityOperator() ||
                        IsItsupportOperator() ||
                        IsOperatorOps() ||
                        IsSupervisor) && (
                        <div>
                          <Link href="/main/operation/general/myproject">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                My Project
                              </button>
                            </div>
                          </Link>
                          <hr className="my-4 border-gray-300" />
                        </div>
                      )} */}

                      <Link href="/main/operation/general/allproject">
                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                          <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                            All Project
                          </button>
                        </div>
                      </Link>

                      {(IsOperationSupervisor() ||
                        IsNetworkOperator() ||
                        IsServerOperator() ||
                        IsDacenOperator() ||
                        IsItmoOperator() ||
                        IsItsecurityOperator() ||
                        IsItsupportOperator() ||
                        IsOperatorOps()) && (
                        <div>
                          <hr className="my-4 border-gray-300" />
                          <Link href="/main/operation/general/createproject">
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

                {/* End Button NEW OP */}

                {/* start button Logistic */}
                {(IsLogisticSupervisor() ||
                  IsLogisticOperator() ||
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
                      <div>
                        <Link href="/main/logistic/home">
                          <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                            <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                              Memo Dashboard
                            </button>
                          </div>
                        </Link>
                        <hr className="my-4 border-gray-300" />
                      </div>

                      {(IsLogisticOperator() || IsSupervisor()) && (
                        <div>
                          <Link href="/main/logistic/general/allproject">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                Sorted Memo
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

                      {IsLogisticOperator() ||
                        (IsSupervisor() && (
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
                        ))}
                    </div>
                  </div>
                )}
                {/* end button Logistic */}

                {/* start button Approvement */}

                {(IsSupervisor() ||
                  IsDevSupervisor() ||
                  IsPpoSupervisor() ||
                  IsLogisticSupervisor() ||
                  IsOperationSupervisor() ||
                  IsReviewerSupervisor() ||
                  IsOperatorOps()) && (
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
                      {(IsLogisticSupervisor() || IsSupervisor()) && (
                        <div>
                          <Link href="/main/status/approvelogistic">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                Logistic Reviewer
                              </button>
                            </div>
                          </Link>
                          {/* <hr className="my-4 border-gray-300" /> */}
                        </div>
                      )}

                      {(IsReviewerSupervisor() || IsSupervisor()) && (
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

                      {(IsSupervisor() ||
                        IsOperationSupervisor() ||
                        IsOperatorOps) && (
                        <div>
                          <Link href="/main/status/approveoperation/general/approval">
                            <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                              <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                Operation
                              </button>
                            </div>
                          </Link>
                          {/* <hr className="my-4 border-gray-300" /> */}
                        </div>
                      )}

                      {/* start button Operation */}

                      {/* end button Operation */}
                    </div>
                  </div>
                )}
                {/* End Button Approvement */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 
                        ${isOpen ? "ml-30" : "ml-0"}`}
      >
        {/* Button to toggle sidebar */}
        <div style={{ position: "absolute", top: -50, right: 25 }}>
          <button
            className="bg-[#00A6B4] hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Toggle icon based on isOpen state */}
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

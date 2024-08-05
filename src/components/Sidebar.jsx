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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
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
                  {(IsOperatorDev() || IsSupervisor()) && (
                    <div>
                      <Link href="/main/development/home">
                        <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                          <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                            Dashboard Project
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
                            Home
                          </button>
                        </div>
                      </Link>
                      <hr className="my-4 border-gray-300" />
                    </div>
                  )}

                  {(IsOperationSupervisor() ||
                    IsNetworkOperator() ||
                    IsServerOperator() ||
                    IsDacenOperator() ||
                    IsItmoOperator() ||
                    IsItsecurityOperator() ||
                    IsItsupportOperator() ||
                    IsOperatorOps()) && (
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
                  )}

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

                  {(IsSupervisor() || IsOperationSupervisor()) && (
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
  );
};

export default Sidebar;

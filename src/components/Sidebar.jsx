"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { BsBuildingFillGear } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
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
    IsOperatorMemo,
    IsOperatorOps,
    IsPpoOperator,
    IsPpoSupervisor,
    IsReviewerSupervisor,
    IsServerOperator,
    IsSkseOperator,
    IsSupervisor,
} from "@/validation/validateGroupAkses";
import { CiMemoPad } from "react-icons/ci";

const Sidebar = () => {
    const [isSdlcShow, setIsSdlcShow] = useState(false);
    const [isPpoSdlcShow, setIsPpoSdlcShow] = useState(false);
    const [isPpoSkseShow, setIsPpoSkseShow] = useState(false);
    const [IsOpsMonitorSystemShow, setIsOpsMonitorSystemShow] = useState(false);
    const [IsOpsMonitorNetworkShow, setIsOpsMonitorNetworkShow] =
        useState(false);
    const [isLogisticMemoShow, setIsLogisticMemoShow] = useState(false);

    return (
        <div
            className={`fixed top-0 flex w-[270px] transition-width duration-300 h-full overflow-auto bg-[#00A6B4]/[0.5] text-w
                 p-2 ml-4 mt-20 rounded-xl shadow-r-md`}
        >
            <div className="">
                <div className={`flex flex-col w-full pb-40`}>
                    <div className="collapse collapse-arrow">
                        <div>
                            {(IsOperatorDev() || IsSupervisor()) && (
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                                >
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-lg font-bold flex items-center">
                                        <div className="mr-2">
                                            <FaProjectDiagram />
                                        </div>
                                        Project Application
                                    </div>
                                    <div className="collapse-content">
                                        {(IsOperatorDev() ||
                                            IsSupervisor() ||
                                            IsOperatorOps) && (
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
                                    <div className="collapse-title text-lg font-bold flex items-center">
                                        <div className="mr-2">
                                            <BsBuildingFillGear />
                                        </div>
                                        Project Operation
                                    </div>

                                    <div className="collapse-content">
                                        {(IsOperationSupervisor() ||
                                            IsNetworkOperator() ||
                                            IsServerOperator() ||
                                            IsDacenOperator() ||
                                            IsItmoOperator() ||
                                            IsItsecurityOperator() ||
                                            IsItsupportOperator() ||
                                            IsOperatorOps() ||
                                            IsSupervisor()) && (
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
                                        {(IsSupervisor() || IsOperatorOps()) &&

                                        <div>  
                                        <hr className="my-4 border-gray-300" />
                                            <Link href="/main/status/approveoperation/general/approval">
                                                <div className="hover:bg-[#ACC8E5] rounded mb-2 bg-base-200">
                                                    <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                        Approval
                                                    </button>
                                                </div>
                                            </Link>
                                            {/* <hr className="my-4 border-gray-300" /> */}
                                        </div>
                                    }
                                    </div>
                                </div>
                            )}

                            {/* End Button NEW OP */}

                            {/* start button Logistic */}
                            {(IsOperatorMemo() || IsSupervisor()) && (
                                <div
                                    tabIndex={0}
                                    className="collapse collapse-arrow border border-base-300 bg-base-200 mb-5"
                                >
                                    <input type="checkbox" className="peer" />

                                    <div className="collapse-title text-lg  font-bold flex items-center">
                                        <div className="mr-2">
                                            <CiMemoPad />
                                        </div>
                                        Memo
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

                                        {(IsOperatorMemo() ||
                                            IsSupervisor()) && (
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

                                        {IsOperatorMemo() && (
                                            <div>
                                                <hr className="my-4 border-gray-300" />

                                                <Link href="/main/logistic/createnewmemo">
                                                    <div className="hover:bg-[#85E495] rounded mb-2 bg-base-200">
                                                        <button className="mb-2 text-[#112A46] font-bold p-3 mt-2">
                                                            Register Memo
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

                            {(IsDevSupervisor() ||
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
                                    <div className="collapse-title text-lg font-bold flex items-center">
                                        <div className="mr-2">
                                            <MdApproval />
                                        </div>
                                        Approval
                                    </div>

                                    <div className="collapse-content">
                                        {IsLogisticSupervisor() && (
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

                                        {IsReviewerSupervisor() && (
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

                                        {/* {(IsSupervisor() ||
                                        IsOperationSupervisor() ||
                                        IsOperatorOps) && (
                                       
                                    )} */}

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
            {/* <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 px-4 py-2 text-white bg-gray-800 rounded"
      >
        {isSidebarOpen ? 'Close' : 'Open'}
      </button> */}
        </div>
    );
};

export default Sidebar;

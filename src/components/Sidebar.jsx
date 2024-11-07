"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { BsBuildingFillGear } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { MdApproval } from "react-icons/md";
// import {
//     IsDacenOperator,
//     IsDevOperator,
//     IsDevSupervisor,
//     IsItmoOperator,
//     IsItsecurityOperator,
//     IsItsupportOperator,
//     IsLogisticOperator,
//     IsLogisticSupervisor,
//     IsNetworkOperator,
//     IsOperationSupervisor,
//     IsOperator,
//     IsOperatorDev,
//     IsOperatorMemo,
//     IsOperatorOps,
//     IsPpoOperator,
//     IsPpoSupervisor,
//     IsReviewerSupervisor,
//     IsServerOperator,
//     IsSkseOperator,
//     IsSupervisor,
// } from "@/validation/validateGroupAkses";
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
            className={`fixed top-0 flex w-[270px] transition-width duration-300 h-full overflow-auto bg-[#00A6B4]/[0.5]
                 p-2 ml-4 mt-20 rounded-xl shadow-r-md`}
        >
            <div className="w-full">
                {/* Register Memo */}
                <div className="w-full mb-2">
                    <Link href="/main/logistic/createnewmemo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Register Memo
                            </button>
                        </div>
                    </Link>
                </div>

                {/* My Memo */}
                <div className="w-full mb-2">
                    <Link href="/main/logistic/createnewmemo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                My Memo
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Disposisi Memo */}
                <div className="w-full mb-2">
                    <Link href="/main/logistic/createnewmemo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Disposisi Memo
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Approval */}
                <div className="w-full mb-2">
                    <Link href="/main/logistic/createnewmemo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Approval
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

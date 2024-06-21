"use client";
import axios from "axios";
import React from 'react'
import { FiCheckSquare, FiXSquare } from "react-icons/fi";

const Page = ({ headers, data, parameter, action, isRefresh }) => {
    const getDisplayName = (header) => {
        const displayNames = {
            submitter: "Submitter",
            authorizer: "Authorizer",
            submit_at: "Submit At",
            deadline_approvement: " Deadline Approvement",
            status_approvement: "Status Approvement",
            itsupport_perihal: "Project Name",
            itsupport_pic: "PIC",
            departement: "Departement",
            itsupport_phase1: "",
            itsupport_phase1_start: "",
            itsupport_phase1_deadline: "",
            itsupport_phase1_done: "",
            itsupport_phase2: "",
            itsupport_phase2_start: "",
            itsupport_phase2_deadline: "",
            itsupport_phase2_done: "",
            itsupport_phase3: "",
            itsupport_phase3_start: "",
            itsupport_phase3_deadline: "",
            itsupport_phase3_done: "",
            itsupport_phase4: "",
            itsupport_phase4_start: "",
            itsupport_phase4_deadline: "",
            itsupport_phase4_done: "",
            itsupport_phase5: "",
            itsupport_phase5_start: "",
            itsupport_phase5_deadline: "",
            itsupport_phase5_done: "",
            itsupport_phase6: "",
            itsupport_phase6_start: "",
            itsupport_phase6_deadline: "",
            itsupport_phase6_done: "",
            itsupport_phase7: "",
            itsupport_phase7_start: "",
            itsupport_phase7_deadline: "",
            itsupport_phase7_done: "",
            itsupport_status: "Status",
            itsupport_deadline_project: "Project Deadline",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName
    };

    const handleStatusApprove = async (id, itsupport_status) => {
        isRefresh();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&itsupport_status=${itsupport_status}`
            );
        } catch (error) {
            console.log(error);
        }
        isRefresh();
    };
    return (
        <div className="overflow-auto mx-auto">
            <table className="text-center border-b cursor-pointer">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4] text-sm">
                        {action && <th className="py-2 px-4 w-32">Action</th>}
                        {headers.map((item, index) => (
                            <th key={index} className="py-3 px-6 capitalize">
                                {getDisplayName(item)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-black">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-white" : "bg-[#00A6B4]"
                            } hover:bg-gray-100 text-xs leading-5`}
                        >
                            {action && (
                                <td className="py-3 px-6 w-36 flex items-center justify-center gap-5">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusApprove(
                                                item.id,
                                                "DECLINE"
                                            )
                                        }
                                        disabled={
                                            item.status_approvement && item.status_approvement.toUpperCase() !== "PENDING"
                                        }
                                        className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                                            item.status_approvement && item.status_approvement.toUpperCase() !== "PENDING"
                                                ? "text-gray-500 cursor-not-allowed"
                                                : "text-red-400 cursor-pointer"
                                        }`}
                                    >
                                        <FiXSquare size={20} />
                                        <p className="">Decline</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusApprove(
                                                item.id,
                                                "APPROVED"
                                            )
                                        }
                                        disabled={
                                            item.status_approvement && item.status_approvement.toUpperCase() !== "PENDING"
                                        }
                                        className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                                            item.status_approvement && item.status_approvement.toUpperCase() !== "PENDING"
                                                ? "text-gray-500 cursor-not-allowed"
                                                : "text-green-600 cursor-pointer"
                                        }`}
                                    >
                                        <FiCheckSquare size={20} />
                                        <p className="">Approve</p>
                                    </button>
                                </td>
                            )}

                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className="py-3 px-6">
                                    {item[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page
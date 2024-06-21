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
            itsecurity_perihal: "Project Name",
            itsecurity_pic: "PIC",
            itsecuritytement: "Departement",
            itsecurity_phase1: "",
            itsecurity_phase1_start: "",
            itsecurity_phase1_deadline: "",
            itsecurity_phase1_done: "",
            itsecurity_phase2: "",
            itsecurity_phase2_start: "",
            itsecurity_phase2_deadline: "",
            itsecurity_phase2_done: "",
            itsecurity_phase3: "",
            itsecurity_phase3_start: "",
            itsecurity_phase3_deadline: "",
            itsecurity_phase3_done: "",
            itsecurity_phase4: "",
            itsecurity_phase4_start: "",
            itsecurity_phase4_deadline: "",
            itsecurity_phase4_done: "",
            itsecurity_phase5: "",
            itsecurity_phase5_start: "",
            itsecurity_phase5_deadline: "",
            itsecurity_phase5_done: "",
            itsecurity_phase6: "",
            itsecurity_phase6_start: "",
            itsecurity_phase6_deadline: "",
            itsecurity_phase6_done: "",
            itsecurity_phase7: "",
            itsecurity_phase7_start: "",
            itsecurity_phase7_deadline: "",
            itsecurity_phase7_done: "",
            itsecurity_status: "Status",
            itsecurity_deadline_project: "Project Deadline",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName
    };

    const handleStatusApprove = async (id, itsecurity_status) => {
        isRefresh();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&itsecurity_status=${itsecurity_status}`
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
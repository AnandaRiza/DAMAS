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
            itmo_perihal: "Project Name",
            itmo_pic: "PIC",
            departement: "Departement",
            itmo_phase1: "",
            itmo_phase1_start: "",
            itmo_phase1_deadline: "",
            itmo_phase1_done: "",
            itmo_phase2: "",
            itmo_phase2_start: "",
            itmo_phase2_deadline: "",
            itmo_phase2_done: "",
            itmo_phase3: "",
            itmo_phase3_start: "",
            itmo_phase3_deadline: "",
            itmo_phase3_done: "",
            itmo_phase4: "",
            itmo_phase4_start: "",
            itmo_phase4_deadline: "",
            itmo_phase4_done: "",
            itmo_phase5: "",
            itmo_phase5_start: "",
            itmo_phase5_deadline: "",
            itmo_phase5_done: "",
            itmo_phase6: "",
            itmo_phase6_start: "",
            itmo_phase6_deadline: "",
            itmo_phase6_done: "",
            itmo_phase7: "",
            itmo_phase7_start: "",
            itmo_phase7_deadline: "",
            itmo_phase7_done: "",
            itmo_status: "Status",
            itmo_deadline_project: "Project Deadline",
            createdBy: "",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName
    };

    const handleStatusApprove = async (id, itmo_status) => {
        isRefresh();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&itmo_status=${itmo_status}`
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
              <th
                key={index}
                className={`py-3 px-6 capitalize ${
                  [
                    "id",
                    "itmo_id",
                    "itmo_phase1",
                    "itmo_phase1_start",
                    "itmo_phase1_deadline",
                    "itmo_phase1_done",
                    "itmo_phase2",
                    "itmo_phase2_start",
                    "itmo_phase2_deadline",
                    "itmo_phase2_done",
                    "itmo_phase3",
                    "itmo_phase3_start",
                    "itmo_phase3_deadline",
                    "itmo_phase3_done",
                    "itmo_phase4",
                    "itmo_phase4_start",
                    "itmo_phase4_deadline",
                    "itmo_phase4_done",
                    "itmo_phase5",
                    "itmo_phase5_start",
                    "itmo_phase5_deadline",
                    "itmo_phase5_done",
                    "itmo_phase6",
                    "itmo_phase6_start",
                    "itmo_phase6_deadline",
                    "itmo_phase6_done",
                    "itmo_phase7",
                    "itmo_phase7_start",
                    "itmo_phase7_deadline",
                    "itmo_phase7_done",
                    "itmo_status",
                    "itmo_deadline_project",
                    "userdomain",
                    "userdomain_pic",
                  ].includes(item)
                    ? "hidden"
                    : ""
                }`}
              >
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
                                <td
                                key={headerIndex}
                                className={`py-3 px-6 ${
                                  [
                                    "id",
                                    "itmo_id",
                                    "itmo_phase1",
                                    "itmo_phase1_start",
                                    "itmo_phase1_deadline",
                                    "itmo_phase1_done",
                                    "itmo_phase2",
                                    "itmo_phase2_start",
                                    "itmo_phase2_deadline",
                                    "itmo_phase2_done",
                                    "itmo_phase3",
                                    "itmo_phase3_start",
                                    "itmo_phase3_deadline",
                                    "itmo_phase3_done",
                                    "itmo_phase4",
                                    "itmo_phase4_start",
                                    "itmo_phase4_deadline",
                                    "itmo_phase4_done",
                                    "itmo_phase5",
                                    "itmo_phase5_start",
                                    "itmo_phase5_deadline",
                                    "itmo_phase5_done",
                                    "itmo_phase6",
                                    "itmo_phase6_start",
                                    "itmo_phase6_deadline",
                                    "itmo_phase6_done",
                                    "itmo_phase7",
                                    "itmo_phase7_start",
                                    "itmo_phase7_deadline",
                                    "itmo_phase7_done",
                                    "itmo_status",
                                    "itmo_deadline_project",
                                    "userdomain",
                                    "userdomain_pic",
                                  ].includes(header)
                                    ? "hidden"
                                    : ""
                                }`}
                              >
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

"use client";
import axios from "axios";
import React from "react";
import { FiCheckSquare, FiXSquare } from "react-icons/fi";

const TableApproveSkse = ({ headers, data, parameter, action, isRefresh }) => {
    const getDisplayName = (header) => {
        const displayNames = {
            submitter: "Submitter",
            authorizer: "Authorizer",
            submitAt: "Submit At",
            deadlineApprovement: " Deadline Approvement",
            statusApprovement: "Status Approvement",
            nosurat: "No Surat",
            perihal: "Perihal",
            pic: "PIC",
            departement: "Departement",
            deadline: "Deadline",
            status: "Status",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName;
    };

    const handleStatusApprove = async (id, status) => {
        isRefresh();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&status=${status}`
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
                                index % 2 === 0
                                    ? "bg-white"
                                    : "bg-[#00A6B4]"
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
                                            item.statusApprovement.toUpperCase() !==
                                            "PENDING"
                                        }
                                        className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                                            item.statusApprovement.toUpperCase() !==
                                            "PENDING"
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
                                            item.statusApprovement.toUpperCase() !==
                                            "PENDING"
                                        }
                                        className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                                            item.statusApprovement.toUpperCase() !==
                                            "PENDING"
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

export default TableApproveSkse;

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
            server_perihal: "Project Name",
            server_pic: "PIC",
            departement: "Departement",
            server_kickoff_start: "Kick Off Start",
            server_kickoff_deadline: "Kick Off Deadline",
            server_kickoff_done: "Kick off Done",
            server_peyiapanserver_start: "Penyiapan Server Start",
            server_peyiapanserver_deadline: "Penyiapan Server Deadline",
            server_peyiapanserver_done: "Penyiapan Server Done",
            server_instalasiaplikasi_start: "Instalasi Aplikasi Start",
            server_instalasiaplikasi_deadline: "Instalasi Aplikasi Deadline",
            server_instalasiaplikasi_done: "Instalasi Aplikasi Done",
            server_instalcheckpoint_start: "Instal Checkpoint Start",
            server_instalcheckpoint_deadline: "Instal Checkpoint Deadline",
            server_instalcheckpoint_done: "Instal Checkpoint Done",
            server_testingkoneksi_start: "Testing Koneksi Start",
            server_testingkoneksi_deadline: "Testing Koneksi Deadline",
            server_testingkoneksi_done: "Testing Koneksi Done",
            server_serahterimaserver_start: "Serah Terima Server Start",
            server_serahterimaserver_deadline: "Serah Terima Server Start",
            server_serahterimaserver_done: "Serah Terima Server Done",
            server_implementasi_start: "Implementasi Start",
            server_implementasi_deadline: "Implementasi Deadline",
            server_implementasi_done: "Implementasi Done",
            server_status: "Status",
            server_deadline_project: "Project Deadline",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName
    };

    const handleStatusApprove = async (id, server_status) => {
        isRefresh();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&server_status=${server_status}`
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
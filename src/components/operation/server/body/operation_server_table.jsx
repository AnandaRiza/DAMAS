"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const Page = ({ headers, data, action, link}) => {
    const router = useRouter();

    const handleEdit = (server_id) => {
        router.push(`${link}/server/serveredit/${server_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            server_id: "Server ID",
            server_perihal: "Nama Project",
            server_pic: "PIC",
            departement: "Departement",
            server_kickoff_start: "Kick Off Start", 
            server_kickoff_deadline: "Kick Off Deadline",
            server_kickoff_done: "Kick Off Done",
            server_peyiapanserver_start: "Penyiapan Server Start",
            server_peyiapanserver_deadline: "Penyiapan Server Deadline",
            server_peyiapanserver_done: "Penyiapan Server Done",
            server_instalasiaplikasi_start: "Instaasi Aplikasi Start",
            server_instalasiaplikasi_deadline: "Instalasi Aplikasi Deadline",
            server_instalasiaplikasi_done: "Instalasi Aplikasi Done",
            server_instalcheckpoint_start: "Instal Checkpoint Start",
            server_instalcheckpoint_deadline: "Instal Checkpoint Deadline",
            server_instalcheckpoint_done: "Install Checkpoint Done",
            server_testingkoneksi_start: "Testing Koneksi Start",
            server_testingkoneksi_deadline: "Testing Koneksi Deadline",
            server_testingkoneksi_done: "Testing Koneksi Done",
            server_serahterimaserver_start: "Serah Terima Server Start",
            server_serahterimaserver_deadline: "Serah Terima Server Deadline",
            server_serahterimaserver_done: "Serah Terima Server Done",
            server_implementasi_start: "Implementasi Start",
            server_implementasi_deadline: "Implementasi Deadline",
            server_implementasi_done: "Implementasi Done",
            server_status: "Status",
            server_deadline_project: "Deadline Project"
        };
        return displayNames[header] || header;
    }


return (
    <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4] text-sm">
                        {headers.map((item, index) => (
                            <th key={index} 
                            className={`py-3 px-6 uppercase font-bold ${item === 'server_id' ? 'hidden' : ''}`}
                            >
                                {getDisplayName(item)}
                            </th>
                        ))}
                        {action && 
                            <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">
                                Edit
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0
                                    ? "bg-white hover:bg-gray-100 text-xs leading-5"
                                    : "bg-[#00A6B4]/[0.5] hover:bg-[#00A6B4]/[0.75] text-xs leading-5"
                            }`}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'server_id' ? 'hidden' : ''}`}>
                                    {item[header]}
                                </td>
                            ))}

                            {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(item[headers[0]])
                                        }
                                        className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2 "
                                        style={{ minHeight: "60px" }}
                                        // style={{ minWidth: "fit-content" }}
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
);
};

export default Page;

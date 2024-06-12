"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const operation_network_table = ({ headers, data, action, link }) => {
    const router = useRouter();

    const handleEdit = (network_id) => {
        router.push(`${link}/network/networkedit/${network_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            network_id: 'Network ID',
            network_perihal: "Nama Project",
            network_pic: "PIC",
            network_kickoff_start : "Kick Off Start",
            network_kickoff_deadline: "Kick Off Deadline",
            network_kickoff_done: " Kikck Off Done",
            network_mop_start: "MOP Start",
            network_mop_deadline: "MOP Deadline",
            network_mop_done: "MOP Dne",
            network_demomop_start: "Demo MOP Start",
            network_demomop_deadline: "Demo MOP Deadline",
            network_demomop_done: "Demo MOP Done",
            network_implementasi_start: "Implementasi Start",
            network_implementasi_deadline: "Impplementasi Deadline",
            network_implementasi_done: "implementasi_done",
            network_skse_start: "SKSE start",
            network_skse_deadline: "SKSE deadline",
            network_skse_done: "SKSE done",
            network_uat_start: "UAT start",
            network_uat_deadline: "UAT deadline",
            network_uat_done: "UAT done",
            network_status: "Status",
            network_deadline_project: "Deadline Project"
          
        };
        return displayNames[header] || header;
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4] text-sm">
                        {headers.map((item, index) => (
                            <th key={index} 
                            className={`py-3 px-6 uppercase font-bold ${item === 'network_id' ? 'hidden' : ''}`}
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
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'network_id' ? 'hidden' : ''}`}>
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

export default operation_network_table;

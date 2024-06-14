'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ({headers, data, action, link}) => {

    const router = useRouter();

    const handleEdit = (itmo_id) => {
        router.push(`${link}/itmo/itmoedit/${itmo_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            itmo_id: "IT MO ID",
            itmo_perihal : "Nama Project",
            itmo_pic : "PIC",
            departement : "Departement",
            itmo_phase1 : "Phase 1",
            itmo_phase1_start : " Phase 1 Start",
            itmo_phase1_deadline : "Phase 1 Deadline",
            itmo_phase1_done : "Phase 1 Done",
            itmo_phase2 : "Phase 2",
            itmo_phase2_start : "Phase 2 Start",
            itmo_phase2_deadline : "Phase 2 Deadline",
            itmo_phase2_done : "Phase 2 Done",
            itmo_phase3 : "Phase 3",
            itmo_phase3_start : "Phase 3 Start",
            itmo_phase3_deadline : "Phase 3 Deadline",
            itmo_phase3_done : "Phase 3 Done",
            itmo_phase4 : "Phase 4",
            itmo_phase4_start : "Phase 4 Start",
            itmo_phase4_deadline : "Phase 4 Deadline",
            itmo_phase4_done : "Phase 4 Done",
            itmo_phase5 : "Phase 5",
            itmo_phase5_start : "Phase 5 Start",
            itmo_phase5_deadline : "Phase 5 Deadline",
            itmo_phase5_done : "Phase 5 Done",
            itmo_phase6 : "Phase 6",
            itmo_phase6_start : "Phase 6 Start",
            itmo_phase6_deadline : "Phase 6 Deadline",
            itmo_phase6_done : "Phase 6 Done",
            itmo_phase6 : "Phase 7",
            itmo_phase7_start : "Phase 7 Start",
            itmo_phase7_deadline : "Phase 7 Deadline",
            itmo_phase7_done : "Phase 7 Done",
            itmo_status : "Status",
            itmo_deadline_project : "Deadline Project"
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
                    className={`py-3 px-6 uppercase font-bold ${item === 'itmo_id' ? 'hidden' : ''}`}
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
                        <td key={headerIndex} className={`py-3 px-6 ${header === 'itmo_id' ? 'hidden' : ''}`}>
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

export default page;

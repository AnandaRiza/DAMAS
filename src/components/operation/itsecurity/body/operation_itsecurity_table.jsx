'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ({headers, data, action, link}) => {

    const router = useRouter();

    const handleEdit = (itsecurity_id) => {
        router.push(`${link}/itsecurity/itsecurityedit/${itsecurity_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            itsecurity_id: "IT MO ID",
            itsecurity_perihal : "Nama Project",
            itsecurity_pic : "PIC",
            departement : "Departement",
            itsecurity_phase1 : "Phase 1",
            itsecurity_phase1_start : " Phase 1 Start",
            itsecurity_phase1_deadline : "Phase 1 Deadline",
            itsecurity_phase1_done : "Phase 1 Done",
            itsecurity_phase2 : "Phase 2",
            itsecurity_phase2_start : "Phase 2 Start",
            itsecurity_phase2_deadline : "Phase 2 Deadline",
            itsecurity_phase2_done : "Phase 2 Done",
            itsecurity_phase3 : "Phase 3",
            itsecurity_phase3_start : "Phase 3 Start",
            itsecurity_phase3_deadline : "Phase 3 Deadline",
            itsecurity_phase3_done : "Phase 3 Done",
            itsecurity_phase4 : "Phase 4",
            itsecurity_phase4_start : "Phase 4 Start",
            itsecurity_phase4_deadline : "Phase 4 Deadline",
            itsecurity_phase4_done : "Phase 4 Done",
            itsecurity_phase5 : "Phase 5",
            itsecurity_phase5_start : "Phase 5 Start",
            itsecurity_phase5_deadline : "Phase 5 Deadline",
            itsecurity_phase5_done : "Phase 5 Done",
            itsecurity_phase6 : "Phase 6",
            itsecurity_phase6_start : "Phase 6 Start",
            itsecurity_phase6_deadline : "Phase 6 Deadline",
            itsecurity_phase6_done : "Phase 6 Done",
            itsecurity_phase6 : "Phase 7",
            itsecurity_phase7_start : "Phase 7 Start",
            itsecurity_phase7_deadline : "Phase 7 Deadline",
            itsecurity_phase7_done : "Phase 7 Done",
            itsecurity_status : "Status",
            itsecurity_deadline_project : "Deadline Project"
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
                    className={`py-3 px-6 uppercase font-bold ${item === 'itsecurity_id' ? 'hidden' : ''}`}
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
                        <td key={headerIndex} className={`py-3 px-6 ${header === 'itsecurity_id' ? 'hidden' : ''}`}>
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

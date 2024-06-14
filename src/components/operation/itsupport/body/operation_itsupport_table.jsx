'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ({headers, data, action, link}) => {

    const router = useRouter();

    const handleEdit = (itsupport_id) => {
        router.push(`${link}/itsupport/itsupportedit/${itsupport_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            itsupport_id: "IT Support ID",
            itsupport_perihal : "Nama Project",
            itsupport_pic : "PIC",
            departement : "Departement",
            itsupport_phase1 : "Phase 1",
            itsupport_phase1_start : " Phase 1 Start",
            itsupport_phase1_deadline : "Phase 1 Deadline",
            itsupport_phase1_done : "Phase 1 Done",
            itsupport_phase2 : "Phase 2",
            itsupport_phase2_start : "Phase 2 Start",
            itsupport_phase2_deadline : "Phase 2 Deadline",
            itsupport_phase2_done : "Phase 2 Done",
            itsupport_phase3 : "Phase 3",
            itsupport_phase3_start : "Phase 3 Start",
            itsupport_phase3_deadline : "Phase 3 Deadline",
            itsupport_phase3_done : "Phase 3 Done",
            itsupport_phase4 : "Phase 4",
            itsupport_phase4_start : "Phase 4 Start",
            itsupport_phase4_deadline : "Phase 4 Deadline",
            itsupport_phase4_done : "Phase 4 Done",
            itsupport_phase5 : "Phase 5",
            itsupport_phase5_start : "Phase 5 Start",
            itsupport_phase5_deadline : "Phase 5 Deadline",
            itsupport_phase5_done : "Phase 5 Done",
            itsupport_phase6 : "Phase 6",
            itsupport_phase6_start : "Phase 6 Start",
            itsupport_phase6_deadline : "Phase 6 Deadline",
            itsupport_phase6_done : "Phase 6 Done",
            itsupport_phase6 : "Phase 7",
            itsupport_phase7_start : "Phase 7 Start",
            itsupport_phase7_deadline : "Phase 7 Deadline",
            itsupport_phase7_done : "Phase 7 Done",
            itsupport_status : "Status",
            itsupport_deadline_project : "Deadline Project"
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
                            className={`py-3 px-6 uppercase font-bold ${item === 'itsupport_id' ? 'hidden' : ''}`}
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
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'itsupport_id' ? 'hidden' : ''}`}>
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

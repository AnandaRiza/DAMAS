'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ( {headers, data, action, link} ) => {
    const router = useRouter();

    const handleEdit = (dacen_id) => {
        router.push(`${link}/datacenter/dacenedit/${dacen_id}`);
    };

    const handleDoubleClick = (id) => {
        router.push(`${link}/dacen/detail/${id}`);
    };


    const getDisplayName = (header) => {
        const displayNames = {
            dacen_id: "Data Center ID",
            dacen_perihal : "Nama Project",
            dacen_pic : "PIC",
            departement : "Departement",
            dacen_phase1 : "Phase 1",
            dacen_phase1_start : " Phase 1 Start",
            dacen_phase1_deadline : "Phase 1 Deadline",
            dacen_phase1_done : "Phase 1 Done",
            dacen_phase2 : "Phase 2",
            dacen_phase2_start : "Phase 2 Start",
            dacen_phase2_deadline : "Phase 2 Deadline",
            dacen_phase2_done : "Phase 2 Done",
            dacen_phase3 : "Phase 3",
            dacen_phase3_start : "Phase 3 Start",
            dacen_phase3_deadline : "Phase 3 Deadline",
            dacen_phase3_done : "Phase 3 Done",
            dacen_phase4 : "Phase 4",
            dacen_phase4_start : "Phase 4 Start",
            dacen_phase4_deadline : "Phase 4 Deadline",
            dacen_phase4_done : "Phase 4 Done",
            dacen_phase5 : "Phase 5",
            dacen_phase5_start : "Phase 5 Start",
            dacen_phase5_deadline : "Phase 5 Deadline",
            dacen_phase5_done : "Phase 5 Done",
            dacen_phase6 : "Phase 6",
            dacen_phase6_start : "Phase 6 Start",
            dacen_phase6_deadline : "Phase 6 Deadline",
            dacen_phase6_done : "Phase 6 Done",
            dacen_phase6 : "Phase 7",
            dacen_phase7_start : "Phase 7 Start",
            dacen_phase7_deadline : "Phase 7 Deadline",
            dacen_phase7_done : "Phase 7 Done",
            dacen_status : "Status",
            dacen_deadline_project : "Deadline Project"
        };
        return displayNames[header] || header;
    }

    const calculateTimeLeft = (date) => {
        const now = new Date();
        const deadline = new Date(date);
        const difference = deadline.getTime() - now.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
        return daysLeft;
    };

return (
    <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4] text-sm">
                        {headers.map((item, index) => (
                            <th key={index} 
                            className={`py-3 px-6 uppercase font-bold ${item === 'dacen_id' ? 'hidden' : ''}`}
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
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'dacen_id' ? 'hidden' : ''}`}>
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

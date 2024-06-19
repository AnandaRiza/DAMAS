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

    const handleDoubleClick = (itsecurity_id) => {
        router.push(`${link}/itsecurity/detail/${itsecurity_id}`);
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
        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName;
    }

    const calculateTimeLeft = (date) => {
        const now = new Date();
        const deadline = new Date(date);
        const difference = deadline.getTime() - now.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
        return daysLeft;
    };

    const getStatus = (item) => {
        const daysLeft = calculateTimeLeft(item.itsecurity_deadline_project);
        
        if (daysLeft < 0) {
            return "Past Deadline";
        } else if (daysLeft <= 3) {
            return "Within 3 days";
        } else if (daysLeft <= 7) {
            return "Within 7 days";
        } else {
            return "On Track";
        }
    };

    const rowClass = (inputDate) => {
        const daysLeft = calculateTimeLeft(inputDate);
        // console.log(daysLeft)
        if (daysLeft <= 3) {
            return "bg-red-200 hover:bg-red-300";
        } else if (daysLeft <= 7) {
            return "bg-yellow-200 hover:bg-yellow-300";
        } else {
            return "bg-green-200 hover:bg-green-300";
        }
    };

return (
    <div className="overflow-x-auto">
    <table className="table">
        <thead>
            <tr className="border-b-2 bg-[#00A6B4] text-sm">
                {headers.map((item, index) => (
                    <th 
                    key={index} 
                    className={`py-3 px-6 uppercase font-bold ${
                        item === 'itsecurity_id' ||
                        item === 'itsecurity_phase1' ||
                        item === 'itsecurity_phase1_start' ||
                        item === 'itsecurity_phase1_deadline' ||
                        item === 'itsecurity_phase1_done' ||
                        item === 'itsecurity_phase2' ||
                        item === 'itsecurity_phase2_start' ||
                        item === 'itsecurity_phase2_deadline' ||
                        item === 'itsecurity_phase2_done' ||
                        item === 'itsecurity_phase3' ||
                        item === 'itsecurity_phase3_start' ||
                        item === 'itsecurity_phase3_deadline' ||
                        item === 'itsecurity_phase3_done' ||
                        item === 'itsecurity_phase4' ||
                        item === 'itsecurity_phase4_start' ||
                        item === 'itsecurity_phase4_deadline' ||
                        item === 'itsecurity_phase4_done' ||
                        item === 'itsecurity_phase5' ||
                        item === 'itsecurity_phase5_start' ||
                        item === 'itsecurity_phase5_deadline' ||
                        item === 'itsecurity_phase5_done' ||
                        item === 'itsecurity_phase6' ||
                        item === 'itsecurity_phase6_start' ||
                        item === 'itsecurity_phase6_deadline' ||
                        item === 'itsecurity_phase6_done' ||
                        item === 'itsecurity_phase7' ||
                        item === 'itsecurity_phase7_start' ||
                        item === 'itsecurity_phase7_deadline' ||
                        item === 'itsecurity_phase7_done' 
                        ? 'hidden' : ''
                    }`}
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
            {data.map((item, index) => {
            const itsecurity_status = getStatus(item);
            // console.log(itsecurity_status)
            const rowClassName = rowClass(item.itsecurity_deadline_project);
            
            return (
                <tr
                    key={index}
                    className={`${rowClassName}  text-xs leading-5`}
                    onDoubleClick={() => handleDoubleClick(item.itsecurity_id)}
                >
                    {headers.map((header, headerIndex) => (
                        <td key={headerIndex} className={`py-3 px-6 ${
                            header === 'itsecurity_id' ||
                            header === 'itsecurity_phase1' ||
                            header === 'itsecurity_phase1_start' ||
                            header === 'itsecurity_phase1_deadline' ||
                            header === 'itsecurity_phase1_done' ||
                            header === 'itsecurity_phase2' ||
                            header === 'itsecurity_phase2_start' ||
                            header === 'itsecurity_phase2_deadline' ||
                            header === 'itsecurity_phase2_done' ||
                            header === 'itsecurity_phase3' ||
                            header === 'itsecurity_phase3_start' ||
                            header === 'itsecurity_phase3_deadline' ||
                            header === 'itsecurity_phase3_done' ||
                            header === 'itsecurity_phase4' ||
                            header === 'itsecurity_phase4_start' ||
                            header === 'itsecurity_phase4_deadline' ||
                            header === 'itsecurity_phase4_done' ||
                            header === 'itsecurity_phase5' ||
                            header === 'itsecurity_phase5_start' ||
                            header === 'itsecurity_phase5_deadline' ||
                            header === 'itsecurity_phase5_done' ||
                            header === 'itsecurity_phase6' ||
                            header === 'itsecurity_phase6_start' ||
                            header === 'itsecurity_phase6_deadline' ||
                            header === 'itsecurity_phase6_done' ||
                            header === 'itsecurity_phase7' ||
                            header === 'itsecurity_phase7_start' ||
                            header === 'itsecurity_phase7_deadline' ||
                            header === 'itsecurity_phase7_done'  
                                ? 'hidden'
                                 : ''
                            }`}
                        >
                            {header === "itsecurity_status" ? itsecurity_status : item[header]}
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
                                // style={{ minHeight: "60px" }}
                                // style={{ minWidth: "fit-content" }}
                            >
                                <AiOutlineEdit size={20} />
                            </button>
                        </td>
                    )}
                </tr>
                );
                })}
        </tbody>
    </table>
</div>
);
};

export default page;

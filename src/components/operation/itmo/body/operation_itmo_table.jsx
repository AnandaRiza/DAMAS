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

    const handleDoubleClick = (itmo_id) => {
        router.push(`${link}/itmo/detail/${itmo_id}`);
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
        const daysLeft = calculateTimeLeft(item.itmo_deadline_project);
        
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
                                item === 'itmo_id' ||
                                item === 'itmo_phase1' ||
                                item === 'itmo_phase1_start' ||
                                item === 'itmo_phase1_deadline' ||
                                item === 'itmo_phase1_done' ||
                                item === 'itmo_phase2' ||
                                item === 'itmo_phase2_start' ||
                                item === 'itmo_phase2_deadline' ||
                                item === 'itmo_phase2_done' ||
                                item === 'itmo_phase3' ||
                                item === 'itmo_phase3_start' ||
                                item === 'itmo_phase3_deadline' ||
                                item === 'itmo_phase3_done' ||
                                item === 'itmo_phase4' ||
                                item === 'itmo_phase4_start' ||
                                item === 'itmo_phase4_deadline' ||
                                item === 'itmo_phase4_done' ||
                                item === 'itmo_phase5' ||
                                item === 'itmo_phase5_start' ||
                                item === 'itmo_phase5_deadline' ||
                                item === 'itmo_phase5_done' ||
                                item === 'itmo_phase6' ||
                                item === 'itmo_phase6_start' ||
                                item === 'itmo_phase6_deadline' ||
                                item === 'itmo_phase6_done' ||
                                item === 'itmo_phase7' ||
                                item === 'itmo_phase7_start' ||
                                item === 'itmo_phase7_deadline' ||
                                item === 'itmo_phase7_done' 
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
                    const itmo_status = getStatus(item);
                    // console.log(itmo_status)
                    const rowClassName = rowClass(item.itmo_deadline_project);
                    
                    return (
                        <tr
                            key={index}
                            className={`${rowClassName}  text-xs leading-5`}
                            onDoubleClick={() => handleDoubleClick(item.itmo_id)}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${
                                    header === 'itmo_id' ||
                                    header === 'itmo_phase1' ||
                                    header === 'itmo_phase1_start' ||
                                    header === 'itmo_phase1_deadline' ||
                                    header === 'itmo_phase1_done' ||
                                    header === 'itmo_phase2' ||
                                    header === 'itmo_phase2_start' ||
                                    header === 'itmo_phase2_deadline' ||
                                    header === 'itmo_phase2_done' ||
                                    header === 'itmo_phase3' ||
                                    header === 'itmo_phase3_start' ||
                                    header === 'itmo_phase3_deadline' ||
                                    header === 'itmo_phase3_done' ||
                                    header === 'itmo_phase4' ||
                                    header === 'itmo_phase4_start' ||
                                    header === 'itmo_phase4_deadline' ||
                                    header === 'itmo_phase4_done' ||
                                    header === 'itmo_phase5' ||
                                    header === 'itmo_phase5_start' ||
                                    header === 'itmo_phase5_deadline' ||
                                    header === 'itmo_phase5_done' ||
                                    header === 'itmo_phase6' ||
                                    header === 'itmo_phase6_start' ||
                                    header === 'itmo_phase6_deadline' ||
                                    header === 'itmo_phase6_done' ||
                                    header === 'itmo_phase7' ||
                                    header === 'itmo_phase7_start' ||
                                    header === 'itmo_phase7_deadline' ||
                                    header === 'itmo_phase7_done'  
                                        ? 'hidden'
                                         : ''
                                    }`}
                                >
                                    {header === "itmo_status" ? itmo_status : item[header]}
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

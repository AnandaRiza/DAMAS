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

    const handleDoubleClick = (itsupport_id) => {
        router.push(`${link}/itsupport/detail/${itsupport_id}`);
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
        const daysLeft = calculateTimeLeft(item.itsupport_deadline_project);
        
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
                        item === 'itsupport_id' ||
                        item === 'itsupport_phase1' ||
                        item === 'itsupport_phase1_start' ||
                        item === 'itsupport_phase1_deadline' ||
                        item === 'itsupport_phase1_done' ||
                        item === 'itsupport_phase2' ||
                        item === 'itsupport_phase2_start' ||
                        item === 'itsupport_phase2_deadline' ||
                        item === 'itsupport_phase2_done' ||
                        item === 'itsupport_phase3' ||
                        item === 'itsupport_phase3_start' ||
                        item === 'itsupport_phase3_deadline' ||
                        item === 'itsupport_phase3_done' ||
                        item === 'itsupport_phase4' ||
                        item === 'itsupport_phase4_start' ||
                        item === 'itsupport_phase4_deadline' ||
                        item === 'itsupport_phase4_done' ||
                        item === 'itsupport_phase5' ||
                        item === 'itsupport_phase5_start' ||
                        item === 'itsupport_phase5_deadline' ||
                        item === 'itsupport_phase5_done' ||
                        item === 'itsupport_phase6' ||
                        item === 'itsupport_phase6_start' ||
                        item === 'itsupport_phase6_deadline' ||
                        item === 'itsupport_phase6_done' ||
                        item === 'itsupport_phase7' ||
                        item === 'itsupport_phase7_start' ||
                        item === 'itsupport_phase7_deadline' ||
                        item === 'itsupport_phase7_done' 
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
            const itsupport_status = getStatus(item);
            // console.log(itsupport_status)
            const rowClassName = rowClass(item.itsupport_deadline_project);
            
            return (
                <tr
                    key={index}
                    className={`${rowClassName}  text-xs leading-5`}
                    onDoubleClick={() => handleDoubleClick(item.itsupport_id)}
                >
                    {headers.map((header, headerIndex) => (
                        <td key={headerIndex} className={`py-3 px-6 ${
                            header === 'itsupport_id' ||
                            header === 'itsupport_phase1' ||
                            header === 'itsupport_phase1_start' ||
                            header === 'itsupport_phase1_deadline' ||
                            header === 'itsupport_phase1_done' ||
                            header === 'itsupport_phase2' ||
                            header === 'itsupport_phase2_start' ||
                            header === 'itsupport_phase2_deadline' ||
                            header === 'itsupport_phase2_done' ||
                            header === 'itsupport_phase3' ||
                            header === 'itsupport_phase3_start' ||
                            header === 'itsupport_phase3_deadline' ||
                            header === 'itsupport_phase3_done' ||
                            header === 'itsupport_phase4' ||
                            header === 'itsupport_phase4_start' ||
                            header === 'itsupport_phase4_deadline' ||
                            header === 'itsupport_phase4_done' ||
                            header === 'itsupport_phase5' ||
                            header === 'itsupport_phase5_start' ||
                            header === 'itsupport_phase5_deadline' ||
                            header === 'itsupport_phase5_done' ||
                            header === 'itsupport_phase6' ||
                            header === 'itsupport_phase6_start' ||
                            header === 'itsupport_phase6_deadline' ||
                            header === 'itsupport_phase6_done' ||
                            header === 'itsupport_phase7' ||
                            header === 'itsupport_phase7_start' ||
                            header === 'itsupport_phase7_deadline' ||
                            header === 'itsupport_phase7_done'  
                                ? 'hidden'
                                 : ''
                            }`}
                        >
                            {header === "itsupport_status" ? itsupport_status : item[header]}
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

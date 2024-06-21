'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ({headers, data, action, link}) => {

    const router = useRouter();

    const handleEdit = (itmo_id) => {
        const updatedData = data.map((item) => {
            if (item.itmo_id === itmo_id) {
                item.status = "Finish";
                router.push(`${link}/itmo/itmoedit/${itmo_id}`);
            }
            return item;
        });
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

    const getStatus = (item) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

            return daysLeft;
        };

        const { itmo_status } = item;

        if (itmo_status === "Finished") {
            return "Finished";
        }

        const daysLeft = calculateTimeLeft(item.itmo_deadline_project);

        if (daysLeft < 0) {
            return "Past Deadline";
        } else if (daysLeft <= 3) {
            return "Within 3 days";
        } else if (daysLeft <= 7) {
            return "Within 7 days";
        } else {
            return "Ongoing";
        }
    };

    const rowClass = (inputDate, itmo_status) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
            return daysLeft;
        };

        if (itmo_status === "Finished") {
            return "bg-green-200 hover:bg-green-300";
        }

        const daysLeft = calculateTimeLeft(inputDate);

        if (daysLeft <= 3) {
            return "bg-red-200 hover:bg-red-300";
        } else if (daysLeft <= 7) {
            return "bg-yellow-200 hover:bg-yellow-300";
        } else {
            return "bg-white-200 hover:bg-gray-300";
        }
    };

    const sortedData = data.slice().sort((a, b) => {
        const classA = rowClass(a.itmo_deadline_project, a.itmo_status);
        const classB = rowClass(b.itmo_deadline_project, b.itmo_status);


        const aIsFinished = a.itmo_status === "Finished";
        const bIsFinished = b.itmo_status === "Finished";
    
        if (aIsFinished && bIsFinished) {
            // Sort "Finished" items by classA and classB
            return classA.localeCompare(classB);
        }
    
        if (aIsFinished) {
            return 1; // Move "Finished" (a) to the bottom
        }
    
        if (bIsFinished) {
            return -1; // Move "Finished" (b) to the bottom
        }
    
        if (a.itmo_status === "Finished" && b.itmo_status === "Finished") {
            return classA.localeCompare(classB);
        }
    
        if (a.itmo_status === "Finished") {
            return 1; // Move 'Finished' projects to the bottom
        }
    
        if (b.itmo_status === "Finished") {
            return -1; // Move 'Finished' projects to the bottom
        }
    
        // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
        if (a.itmo_status === "Ongoing" && b.itmo_status === "Ongoing") {
            // Urutkan berdasarkan deadlineproject
            return new Date(a.itmo_deadline_project) - new Date(b.itmo_deadline_project);
        }
    
        // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
        if (a.itmo_status === "Ongoing") {
            return 1; // Letakkan a di bawah b
        }
    
        if (b.itmo_status === "Ongoing") {
            return -1; // Letakkan b di atas a
        }
    
        // Jika keduanya tidak selesai dan tidak ada yang "Ongoing", urutkan berdasarkan classA dan classB
        return classA.localeCompare(classB);
    });

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
                    {sortedData.map((item, index) => {
                    const itmo_status = getStatus(item);
                    // console.log(itmo_status)
                    const rowClassName = rowClass(item.itmo_deadline_project, item.itmo_status);
                    
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
                                    onClick={() => handleEdit(item.itmo_id)}
                                    className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2 "
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

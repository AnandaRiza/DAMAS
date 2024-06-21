'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const page = ( {headers, data, action, link} ) => {
    const router = useRouter();

    const handleEdit = (dacen_id) => {
        const updatedData = data.map((item) => {
            if (item.dacen_id === dacen_id) {
                item.status = "Finish";
                router.push(`${link}/datacenter/dacenedit/${dacen_id}`);
            }
            return item;
        });
    };


    const handleDoubleClick = (dacen_id) => {
        router.push(`${link}/datacenter/detail/${dacen_id}`);
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

        const { dacen_status } = item;

        if (dacen_status === "Finished") {
            return "Finished";
        }

        const daysLeft = calculateTimeLeft(item.dacen_deadline_project);

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

    const rowClass = (inputDate, dacen_status) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
            return daysLeft;
        };

        if (dacen_status === "Finished") {
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
        const classA = rowClass(a.dacen_deadline_project, a.dacen_status);
        const classB = rowClass(b.dacen_deadline_project, b.dacen_status);


        const aIsFinished = a.dacen_status === "Finished";
        const bIsFinished = b.dacen_status === "Finished";
    
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
    
        if (a.dacen_status === "Finished" && b.dacen_status === "Finished") {
            return classA.localeCompare(classB);
        }
    
        if (a.dacen_status === "Finished") {
            return 1; // Move 'Finished' projects to the bottom
        }
    
        if (b.dacen_status === "Finished") {
            return -1; // Move 'Finished' projects to the bottom
        }
    
        // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
        if (a.dacen_status === "Ongoing" && b.dacen_status === "Ongoing") {
            // Urutkan berdasarkan deadlineproject
            return new Date(a.dacen_deadline_project) - new Date(b.dacen_deadline_project);
        }
    
        // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
        if (a.dacen_status === "Ongoing") {
            return 1; // Letakkan a di bawah b
        }
    
        if (b.dacen_status === "Ongoing") {
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
                                item === 'dacen_id' ||
                                item === 'dacen_phase1' ||
                                item === 'dacen_phase1_start' ||
                                item === 'dacen_phase1_deadline' ||
                                item === 'dacen_phase1_done' ||
                                item === 'dacen_phase2' ||
                                item === 'dacen_phase2_start' ||
                                item === 'dacen_phase2_deadline' ||
                                item === 'dacen_phase2_done' ||
                                item === 'dacen_phase3' ||
                                item === 'dacen_phase3_start' ||
                                item === 'dacen_phase3_deadline' ||
                                item === 'dacen_phase3_done' ||
                                item === 'dacen_phase4' ||
                                item === 'dacen_phase4_start' ||
                                item === 'dacen_phase4_deadline' ||
                                item === 'dacen_phase4_done' ||
                                item === 'dacen_phase5' ||
                                item === 'dacen_phase5_start' ||
                                item === 'dacen_phase5_deadline' ||
                                item === 'dacen_phase5_done' ||
                                item === 'dacen_phase6' ||
                                item === 'dacen_phase6_start' ||
                                item === 'dacen_phase6_deadline' ||
                                item === 'dacen_phase6_done' ||
                                item === 'dacen_phase7' ||
                                item === 'dacen_phase7_start' ||
                                item === 'dacen_phase7_deadline' ||
                                item === 'dacen_phase7_done' 
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
                    const dacen_status = getStatus(item);
                    // console.log(dacen_status)
                    const rowClassName = rowClass(item.dacen_deadline_project, item.dacen_status);
                    
                    return (
                        <tr
                            key={index}
                            className={`${rowClassName}  text-xs leading-5`}
                            onDoubleClick={() => handleDoubleClick(item.dacen_id)}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${
                                    header === 'dacen_id' ||
                                    header === 'dacen_phase1' ||
                                    header === 'dacen_phase1_start' ||
                                    header === 'dacen_phase1_deadline' ||
                                    header === 'dacen_phase1_done' ||
                                    header === 'dacen_phase2' ||
                                    header === 'dacen_phase2_start' ||
                                    header === 'dacen_phase2_deadline' ||
                                    header === 'dacen_phase2_done' ||
                                    header === 'dacen_phase3' ||
                                    header === 'dacen_phase3_start' ||
                                    header === 'dacen_phase3_deadline' ||
                                    header === 'dacen_phase3_done' ||
                                    header === 'dacen_phase4' ||
                                    header === 'dacen_phase4_start' ||
                                    header === 'dacen_phase4_deadline' ||
                                    header === 'dacen_phase4_done' ||
                                    header === 'dacen_phase5' ||
                                    header === 'dacen_phase5_start' ||
                                    header === 'dacen_phase5_deadline' ||
                                    header === 'dacen_phase5_done' ||
                                    header === 'dacen_phase6' ||
                                    header === 'dacen_phase6_start' ||
                                    header === 'dacen_phase6_deadline' ||
                                    header === 'dacen_phase6_done' ||
                                    header === 'dacen_phase7' ||
                                    header === 'dacen_phase7_start' ||
                                    header === 'dacen_phase7_deadline' ||
                                    header === 'dacen_phase7_done'  
                                        ? 'hidden'
                                         : ''
                                    }`}
                                >
                                    {header === "dacen_status" ? dacen_status : item[header]}
                                </td>
                            ))}

                            {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(item.dacen_id)}
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

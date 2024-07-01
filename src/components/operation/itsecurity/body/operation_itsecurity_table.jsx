"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
    IsItsecurityOperator,
    IsOperator,
} from "@/validation/validateGroupAkses";

const page = ({ headers, data, action, link }) => {
    const router = useRouter();

    const handleEdit = (itsecurity_id) => {
        const updatedData = data.map((item) => {
            if (item.itsecurity_id === itsecurity_id) {
                item.status = "Finish";
                router.push(
                    `${link}/itsecurity/itsecurityedit/${itsecurity_id}`
                );
            }
            return item;
        });
    };

    const handleDoubleClick = (itsecurity_id) => {
        router.push(`${link}/itsecurity/detail/${itsecurity_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            itsecurity_id: "IT MO ID",
            itsecurity_perihal: "Nama Project",
            itsecurity_pic: "PIC",
            departement: "Departement",
            itsecurity_phase1: "Phase 1",
            itsecurity_phase1_start: " Phase 1 Start",
            itsecurity_phase1_deadline: "Phase 1 Deadline",
            itsecurity_phase1_done: "Phase 1 Done",
            itsecurity_phase2: "Phase 2",
            itsecurity_phase2_start: "Phase 2 Start",
            itsecurity_phase2_deadline: "Phase 2 Deadline",
            itsecurity_phase2_done: "Phase 2 Done",
            itsecurity_phase3: "Phase 3",
            itsecurity_phase3_start: "Phase 3 Start",
            itsecurity_phase3_deadline: "Phase 3 Deadline",
            itsecurity_phase3_done: "Phase 3 Done",
            itsecurity_phase4: "Phase 4",
            itsecurity_phase4_start: "Phase 4 Start",
            itsecurity_phase4_deadline: "Phase 4 Deadline",
            itsecurity_phase4_done: "Phase 4 Done",
            itsecurity_phase5: "Phase 5",
            itsecurity_phase5_start: "Phase 5 Start",
            itsecurity_phase5_deadline: "Phase 5 Deadline",
            itsecurity_phase5_done: "Phase 5 Done",
            itsecurity_phase6: "Phase 6",
            itsecurity_phase6_start: "Phase 6 Start",
            itsecurity_phase6_deadline: "Phase 6 Deadline",
            itsecurity_phase6_done: "Phase 6 Done",
            itsecurity_phase6: "Phase 7",
            itsecurity_phase7_start: "Phase 7 Start",
            itsecurity_phase7_deadline: "Phase 7 Deadline",
            itsecurity_phase7_done: "Phase 7 Done",
            itsecurity_status: "Status",
            itsecurity_deadline_project: "Deadline Project",
            itsecurity_project_done: "Project Done",
            userdomain : "user domain",
            userdomain_pic: "user domain pic",
        };
        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName;
    };

    const getStatus = (item) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

            return daysLeft;
        };

        const { itsecurity_status } = item;

        if (itsecurity_status === "Finished") {
            return "Finished";
        }

        const daysLeft = calculateTimeLeft(item.itsecurity_deadline_project);

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

    const rowClass = (inputDate, itsecurity_status) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
            return daysLeft;
        };

        if (itsecurity_status === "Finished") {
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
        const classA = rowClass(
            a.itsecurity_deadline_project,
            a.itsecurity_status
        );
        const classB = rowClass(
            b.itsecurity_deadline_project,
            b.itsecurity_status
        );

        const aIsFinished = a.itsecurity_status === "Finished";
        const bIsFinished = b.itsecurity_status === "Finished";

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

        if (
            a.itsecurity_status === "Finished" &&
            b.itsecurity_status === "Finished"
        ) {
            return classA.localeCompare(classB);
        }

        if (a.itsecurity_status === "Finished") {
            return 1; // Move 'Finished' projects to the bottom
        }

        if (b.itsecurity_status === "Finished") {
            return -1; // Move 'Finished' projects to the bottom
        }

        // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
        if (
            a.itsecurity_status === "Ongoing" &&
            b.itsecurity_status === "Ongoing"
        ) {
            // Urutkan berdasarkan deadlineproject
            return (
                new Date(a.itsecurity_deadline_project) -
                new Date(b.itsecurity_deadline_project)
            );
        }

        // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
        if (a.itsecurity_status === "Ongoing") {
            return 1; // Letakkan a di bawah b
        }

        if (b.itsecurity_status === "Ongoing") {
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
                                    item === "itsecurity_id" ||
                                    item === "itsecurity_phase1" ||
                                    item === "itsecurity_phase1_start" ||
                                    item === "itsecurity_phase1_deadline" ||
                                    item === "itsecurity_phase1_done" ||
                                    item === "itsecurity_phase2" ||
                                    item === "itsecurity_phase2_start" ||
                                    item === "itsecurity_phase2_deadline" ||
                                    item === "itsecurity_phase2_done" ||
                                    item === "itsecurity_phase3" ||
                                    item === "itsecurity_phase3_start" ||
                                    item === "itsecurity_phase3_deadline" ||
                                    item === "itsecurity_phase3_done" ||
                                    item === "itsecurity_phase4" ||
                                    item === "itsecurity_phase4_start" ||
                                    item === "itsecurity_phase4_deadline" ||
                                    item === "itsecurity_phase4_done" ||
                                    item === "itsecurity_phase5" ||
                                    item === "itsecurity_phase5_start" ||
                                    item === "itsecurity_phase5_deadline" ||
                                    item === "itsecurity_phase5_done" ||
                                    item === "itsecurity_phase6" ||
                                    item === "itsecurity_phase6_start" ||
                                    item === "itsecurity_phase6_deadline" ||
                                    item === "itsecurity_phase6_done" ||
                                    item === "itsecurity_phase7" ||
                                    item === "itsecurity_phase7_start" ||
                                    item === "itsecurity_phase7_deadline" ||
                                    item === "itsecurity_phase7_done" ||
                                    item === "userdomain" ||
                                    item === "userdomain_pic"
                                        ? "hidden"
                                        : ""
                                }`}
                            >
                                {getDisplayName(item)}
                            </th>
                        ))}
                        {(IsOperator() || IsItsecurityOperator()) && action && (
                            <th className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                Edit
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => {
                        const itsecurity_status = getStatus(item);
                        // console.log(itsecurity_status)
                        const rowClassName = rowClass(
                            item.itsecurity_deadline_project,
                            item.itsecurity_status
                        );

                        return (
                            <tr
                                key={index}
                                className={`${rowClassName}  text-xs leading-5`}
                                onDoubleClick={() =>
                                    handleDoubleClick(item.itsecurity_id)
                                }
                            >
                                {headers.map((header, headerIndex) => (
                                    <td
                                        key={headerIndex}
                                        className={`py-3 px-6 ${
                                            header === "itsecurity_id" ||
                                            header === "itsecurity_phase1" ||
                                            header ===
                                                "itsecurity_phase1_start" ||
                                            header ===
                                                "itsecurity_phase1_deadline" ||
                                            header ===
                                                "itsecurity_phase1_done" ||
                                            header === "itsecurity_phase2" ||
                                            header ===
                                                "itsecurity_phase2_start" ||
                                            header ===
                                                "itsecurity_phase2_deadline" ||
                                            header ===
                                                "itsecurity_phase2_done" ||
                                            header === "itsecurity_phase3" ||
                                            header ===
                                                "itsecurity_phase3_start" ||
                                            header ===
                                                "itsecurity_phase3_deadline" ||
                                            header ===
                                                "itsecurity_phase3_done" ||
                                            header === "itsecurity_phase4" ||
                                            header ===
                                                "itsecurity_phase4_start" ||
                                            header ===
                                                "itsecurity_phase4_deadline" ||
                                            header ===
                                                "itsecurity_phase4_done" ||
                                            header === "itsecurity_phase5" ||
                                            header ===
                                                "itsecurity_phase5_start" ||
                                            header ===
                                                "itsecurity_phase5_deadline" ||
                                            header ===
                                                "itsecurity_phase5_done" ||
                                            header === "itsecurity_phase6" ||
                                            header ===
                                                "itsecurity_phase6_start" ||
                                            header ===
                                                "itsecurity_phase6_deadline" ||
                                            header ===
                                                "itsecurity_phase6_done" ||
                                            header === "itsecurity_phase7" ||
                                            header ===
                                                "itsecurity_phase7_start" ||
                                            header ===
                                                "itsecurity_phase7_deadline" ||
                                            header === "itsecurity_phase7_done" ||
                                            header === "userdomain" ||
                                            header === "userdomain_pic"
                                                ? "hidden"
                                                : ""
                                        }`}
                                    >
                                        {header === "itsecurity_status"
                                            ? itsecurity_status
                                            : item[header]}
                                    </td>
                                ))}

                                {(IsOperator() || IsItsecurityOperator()) &&
                                    action && (
                                        <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(item.itsecurity_id)
                                                }
                                                className="text-black-400 flex flex-col gap-1 items-center justify-center pt-2"
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

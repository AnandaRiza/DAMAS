"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const LogisticTable = ({ headers, data, action, link, onSort, sortConfig }) => {
    const router = useRouter();

    const getDisplayName = (header) => {
        const displayNames = {
            memo_id: 'Memo ID',
            memo_num: 'Nomor Memo',
            memo_perihal: 'Perihal Memo',
            memo_pic: 'PIC',
            memo_department: 'Department',
            memo_createdBy: 'Created By',
            memo_reviewer: 'Reviewer',
            memo_deadline: 'Deadline',
            memo_status: 'Status Memo',
            memo_notes: 'Notes'
        };
        return displayNames[header] || header;
    };

    const handleEditClick = (memoId) => {
        router.push(`${link}mymemo/editmemo/${memoId}`);
    };

    const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                className={`py-3 px-6 uppercase ${['memo_id', 'memo_department', 'memo_createdBy', 'memo_reviewer', 'memo_notes','memo_upload'].includes(item) ? 'hidden' : ''}`}
                                onClick={() => onSort(item)}
                            >
                                <div className="flex items-center cursor-pointer">
                                    {getDisplayName(item)}
                                    {sortConfig.key === item && (
                                        sortConfig.direction === 'ascending' ? (
                                            <MdArrowDropUp className="ml-1" />
                                        ) : (
                                            <MdArrowDropDown className="ml-1" />
                                        )
                                    )}
                                </div>
                            </th>
                        ))}
                        {action && (
                            <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">
                                Edit
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0
                                    ? "bg-white"
                                    : "bg-[#00A6B4]/[0.5]"
                            } hover:bg-gray-100 text-xs leading-5`}
                        >
                            {headers.map((header, headerIndex) => (
                                <td
                                    key={headerIndex}
                                    className={`py-3 px-6 ${['memo_id', 'memo_department', 'memo_createdBy', 'memo_reviewer', 'memo_notes','memo_upload'].includes(header) ? 'hidden' : ''}`}
                                >
                                    {item[header]}
                                </td>
                            ))}
                            {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    {userId && (item.memo_createdBy === userId || item.memo_pic === userId) ? (
                                        <button
                                            type="button"
                                            className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2"
                                            onClick={() => handleEditClick(item.memo_id)}
                                        >
                                            <AiOutlineEdit size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-gray-400 flex flex-col gap-1 items-center justify-center pt-2 cursor-not-allowed"
                                            disabled
                                        >
                                            <AiOutlineEdit size={20} />
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogisticTable;

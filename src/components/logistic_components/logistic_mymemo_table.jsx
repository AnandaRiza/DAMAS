"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";


const MyMemoTable = ({ headers, data, action, link, onSort, sortConfig }) => {
    const router = useRouter();
    const [sortedData, setSortedData] = useState([]);
    

    useEffect(() => {
        const sorted = data.slice().sort((a, b) => {
            const classA = rowClass(a.memo_deadline, a.memo_status);
            const classB = rowClass(b.memo_deadline, b.memo_status);

            const aIsFinished = a.memo_status === 'MEMO APPROVED';
            const bIsFinished = b.memo_status === 'MEMO APPROVED';

            if (aIsFinished && bIsFinished) {
                return classA.localeCompare(classB);
            }

            if (aIsFinished) {
                return 1;
            }

            if (bIsFinished) {
                return -1;
            }

            if (a.memo_status === 'Ongoing' && b.memo_status === 'Ongoing') {
                return new Date(a.memo_deadline) - new Date(b.memo_deadline);
            }

            if (a.memo_status === 'Ongoing') {
                return 1;
            }

            if (b.memo_status === 'Ongoing') {
                return -1;
            }

            return classA.localeCompare(classB);
        });

        setSortedData(sorted);
    }, [data]);

    const handleDoubleClick = (memoId) => {
        router.push(`${link}mymemo/detailmemo/${memoId}`);
    };

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

    const rowClass = (deadline, status) => {
        const daysLeft = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
        if (status.includes('APPROVED')) return 'bg-green-200 hover:bg-green-300';
        if (status.includes('REJECTED')) return 'bg-red-200 hover:bg-red-300';
        if (status === 'MEMO DRAFT') return 'bg-blue-200 hover:bg-blue-300';
        if (status.trim() === 'APPROVAL REQUEST SENT TO HEAD OF DEPARTMENT', 'APPROVAL REQUEST SENT TO GROUP HEAD') return 'bg-yellow-200 hover:bg-yellow-300';
        if (daysLeft <= 3) return 'bg-red-200 hover:bg-red-300';
        if (daysLeft <= 7) return 'bg-yellow-200 hover:bg-yellow-300';
        return 'bg-white hover:bg-gray-300';
    };

    const handleEditClick = (memoId) => {
        router.push(`${link}mymemo/editmemo/${memoId}`);
    };

    const formatDate = (dateString) => {
        const parts = dateString.split(', ');
    
        // Splitting date part and handling date-only case
        const datePart = parts[0];
        const timePart = parts[1] || '00:00:00'; // Default time if not provided
    
        const [day, month, year] = datePart.split('/');
        const [hours, minutes, seconds] = timePart.split(':');
    
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthName = months[parseInt(month) - 1];
    
        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // Covers 11th-13th
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
    
        const formattedTime = `${hours}:${minutes}:${seconds}`;
    
        return `${parseInt(day)}${getOrdinalSuffix(day)} ${monthName} ${year}, ${formattedTime}`;
    };
    

    const calculateDeadlineStatus = (deadline, memoStatus) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        const daysLeft = (deadlineDate - currentDate) / (1000 * 60 * 60 * 24);

        if (memoStatus === 'MEMO APPROVED') return 'MEMO FINISHED';
        if (daysLeft < 0) return 'PAST DEADLINE';
        if (daysLeft <= 3) return 'WITHIN 3 DAYS';
        if (daysLeft <= 7) return 'WITHIN 7 DAYS';
        return 'ONGOING';
    };

    return (
        <div className="overflow-x-auto">
            {sortedData.length === 0 ? (
                <div className="py-5 text-center text-red-500">
                    No memos found. Please check back later.
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
                            {headers.map((item, index) => (
                                <th
                                    key={index}
                                    className={`py-3 px-6 uppercase ${['memo_id', 'memo_department', 'memo_createdBy', 'memo_reviewer', 'memo_notes', 'memo_upload','userdomain', 'userdomainpic','userdomainreviewer'].includes(item) ? 'hidden' : ''}`}
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
                            <th className="py-3 px-6 uppercase">Deadline Status</th>
                            {action && (
                                <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">
                                    Edit
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => {
                            const rowClassName = rowClass(item.memo_deadline, item.memo_status);
                            const deadlineStatus = calculateDeadlineStatus(item.memo_deadline, item.memo_status);

                            return (
                                <tr
                                    key={index}
                                    className={`${rowClassName} text-xs leading-5`}
                                    onDoubleClick={() => handleDoubleClick(item.memo_id)}
                                >
                                    {headers.map((header, headerIndex) => (
                                        <td
                                            key={headerIndex}
                                            className={`py-3 px-6 ${['memo_id', 'memo_department', 'memo_createdBy', 'memo_reviewer', 'memo_notes', 'memo_upload', 'userdomain', 'userdomainpic','userdomainreviewer'].includes(header) ? 'hidden' : ''}`}
                                        >
                                            {header === 'memo_deadline' ? formatDate(item[header]) : item[header]}
                                        </td>
                                    ))}
                                    <td className="py-3 px-6">{deadlineStatus}</td>
                                    {action && (
                                        <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                className="text-black-400 flex flex-col gap-1 items-center justify-center pt-2"
                                                onClick={() => handleEditClick(item.memo_id)}
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
            )}
        </div>
    );
};

export default MyMemoTable;

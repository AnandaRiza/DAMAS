"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const LogisticTable = ({ headers, data, action, link }) => {
    const router = useRouter();

   
    const getDisplayName = (header) => {
        const displayNames = {
            memo_id: 'Memo ID',
            memo_num: 'Memo Number'
          
        };
        return displayNames[header] || header;
    };

    const handleEditClick = (memoId) => {
        console.log("Memo ID:", memoId); // Debug log
        router.push(`${link}mymemo/editmemo/${memoId}`);
    };

    console.log("Data:", data); // Debug log

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                className={`py-3 px-6 uppercase ${item === 'memo_id' ? 'hidden' : ''}`}
                            >
                                {getDisplayName(item)}
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
                                    className={`py-3 px-6 ${header === 'memo_id' ? 'hidden' : ''}`}
                                >
                                    {item[header]}
                                </td>
                            ))}

                            {action && (    
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2"
                                        onClick={() =>
                                            handleEditClick(item.memo_id) // Access memo_id directly from item
                                        }
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

export default LogisticTable;

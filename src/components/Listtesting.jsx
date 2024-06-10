"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const operation_network_table = ({ headers, data, action, link }) => {
    const router = useRouter();

    const handleEdit = (network_id) => {
        router.push(`${link}/networkedit/${network_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            network_id: 'Network ID',
            network_perihal: "Perihal",
            network_pic: "PIC",
            network_deadline: "Deadline",
            network_status: "status"
          
        };
        return displayNames[header] || header;
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#FFFFFF]/[0.5] text-sm rounded-xl">
                        {headers.map((item, index) => (
                            <th key={index} 
                            className={`py-3 px-6 uppercase ${item === 'network_id' ? 'hidden' : ''}`}
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
                                    ? "bg-white"
                                    : "bg-[#00A6B4]/[0.5]"
                            } hover:bg-gray-100 text-xs leading-5`}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'network_id' ? 'hidden' : ''}`}>
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

export default operation_network_table;

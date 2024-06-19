"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const operation_network_table = ({ headers, data, action, link }) => {
    const router = useRouter();

    const handleEdit = (network_id) => {
        router.push(`${link}/network/networkedit/${network_id}`);
    };

    const handleDoubleClick = (network_id) => {
        router.push(`${link}/network/detail/${network_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            network_id: 'Network ID',
            network_perihal: "Nama Project",
            network_pic: "PIC",
            network_kickoff_start : "Kick Off Start",
            network_kickoff_deadline: "Kick Off Deadline",
            network_kickoff_done: " Kikck Off Done",
            network_mop_start: "MOP Start",
            network_mop_deadline: "MOP Deadline",
            network_mop_done: "MOP Dne",
            network_demomop_start: "Demo MOP Start",
            network_demomop_deadline: "Demo MOP Deadline",
            network_demomop_done: "Demo MOP Done",
            network_implementasi_start: "Implementasi Start",
            network_implementasi_deadline: "Impplementasi Deadline",
            network_implementasi_done: "implementasi_done",
            network_skse_start: "SKSE start",
            network_skse_deadline: "SKSE deadline",
            network_skse_done: "SKSE done",
            network_uat_start: "UAT start",
            network_uat_deadline: "UAT deadline",
            network_uat_done: "UAT done",
            network_status: "Status",
            network_deadline_project: "Deadline Project"
          
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
        const daysLeft = calculateTimeLeft(item.network_deadline_project);
        
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
                            item === 'network_id' ||
                            item === 'network_kickoff_start' ||
                            item === 'network_kickoff_deadline' ||
                            item === 'network_kickoff_done' ||
                            item === 'network_mop_start' ||
                            item === 'network_mop_deadline' ||
                            item === 'network_mop_done' ||
                            item === 'network_demomop_start' ||
                            item === 'network_demomop_deadline' ||
                            item === 'network_demomop_done' ||
                            item === 'network_implementasi_start' ||
                            item === 'network_implementasi_deadline' ||
                            item === 'network_implementasi_done' ||
                            item === 'network_skse_start' ||
                            item === 'network_skse_deadline' ||
                            item === 'network_skse_done' ||
                            item === 'network_uat_start' ||
                            item === 'network_uat_deadline' ||
                            item === 'network_uat_done'
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
                const network_status = getStatus(item);
                // console.log(network_status)
                const rowClassName = rowClass(item.network_deadline_project);
                
                return (
                    <tr
                        key={index}
                        className={`${rowClassName}  text-xs leading-5`}
                        onDoubleClick={() => handleDoubleClick(item.network_id)}
                    >
                        {headers.map((header, headerIndex) => (
                            <td key={headerIndex} className={`py-3 px-6 ${
                                header === 'network_id' ||
                                header === 'network_kickoff_start' ||
                                header === 'network_kickoff_deadline' ||
                                header === 'network_kickoff_done' ||
                                header === 'network_mop_start' ||
                                header === 'network_mop_deadline' ||
                                header === 'network_mop_done' ||
                                header === 'network_demomop_start' ||
                                header === 'network_demomop_deadline' ||
                                header === 'network_demomop_done' ||
                                header === 'network_implementasi_start' ||
                                header === 'network_implementasi_deadline' ||
                                header === 'network_implementasi_done' ||
                                header === 'network_skse_start' ||
                                header === 'network_skse_deadline' ||
                                header === 'network_skse_done' ||
                                header === 'network_uat_start' ||
                                header === 'network_uat_deadline' ||
                                header === 'network_uat_done' 
                                    ? 'hidden'
                                     : ''
                                }`}
                            >
                                {header === "network_status" ? network_status : item[header]}
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

export default operation_network_table;

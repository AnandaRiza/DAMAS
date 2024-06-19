"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const TableSDLC = ({ headers, data, action, link }) => {
    const router = useRouter();

    const handleEdit = (id) => {
        router.push(`${link}/edit/${id}`);
    };

    const handleDoubleClick = (id) => {
        router.push(`${link}/detail/${id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            projectname: "Project Name",
            pic: "PIC",
            departement: "Departement",
            kickoffstart: "Kick Off Start",
            kickoffdeadline: "Kick Off Deadline",
            kickoffdone: "Kick off Done",
            userrequirementstart: "User Requirement Start",
            userrequirementdeadline: "User Requirement Deadline",
            userrequirementdone: "User Requirement Done",
            applicationdevelopmentstart: "Application Development Start",
            applicationdevelopmentdeadline: "Application Development Deadline",
            applicationdevelopmentdone: "Application Development Done",
            sitstart: "SIT Start",
            sitdeadline: "SIT Deadline",
            sitdone: "SIT Done",
            uatstart: "UAT Start",
            uatdeadline: "UAT Deadline",
            uatdone: "UAT Done",
            implementationpreparestart: "Implementation Prepare Start",
            implementationpreparedeadline: "Implementation Prepare Deadline",
            implementationpreparedone: "Implementation Prepare Done",
            implementationmeetingstart: "Implementation Meeting Start",
            implementationmeetingdeadline: "Implementation Meeting Deadline",
            implementationmeetingdone: "Implementation Meeting Done",
            implementationstart: "Implementation Start",
            implementationdeadline: "Implementation Deadline",
            implementationdone: "Implementation Done",
            postimplementationreviewstart: "Post Implementation Review Start",
            postimplementationreviewdeadline:
                "Post Implementation Review Deadline",
            postimplementationreviewdone: "Post Implementation Review Done",
            status: "Status",
            deadlineproject: "Deadline Project",
            projectdone: "Project Done",
        };

        const displayName = displayNames[header] || header;
        // console.log(`Header: ${header}, DisplayName: ${displayName}`);
        return displayName;
    };

    const calculateTimeLeft = (date) => {
        const now = new Date();
        const deadline = new Date(date);
        const difference = deadline.getTime() - now.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
        return daysLeft;
    };


    const getStatus = (item) => {
        const daysLeft = calculateTimeLeft(item.deadlineproject);
        
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
                    <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                className={`py-3 px-6 ${
                                    item === "id" ||
                                    item === "kickoffstart" ||
                                    item === "kickoffdeadline" ||
                                    item === "kickoffdone" ||
                                    item === "kickoffstart" ||
                                    item === "userrequirementstart" ||
                                    item === "userrequirementdeadline" ||
                                    item === "userrequirementdone" ||
                                    item === "applicationdevelopmentstart" ||
                                    item === "applicationdevelopmentdeadline" ||
                                    item === "applicationdevelopmentdone" ||
                                    item === "sitstart" ||
                                    item === "sitdeadline" ||
                                    item === "sitdone" ||
                                    item === "uatstart" ||
                                    item === "uatdeadline" ||
                                    item === "uatdone" ||
                                    item === "implementationpreparestart" ||
                                    item === "implementationpreparedeadline" ||
                                    item === "implementationpreparedone" ||
                                    item === "implementationmeetingstart" ||
                                    item === "implementationmeetingdeadline" ||
                                    item === "implementationmeetingdone" ||
                                    item === "implementationstart" ||
                                    item === "implementationdeadline" ||
                                    item === "implementationdone" ||
                                    item === "postimplementationreviewstart" ||
                                    item ===
                                        "postimplementationreviewdeadline" ||
                                    item === "postimplementationreviewdone" ||
                                    item === "projectdone"
                                        ? "hidden"
                                        : ""
                                }`}
                            >
                                {getDisplayName(item)}
                            </th>
                        ))}
                        {action && (
                            <th className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                Edit
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const status = getStatus(item);
                        const rowClassName = rowClass(item.deadlineproject);

                        return (
                            <tr
                                key={index}
                                className={`${rowClassName}  text-xs leading-5`}
                                onDoubleClick={() => handleDoubleClick(item.id)}
                            >
                                {headers.map((header, headerIndex) => (
                                    <td
                                        key={headerIndex}
                                        className={`py-3 px-6 ${
                                            header === "id" ||
                                            header === "kickoffstart" ||
                                            header === "kickoffdeadline" ||
                                            header === "kickoffdone" ||
                                            header === "userrequirementstart" ||
                                            header === "userrequirementdeadline" ||
                                            header === "userrequirementdone" ||
                                            header === "applicationdevelopmentstart" ||
                                            header === "applicationdevelopmentdeadline" ||
                                            header === "applicationdevelopmentdone" ||
                                            header === "sitstart" ||
                                            header === "sitdeadline" ||
                                            header === "sitdone" ||
                                            header === "uatstart" ||
                                            header === "uatdeadline" ||
                                            header === "uatdone" ||
                                            header === "implementationpreparestart" ||
                                            header === "implementationpreparedeadline" ||
                                            header === "implementationpreparedone" ||
                                            header === "implementationmeetingstart" ||
                                            header === "implementationmeetingdeadline" ||
                                            header === "implementationmeetingdone" ||
                                            header === "implementationstart" ||
                                            header === "implementationdeadline" ||
                                            header === "implementationdone" ||
                                            header === "postimplementationreviewstart" ||
                                            header === "postimplementationreviewdeadline" ||
                                            header === "postimplementationreviewdone" ||
                                            header === "projectdone"
                                                ? "hidden"
                                                : ""
                                        }`}
                                    >
                                       {header === "status" ? status : item[header]}
                                    </td>
                                ))}

                                {action && (
                                    <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item[headers[0]])}
                                            className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2"
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

export default TableSDLC;

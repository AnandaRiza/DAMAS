"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const Page = ({ headers, data, action, link}) => {
    const router = useRouter();

    const handleEdit = (server_id) => {
        const updatedData = data.map((item) => {
            if (item.server_id === server_id) {
                item.status = "Finish";
                router.push(`${link}/server/serveredit/${server_id}`);
            }
            return item;
        });
    };

    const handleDoubleClick = (server_id) => {
        router.push(`${link}/server/detail/${server_id}`);
    };

    const getDisplayName = (header) => {
        const displayNames = {
            server_id: "Server ID",
            server_perihal: "Nama Project",
            server_pic: "PIC",
            departement: "Departement",
            server_kickoff_start: "Kick Off Start", 
            server_kickoff_deadline: "Kick Off Deadline",
            server_kickoff_done: "Kick Off Done",
            server_peyiapanserver_start: "Penyiapan Server Start",
            server_peyiapanserver_deadline: "Penyiapan Server Deadline",
            server_peyiapanserver_done: "Penyiapan Server Done",
            server_instalasiaplikasi_start: "Instaasi Aplikasi Start",
            server_instalasiaplikasi_deadline: "Instalasi Aplikasi Deadline",
            server_instalasiaplikasi_done: "Instalasi Aplikasi Done",
            server_instalcheckpoint_start: "Instal Checkpoint Start",
            server_instalcheckpoint_deadline: "Instal Checkpoint Deadline",
            server_instalcheckpoint_done: "Install Checkpoint Done",
            server_testingkoneksi_start: "Testing Koneksi Start",
            server_testingkoneksi_deadline: "Testing Koneksi Deadline",
            server_testingkoneksi_done: "Testing Koneksi Done",
            server_serahterimaserver_start: "Serah Terima Server Start",
            server_serahterimaserver_deadline: "Serah Terima Server Deadline",
            server_serahterimaserver_done: "Serah Terima Server Done",
            server_implementasi_start: "Implementasi Start",
            server_implementasi_deadline: "Implementasi Deadline",
            server_implementasi_done: "Implementasi Done",
            server_status: "Status",
            server_deadline_project: "Deadline Project",
            server_project_done: "Project Done"
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

        const { server_status } = item;

        if (server_status === "Finished") {
            return "Finished";
        }

        const daysLeft = calculateTimeLeft(item.server_deadline_project);

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

    const rowClass = (inputDate, server_status) => {
        const calculateTimeLeft = (date) => {
            const now = new Date();
            const deadline = new Date(date);
            const difference = deadline.getTime() - now.getTime();
            const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
            return daysLeft;
        };

        if (server_status === "Finished") {
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
        const classA = rowClass(a.server_deadline_project, a.server_status);
        const classB = rowClass(b.server_deadline_project, b.server_status);


        const aIsFinished = a.server_status === "Finished";
        const bIsFinished = b.server_status === "Finished";
    
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
    
        if (a.server_status === "Finished" && b.server_status === "Finished") {
            return classA.localeCompare(classB);
        }
    
        if (a.server_status === "Finished") {
            return 1; // Move 'Finished' projects to the bottom
        }
    
        if (b.server_status === "Finished") {
            return -1; // Move 'Finished' projects to the bottom
        }
    
        // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
        if (a.server_status === "Ongoing" && b.server_status === "Ongoing") {
            // Urutkan berdasarkan deadlineproject
            return new Date(a.server_deadline_project) - new Date(b.server_deadline_project);
        }
    
        // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
        if (a.server_status === "Ongoing") {
            return 1; // Letakkan a di bawah b
        }
    
        if (b.server_status === "Ongoing") {
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
                                item === 'server_id' ||
                                item === 'server_kickoff_start' ||
                                item === 'server_kickoff_deadline' ||
                                item === 'server_kickoff_done' ||
                                item === 'server_peyiapanserver_start' ||
                                item === 'server_peyiapanserver_deadline' ||
                                item === 'server_peyiapanserver_done' ||
                                item === 'server_instalasiaplikasi_start' ||
                                item === 'server_instalasiaplikasi_deadline' ||
                                item === 'server_instalasiaplikasi_done' ||
                                item === 'server_instalcheckpoint_start' ||
                                item === 'server_instalcheckpoint_deadline' ||
                                item === 'server_instalcheckpoint_done' ||
                                item === 'server_testingkoneksi_start' ||
                                item === 'server_testingkoneksi_deadline' ||
                                item === 'server_testingkoneksi_done' ||
                                item === 'server_serahterimaserver_start' ||
                                item === 'server_serahterimaserver_deadline' ||
                                item === 'server_serahterimaserver_done' ||
                                item === 'server_implementasi_start' ||
                                item === 'server_implementasi_deadline' ||
                                item === 'server_implementasi_done' 
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
                    const server_status = getStatus(item);
                    const rowClassName = rowClass(item.server_deadline_project, item.server_status);
                    
                    return (
                        <tr
                            key={index}
                            className={`${rowClassName}  text-xs leading-5`}
                            onDoubleClick={() => handleDoubleClick(item.server_id)}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${
                                    header === 'server_id' ||
                                    header === 'server_kickoff_start' ||
                                    header === 'server_kickoff_deadline' ||
                                    header === 'server_kickoff_done' ||
                                    header === 'server_peyiapanserver_start' ||
                                    header === 'server_peyiapanserver_deadline' ||
                                    header === 'server_peyiapanserver_done' ||
                                    header === 'server_instalasiaplikasi_start' ||
                                    header === 'server_instalasiaplikasi_deadline' ||
                                    header === 'server_instalasiaplikasi_done' ||
                                    header === 'server_instalcheckpoint_start' ||
                                    header === 'server_instalcheckpoint_deadline' ||
                                    header === 'server_instalcheckpoint_done' ||
                                    header === 'server_testingkoneksi_start' ||
                                    header === 'server_testingkoneksi_deadline' ||
                                    header === 'server_testingkoneksi_done' ||
                                    header === 'server_serahterimaserver_start' ||
                                    header === 'server_serahterimaserver_deadline' ||
                                    header === 'server_serahterimaserver_done' ||
                                    header === 'server_implementasi_start' ||
                                    header === 'server_implementasi_deadline' ||
                                    header === 'server_implementasi_done' 
                                        ? 'hidden'
                                         : ''
                                    }`}
                                >
                                    {header === "server_status" ? server_status : item[header]}
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

export default Page;

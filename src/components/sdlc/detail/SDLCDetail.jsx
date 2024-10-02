"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SDLCDetail = () => {

    const params = useParams();
    const [dataAllProject, setDataAllProject] = useState({
        recId: "",
        createdBy: "",
        createdDateTime: "",
        projectEndDate: "",
        projectName: "",
        projectNumber: "",
        status: "",
        owner: "",
        summary: "",
        bcasNoPMO: "",
        bcasJenisAplikasi: "",
        bcasJenisProject: "",
        bcasTipeProject: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/detail/${params.recId}`
                );
                console.log(response)
                setDataAllProject(response.data.data);
                console.log(setDataAllProject);
            } catch (error) {
                console.log(error);
            }
        };

        getCurrentData();
        // console.log(dataAllProject);
    }, [params.recId]);
   


    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
        <div className="px-10 grid grid-cols-1 gap-3 mt-4 w-full p-4">
            {dataAllProject.recId ? (
                <form className="space-y-4">
                    {/* Grid layout for form */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label
                                htmlFor="namaproject"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Project Name
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.projectName}
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="summary"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Summary
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.summary}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        summary: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="bcasTipeProject"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tipe Project
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.bcasTipeProject}
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="owner"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Owner
                            </label>
                            <input
                                disabled
                                type="owner"
                                value={dataAllProject.owner}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        owner: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="bcasJenisAplikasi"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Jenis Aplikasi
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.bcasJenisAplikasi}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        bcasJenisAplikasi: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="bcasJenisProject"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Jenis Project
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.bcasJenisProject}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        bcasJenisProject: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="bcasNoPMO"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                No PMO
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.bcasNoPMO}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        bcasNoPMO: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="status"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Status
                            </label>
                            <input
                                disabled
                                type="text"
                                id="status"
                                name="status"
                                value={dataAllProject.status}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        status: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="createdDateTime"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Planned Start Date
                            </label>
                            <input
                                disabled
                                type="text"
                                id="createdDateTime"
                                name="createdDateTime"
                                value={dataAllProject.createdDateTime.slice(0, 19)}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        createdDateTime: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="projectEndDate"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Planned End Date
                            </label>
                            <input
                                disabled
                                type="text"
                                id="projectEndDate"
                                name="projectEndDate"
                                value={dataAllProject.projectEndDate.slice(0, 19)}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        projectEndDate: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="createdBy"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                createdBy
                            </label>
                            <input
                                disabled
                                type="text"
                                value={dataAllProject.createdBy}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        createdBy: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                    </div>  
                        
                        
                    </form>
                ) : (
                    <PleaseWait />
                )}
            </div>
        </div>
    );
};

export default SDLCDetail;

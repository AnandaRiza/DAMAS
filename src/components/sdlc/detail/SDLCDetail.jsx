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
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
                {dataAllProject ? (
                    <form className="space-y-4 ">
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
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        projectName: e.target.value,
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
                    </form>
                ) : (
                    <PleaseWait />
                )}
            </div>
        </div>
    );
};

export default SDLCDetail;

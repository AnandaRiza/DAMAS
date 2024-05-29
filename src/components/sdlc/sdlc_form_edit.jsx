"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const page = () => {
    const params = useParams();
    const [dataAllProject, setDataAllProject] = useState({
        projectname: "",
        pic: "",
        deadline: "",
        status: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/getproject?input=${params.id}`
                );
                setDataAllProject(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentData();
    }, [params.id]);

    const handleEditedData = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/editedproject?input=${params.id}`,
                dataAllProject
            );
            console.log(response.data);
            alert("Edit Success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-4">
            {dataAllProject ? (
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="namaproject"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Project Name
                        </label>
                        <input
                            type="text"
                            value={dataAllProject.projectname}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    projectname: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="pic"
                            className="text-sm font-semibold text-gray-600"
                        >
                            PIC
                        </label>
                        <input
                            type="text"
                            className="input input-bordered mt-1"
                            value={dataAllProject.pic}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    pic: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllProject.deadline}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    deadline: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="status"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Status
                        </label>
                        <div className="dropdown mt-1">
                            <div tabIndex={0} role="button" className="btn m-1">
                                {dataAllProject.status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li>
                                    <a
                                        onClick={(e) =>
                                            setDataAllProject({
                                                ...dataAllProject,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllProject({
                                                ...dataAllProject,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Finished">
                                            Finished
                                        </option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllProject({
                                                ...dataAllProject,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Past Deadline">
                                            Past Deadline
                                        </option>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center text-white ml-3 mt-3">
                        <Link href="/main/development">
                            <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                                <MdOutlineCancel />
                                <span>Cancel</span>
                            </button>
                        </Link>
                        <button
                        type="button"
                            className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center"
                            onClick={handleEditedData}
                        >
                            <FiSave />
                            <span>Edit</span>
                        </button>
                    </div>
                </form>
            ) : (
                <PleaseWait />
            )}
        </div>
    );
};

export default page;

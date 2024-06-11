
"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
    const params = useParams();
    const [selectedDept, setSelectedDept] = useState("");
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllProject, setDataAllProject] = useState({
        projectname: "",
        pic: "",
        departement: "",
        kickoff: "",
        userrequirement: "",
        applicationdevelopment: "",
        sit: "",
        uat: "",
        implementationprepare: "",
        implementationmeeting: "",
        implementation: "",
        postimplementationreview: "",
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
        getDataAllPic();
        getCurrentData();
        console.log(dataAllProject);
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
            );
            setDataAllPic(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditedData = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/editedproject?input=${params.id}`,
                dataAllProject
            );
            // console.log(response.data);
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
                        {dataAllPic && (
                            <select
                                type="text"
                                className="input input-bordered mt-1"
                                value={dataAllProject.name}
                                onChange={(e) => {
                                    const selectedPic = JSON.parse(
                                        e.target.value
                                    );
                                    setDataAllProject({
                                        ...dataAllProject,
                                        pic: selectedPic.nama,
                                        departement: selectedPic.departemen,
                                    });
                                    setSelectedDept(selectedPic.departemen);
                                }}
                            >
                                <option
                                    // disabled
                                    // selected
                                    className="text-sm text-gray-600 opacity-50"
                                    value={dataAllProject.pic}
                                >
                                    {dataAllProject.pic}
                                </option>
                                {dataAllPic.map((item, index) => (
                                    <option
                                        key={index}
                                        value={JSON.stringify(item)}
                                    >
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="departemen"
                            className="text-sm font-semibold"
                        >
                            Departemen
                        </label>
                        <input
                            className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            type="text"
                            value={selectedDept}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="kickoff"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Kick Off
                        </label>
                        <input
                            type="date"
                            id="kickoff"
                            name="kickoff"
                            value={dataAllProject.kickoff}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    kickoff: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="userrequirement"
                            className="text-sm font-semibold text-gray-600"
                        >
                            User Requierement
                        </label>
                        <input
                            type="date"
                            id="userrequirement"
                            name="userrequirement"
                            value={dataAllProject.userrequirement}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    userrequirement: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="applicationdevelopment"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Application Development
                        </label>
                        <input
                            type="date"
                            id="applicationdevelopment"
                            name="applicationdevelopment"
                            value={dataAllProject.applicationdevelopment}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    applicationdevelopment: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="sit"
                            className="text-sm font-semibold text-gray-600"
                        >
                            SIT
                        </label>
                        <input
                            type="date"
                            id="sit"
                            name="sit"
                            value={dataAllProject.sit}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    sit: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="uat"
                            className="text-sm font-semibold text-gray-600"
                        >
                            UAT
                        </label>
                        <input
                            type="date"
                            id="uat"
                            name="uat"
                            value={dataAllProject.uat}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    uat: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="implementationprepare"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Implementation Prepare
                        </label>
                        <input
                            type="date"
                            id="implementationprepare"
                            name="implementationprepare"
                            value={dataAllProject.implementationprepare}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    implementationprepare: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="implementationmeeting"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Implementation Meeting
                        </label>
                        <input
                            type="date"
                            id="implementationmeeting"
                            name="implementationmeeting"
                            value={dataAllProject.implementationmeeting}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    implementationmeeting: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="implementation"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Implementation
                        </label>
                        <input
                            type="date"
                            id="implementation"
                            name="implementation"
                            value={dataAllProject.implementation}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    implementation: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="postimplementationreview"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Post Implementation Review
                        </label>
                        <input
                            type="date"
                            id="postimplementationreview"
                            name="postimplementationreview"
                            value={dataAllProject.postimplementationreview}
                            onChange={(e) =>
                                setDataAllProject({
                                    ...dataAllProject,
                                    postimplementationreview: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
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

export default Page;

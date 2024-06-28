"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProjectDetail = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const params = useParams();
    const [selectedDept, setSelectedDept] = useState("");
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllProject, setDataAllProject] = useState({
        submitter: "",
        authorizer: "",
        submitAt: "",
        deadlineApprovement: "",
        statusApprovement: "",
        projectname: "",
        pic: "",
        departement: "",
        kickoffstart: "",
        kickoffdeadline: "",
        kickoffdone: "",
        userrequirementstart: "",
        userrequirementdeadline: "",
        userrequirementdone: "",
        applicationdevelopmentstart: "",
        applicationdevelopmentdeadline: "",
        applicationdevelopmentdone: "",
        sitstart: "",
        sitdeadline: "",
        sitdone: "",
        uatstart: "",
        uatdeadline: "",
        uatdone: "",
        implementationpreparestart: "",
        implementationpreparedeadline: "",
        implementationpreparedone: "",
        implementationmeetingstart: "",
        implementationmeetingdeadline: "",
        implementationmeetingdone: "",
        implementationstart: "",
        implementationdeadline: "",
        implementationdone: "",
        postimplementationreviewstart: "",
        postimplementationreviewdeadline: "",
        postimplementationreviewdone: "",
        status: "",
        deadlineproject: "",
        projectdone: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/getproject?input=${params.id}`
                );
                setDataAllProject(response.data.data[0]);
                // console.log(response.data.data[0].id);
            } catch (error) {
                console.log(error);
            }
        };
        getDataAllPic();
        getCurrentData();
        // console.log(dataAllProject);
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
            );
            setDataAllPic(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (dataAllProject) {
            setSelectedDept(dataAllProject.departement);
        }
    }, [dataAllProject]);

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
                                value={dataAllProject.projectname}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        projectname: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="pic"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                PIC
                            </label>
                            {dataAllPic && (
                                <select
                                    disabled
                                    type="text"
                                    className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
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
                                        className="text-sm"
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
                                className="text-sm font-semibold text-[#0066AE]"
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
                                htmlFor="kickoffstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Kick Off Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="kickoffstart"
                                name="kickoffstart"
                                value={dataAllProject.kickoffstart}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        kickoffstart: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="kickoffdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Kick Off Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="kickoffdeadline"
                                name="kickoffdeadline"
                                value={dataAllProject.kickoffdeadline}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        kickoffdeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="kickoff"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Kick Off Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="kickoff"
                                name="kickoff"
                                value={dataAllProject.kickoffdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        kickoffdone: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="userrequirementstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                User Requierement Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="userrequirementstart"
                                name="userrequirementstart"
                                value={dataAllProject.userrequirementstart}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        userrequirementstart: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="userrequirementdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                User Requierement Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="userrequirementdeadline"
                                name="userrequirementdeadline"
                                value={dataAllProject.userrequirementdeadline}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        userrequirementdeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="userrequirement"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                User Requierement Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="userrequirement"
                                name="userrequirement"
                                value={dataAllProject.userrequirementdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        userrequirementdone: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="applicationdevelopmentstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Application Development Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="applicationdevelopmentstart"
                                name="applicationdevelopmentstart"
                                value={
                                    dataAllProject.applicationdevelopmentstart
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        applicationdevelopmentstart:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="applicationdevelopmentdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Application Development Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="applicationdevelopmentdeadline"
                                name="applicationdevelopmentdeadline"
                                value={
                                    dataAllProject.applicationdevelopmentdeadline
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        applicationdevelopmentdeadline:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="applicationdevelopment"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Application Development Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="applicationdevelopment"
                                name="applicationdevelopment"
                                value={
                                    dataAllProject.applicationdevelopmentdone
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        applicationdevelopmentdone:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="sitstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                SIT Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="sitstart"
                                name="sitstart"
                                value={dataAllProject.sitstart}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        sitstart: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="sitdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                SIT Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="sitdeadline"
                                name="sitdeadline"
                                value={dataAllProject.sitdeadline}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        sitdeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="sit"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                SIT Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="sit"
                                name="sit"
                                value={dataAllProject.sitdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        sitdone: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="uatstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                UAT Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="uatstart"
                                name="uatstart"
                                value={dataAllProject.uatstart}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        uatstart: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="uatdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                UAT Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="uatdeadline"
                                name="uatdeadline"
                                value={dataAllProject.uatdeadline}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        uatdeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="uat"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                UAT Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="uat"
                                name="uat"
                                value={dataAllProject.uatdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        uatdone: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationpreparestart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Prepare Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationpreparestart"
                                name="implementationpreparestart"
                                value={
                                    dataAllProject.implementationpreparestart
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationpreparestart:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationpreparedeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Prepare Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationpreparedeadline"
                                name="implementationpreparedeadline"
                                value={
                                    dataAllProject.implementationpreparedeadline
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationpreparedeadline:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationprepare"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Prepare Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="implementationprepare"
                                name="implementationprepare"
                                value={dataAllProject.implementationpreparedone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationpreparedone:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationmeetingstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Meeting Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationmeetingstart"
                                name="implementationmeetingstart"
                                value={
                                    dataAllProject.implementationmeetingstart
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationmeetingstart:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationmeetingdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Meeting Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationmeetingdeadline"
                                name="implementationmeetingdeadline"
                                value={
                                    dataAllProject.implementationmeetingdeadline
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationmeetingdeadline:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationmeeting"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Meeting Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="implementationmeeting"
                                name="implementationmeeting"
                                value={dataAllProject.implementationmeetingdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationmeetingdone:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationstart"
                                name="implementationstart"
                                value={dataAllProject.implementationstart}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationstart: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementationdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="implementationdeadline"
                                name="implementationdeadline"
                                value={dataAllProject.implementationdeadline}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationdeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="implementation"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Implementation Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="implementation"
                                name="implementation"
                                value={dataAllProject.implementationdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        implementationdone: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="postimplementationreviewstart"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Post Implementation Review Start
                            </label>
                            <input
                                disabled
                                type="date"
                                id="postimplementationreviewstart"
                                name="postimplementationreviewstart"
                                value={
                                    dataAllProject.postimplementationreviewstart
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        postimplementationreviewstart:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="postimplementationreviewdeadline"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Post Implementation Review Deadline
                            </label>
                            <input
                                disabled
                                type="date"
                                id="postimplementationreviewdeadline"
                                name="postimplementationreviewdeadline"
                                value={
                                    dataAllProject.postimplementationreviewdeadline
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        postimplementationreviewdeadline:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="postimplementationreview"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Post Implementation Review Acctual Done
                            </label>
                            <input
                            disabled
                                type="date"
                                id="postimplementationreview"
                                name="postimplementationreview"
                                value={
                                    dataAllProject.postimplementationreviewdone
                                }
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        postimplementationreviewdone:
                                            e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        {/* Status dropdown */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="status"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Status
                            </label>
                            <div className="dropdown mt-1 ">
                            
                                <div
                                // disabled
                                //     tabIndex={0}
                                //     role="button"
                                    className=" btn disabled:text-black"
                                >
                                    {dataAllProject.status}
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52  "
                                >
                                    <li className="  disabled:text-black">
                                        <a 
                                            onClick={() =>
                                                setDataAllProject({
                                                    ...dataAllProject,
                                                    status: "Ongoing",
                                                })
                                            }
                                        >
                                            Ongoing
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                setDataAllProject({
                                                    ...dataAllProject,
                                                    status: "Finished",
                                                })
                                            }
                                        >
                                            Finished
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                setDataAllProject({
                                                    ...dataAllProject,
                                                    status: "Past-Deadline",
                                                })
                                            }
                                        >
                                            Past Deadline
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="deadlineproject"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Deadline Project
                            </label>
                            <input
                                disabled
                                type="date"
                                id="deadlineproject"
                                name="deadlineproject"
                                value={dataAllProject.deadlineproject}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        deadlineproject: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="projectdone"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Project Finished
                            </label>
                            <input
                                disabled
                                type="date"
                                id="projectdone"
                                name="projectdone"
                                value={dataAllProject.projectdone}
                                onChange={(e) =>
                                    setDataAllProject({
                                        ...dataAllProject,
                                        projectdone: e.target.value,
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

export default MyProjectDetail;

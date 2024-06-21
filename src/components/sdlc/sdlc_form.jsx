"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SDLCForm = () => {
    const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const router = useRouter();
    
    // State to manage form data
    const [formData, setFormData] = useState({
        projectname: "",
        pic: "",
        departement:"",
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
        createdby: "",
    });
  
    

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
        getDataAllPic();
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
    }, []);

    const handleSubmit = async () => {
        try {
            const requiredFields = ["projectname", "pic", "kickoffstart", "kickoffdeadline", "userrequirementstart","userrequirementdeadline","applicationdevelopmentstart","applicationdevelopmentdeadline", "sitstart", "sitdeadline", "uatstart", "uatdeadline", "implementationpreparestart", "implementationpreparedeadline", "implementationmeetingstart", "implementationmeetingdeadline", "implementationstart", "implementationdeadline", "postimplementationreviewstart", "postimplementationreviewdeadline", "status", "deadlineproject"];
            const emptyFields = requiredFields.filter(field => !formData[field]);
            if (emptyFields.length > 0) {
                alert(`Please fill in the following fields: ${emptyFields.join(", ")}`);
                return;
            }
            await axios.post( `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/projectdev`,
            {
                ...formData,
                createdby: userid,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "USER-ID": userid,
                },
            }
            
        );
        router.push("/main/development")
        // console.log(createdby)
        } catch (error) {
            console.log(error);
            alert("Create Project Failed!");
        }
    };

    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">

            <form className="space-y-4 ">
            <div className="flex flex-col">
                <label
                    htmlFor="namaproject"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Project Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="namaproject"
                    name="namaproject"
                    value={formData.projectname}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            projectname: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="pic"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    PIC <span className="text-red-500">*</span>
                </label>
                {dataAllPic && (
                    <select
                        name="pic"
                        id="pic"
                        className="input input-bordered mt-1"
                        value={formData.nama}
                        onChange={(e) => {
                            const selectedPic = JSON.parse(e.target.value);
                            setFormData({ ...formData, pic: selectedPic.nama, departement:selectedPic.departemen });
                            setSelectedDept(selectedPic.departemen)
                        }
                        }
                    >
                        <option
                            disabled
                            selected
                            className="text-sm text-gray-600 opacity-50"
                        >
                            Select PIC...
                        </option>
                        {dataAllPic.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>
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
                    Departement
                </label>
                <input 
                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                type="text" 
                value={selectedDept} disabled />
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="kickoffstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Kick Off Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="kickoffstart"
                    name="kickoffstart"
                    value={formData.kickoffstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffstart: (e.target.value),
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="kickoffdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Kick Off Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="kickoffdeadline"
                    name="kickoffdeadline"
                    value={formData.kickoffdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="userrequirementstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    User Requierement Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="userrequirementstart"
                    name="userrequirementstart"
                    value={formData.userrequirementstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            userrequirementstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="userrequirementdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    User Requierement Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="userrequirementdeadline"
                    name="userrequirementdeadline"
                    value={formData.userrequirementdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            userrequirementdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopmentstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Application Development Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="applicationdevelopmentstart"
                    name="applicationdevelopmentstart"
                    value={formData.applicationdevelopmentstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationdevelopmentstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopmentdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Application Development Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="applicationdevelopmentdeadline"
                    name="applicationdevelopmentdeadline"
                    value={formData.applicationdevelopmentdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationdevelopmentdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
        
            <div className="flex flex-col">
                <label
                    htmlFor="sitstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    SIT Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="sitstart"
                    name="sitstart"
                    value={formData.sitstart}
                    onChange={(e) =>
                        setFormData({ ...formData, sitstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="sitdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    SIT Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="sitdeadline"
                    name="sitdeadline"
                    value={formData.sitdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, sitdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
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
                    type="date"
                    id="uatstart"
                    name="uatstart"
                    value={formData.uatstart}
                    onChange={(e) =>
                        setFormData({ ...formData, uatstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="uatdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    UAT Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="uatdeadline"
                    name="uatdeadline"
                    value={formData.uatdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, uatdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationpreparestart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Prepare Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationpreparestart"
                    name="implementationpreparestart"
                    value={formData.implementationpreparestart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationpreparestart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationpreparedeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Prepare Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationpreparedeadline"
                    name="implementationpreparedeadline"
                    value={formData.implementationpreparedeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationpreparedeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationmeetingstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Meeting Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationmeetingstart"
                    name="implementationmeetingstart"
                    value={formData.implementationmeetingstart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeetingstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationmeetingdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Meeting Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationmeetingdeadline"
                    name="implementationmeetingdeadline"
                    value={formData.implementationmeetingdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeetingdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationstart"
                    name="implementationstart"
                    value={formData.implementationstart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationdeadline"
                    name="implementationdeadline"
                    value={formData.implementationdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreviewstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Post Implementation Review Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="postimplementationreviewstart"
                    name="postimplementationreviewstart"
                    value={formData.postimplementationreviewstart}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreviewstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreviewdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Post Implementation Review Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="postimplementationreviewdeadline"
                    name="postimplementationreviewdeadline"
                    value={formData.postimplementationreviewdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreviewdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            {/* Status dropdown */}
            <div className="flex flex-col">
                <label
                    htmlFor="status"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Status <span className="text-red-500">*</span>
                </label>
                <div className="dropdown mt-1 ">
                    <div tabIndex={0} role="button" className="btn m-1 w-52 bg-white hover:bg-gray text-gray-600">
                        {formData.status ? formData.status : "Select Status"}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 mb-4"
                    >
                        <li>
                            <a
                                onClick={() =>
                                    setFormData({
                                        ...formData,
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
                                    setFormData({
                                        ...formData,
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
                                    setFormData({
                                        ...formData,
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
                    Deadline Project <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="deadlineproject"
                    name="deadlineproject"
                    value={formData.deadlineproject}
                    onChange={(e) =>
                        setFormData({ ...formData, deadlineproject: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            {/* Submit button */}
            <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={handleSubmit}
            >
                Create Project
            </button>
        </form>
            </div>
            
        </div>
       
    );
};

export default SDLCForm;

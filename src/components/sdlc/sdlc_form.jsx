"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const SDLCForm = () => {
    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
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
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8081/api/projectdev", formData);
            alert("Create Project Success");
        } catch (error) {
            console.log(error);
            alert("Create Project Failed!");
        }
    };

    return (
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
                    className="text-sm font-semibold text-gray-600"
                >
                    PIC
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
                    className="text-sm font-semibold"
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Kick Off Start
                </label>
                <input
                    type="date"
                    id="kickoffstart"
                    name="kickoffstart"
                    value={formData.kickoffstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="kickoffdeadline"
                    className="text-sm font-semibold text-gray-600"
                >
                    Kick Off Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="kickoff"
                    className="text-sm font-semibold text-gray-600"
                >
                    Kick Off Acctual Done
                </label>
                <input
                    type="date"
                    id="kickoff"
                    name="kickoff"
                    value={formData.kickoffdone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffdone: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="userrequirementstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    User Requierement Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    User Requierement Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="userrequirement"
                    className="text-sm font-semibold text-gray-600"
                >
                    User Requierement Acctual Done
                </label>
                <input
                    type="date"
                    id="userrequirement"
                    name="userrequirement"
                    value={formData.userrequirementdone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            userrequirementdone: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div> */}
            
            <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopmentstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    Application Development Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Application Development Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopment"
                    className="text-sm font-semibold text-gray-600"
                >
                    Application Development Acctual Done
                </label>
                <input
                    type="date"
                    id="applicationdevelopment"
                    name="applicationdevelopment"
                    value={formData.applicationdevelopmentdone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationdevelopmentdone: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="sitstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    SIT Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    SIT Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="sit"
                    className="text-sm font-semibold text-gray-600"
                >
                    SIT Acctual Done
                </label>
                <input
                    type="date"
                    id="sit"
                    name="sit"
                    value={formData.sitdone}
                    onChange={(e) =>
                        setFormData({ ...formData, sitdone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="uatstart"
                    className="text-sm font-semibold text-gray-600"
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
                    className="text-sm font-semibold text-gray-600"
                >
                    UAT Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="uat"
                    className="text-sm font-semibold text-gray-600"
                >
                    UAT Acctual Done
                </label>
                <input
                    type="date"
                    id="uat"
                    name="uat"
                    value={formData.uatdone}
                    onChange={(e) =>
                        setFormData({ ...formData, uatdone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="implementationpreparestart"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Prepare Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Prepare Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="implementationprepare"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Prepare Acctual Done
                </label>
                <input
                    type="date"
                    id="implementationprepare"
                    name="implementationprepare"
                    value={formData.implementationpreparedone}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationpreparedone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="implementationmeetingstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Meeting Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Meeting Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="implementationmeeting"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Meeting Acctual Done
                </label>
                <input
                    type="date"
                    id="implementationmeeting"
                    name="implementationmeeting"
                    value={formData.implementationmeetingdone}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeetingdone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="implementationstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="implementation"
                    className="text-sm font-semibold text-gray-600"
                >
                    Implementation Acctual Done
                </label>
                <input
                    type="date"
                    id="implementation"
                    name="implementation"
                    value={formData.implementationdone}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationdone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreviewstart"
                    className="text-sm font-semibold text-gray-600"
                >
                    Post Implementation Review Start
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Post Implementation Review Deadline
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
            {/* <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreview"
                    className="text-sm font-semibold text-gray-600"
                >
                    Post Implementation Review Acctual Done
                </label>
                <input
                    type="date"
                    id="postimplementationreview"
                    name="postimplementationreview"
                    value={formData.postimplementationreviewdone}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreviewdone: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div> */}
            {/* Status dropdown */}
            <div className="flex flex-col">
                <label
                    htmlFor="status"
                    className="text-sm font-semibold text-gray-600"
                >
                    Status
                </label>
                <div className="dropdown mt-1">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {formData.status}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
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
                    className="text-sm font-semibold text-gray-600"
                >
                    Deadline Project
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
    );
};

export default SDLCForm;

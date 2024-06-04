"use client";

import axios from "axios";
import React, { useState } from "react";

const SDLCForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        projectname: "",
        pic: "",
        deadline: "",
        status: "",
    });

    const [phaseData, setPhaseData] = useState({
        kickoff: "",
        userrequirement: "",
        applicationdevelopment: "",
        sit: "",
        uat: "",
        implementationprepare: "",
        implementationmeeting: "",
        implementation: "",
        postimplementationreview: "",
    });


    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8081/api/projectdev", formData);
            await axios.post("http://localhost:8081/api/projectphase", phaseData);
            alert("Create Project Success");
        } catch (error) {
            console.log(error);
            alert("Create Project Failed!");
        }
    };

    return (
        <form className="space-y-4">
            {/* Input fields for memo attributes */}
            <div className="flex flex-col">
                <label
                    htmlFor="namaproject"
                    className="text-sm font-semibold text-gray-600"
                >
                    Nama Project
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
                <input
                    type="text"
                    id="pic"
                    name="pic"
                    value={formData.pic}
                    onChange={(e) =>
                        setFormData({ ...formData, pic: e.target.value })
                    }
                    className="input input-bordered mt-1"
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
                    value={phaseData.kickoff}
                    onChange={(e) =>
                        setPhaseData({
                            ...phaseData,
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
                    value={phaseData.userrequirement}
                    onChange={(e) =>
                        setPhaseData({
                            ...phaseData,
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
                    value={phaseData.applicationdevelopment}
                    onChange={(e) =>
                        setPhaseData({
                            ...phaseData,
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
                    value={phaseData.sit}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, sit: e.target.value })
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
                    value={phaseData.uat}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, uat: e.target.value })
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
                    value={phaseData.implementationprepare}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, implementationprepare: e.target.value })
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
                    value={phaseData.implementationmeeting}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, implementationmeeting: e.target.value })
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
                    value={phaseData.implementation}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, implementation: e.target.value })
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
                    value={phaseData.postimplementationreview}
                    onChange={(e) =>
                        setPhaseData({ ...phaseData, postimplementationreview: e.target.value })
                    }
                    className="input input-bordered mt-1"
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
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
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

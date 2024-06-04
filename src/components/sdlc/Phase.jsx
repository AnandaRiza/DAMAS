"use client";

import axios from "axios";
import React, { useState } from "react";

const PhaseForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
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

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8081/api/projectphase", formData);
            alert("Create Phase Success");
        } catch (error) {
            console.log(error);
            alert("Create Phase Failed!");
        }
    };

    return (
        <form className="space-y-4">
            {/* Input fields for memo attributes */}
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
                    value={formData.kickoff}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
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
                    value={formData.userrequirement}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
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
                    Phase
                </label>
                <input
                    type="date"
                    id="applicationdevelopment"
                    name="applicationdevelopment"
                    value={formData.applicationdevelopment}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
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
                    value={formData.sit}
                    onChange={(e) =>
                        setFormData({ ...formData, sit: e.target.value })
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
                    value={formData.uat}
                    onChange={(e) =>
                        setFormData({ ...formData, uat: e.target.value })
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
                    value={formData.implementationprepare}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationprepare: e.target.value })
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
                    value={formData.implementationmeeting}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeeting: e.target.value })
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
                    value={formData.implementation}
                    onChange={(e) =>
                        setFormData({ ...formData, implementation: e.target.value })
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
                    value={formData.postimplementationreview}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreview: e.target.value })
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
            {/* Submit button
            <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={handleSubmit}
            >
                Create Project
            </button> */}
        </form>
    );
};

export default PhaseForm;

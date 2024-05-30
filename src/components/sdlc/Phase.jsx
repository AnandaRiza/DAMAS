"use client";

import axios from "axios";
import React, { useState } from "react";

const PhaseForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        nopmo: "",
        projectname: "",
        phase: "",
        pic: "",
        departement: "",
        team: "",
        deadline: "",
        status: "",
    });

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8081/api/projectphase", formData);
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
                    htmlFor="nopmo"
                    className="text-sm font-semibold text-gray-600"
                >
                    No PMO
                </label>
                <input
                    type="text"
                    id="nopmo"
                    name="nopmo"
                    value={formData.nopmo}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            nopmo: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
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
                    htmlFor="phase"
                    className="text-sm font-semibold text-gray-600"
                >
                    Phase
                </label>
                <input
                    type="text"
                    id="phase"
                    name="phase"
                    value={formData.phase}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phase: e.target.value,
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
                    htmlFor="department"
                    className="text-sm font-semibold text-gray-600"
                >
                    Departement
                </label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.departement}
                    onChange={(e) =>
                        setFormData({ ...formData, departement: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="team"
                    className="text-sm font-semibold text-gray-600"
                >
                    Team
                </label>
                <input
                    type="text"
                    id="team"
                    name="team"
                    value={formData.team}
                    onChange={(e) =>
                        setFormData({ ...formData, team: e.target.value })
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

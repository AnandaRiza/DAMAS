'use client';

import axios from "axios";
import React, { useState } from "react";

const NetworkForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    network_perihal: "",
    network_pic: "",
    network_deadline: "",
    network_status: "",
});

const handleSubmit = async () => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/operationnetwork`, formData);
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
                value={formData.network_perihal}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        network_perihal: e.target.value,
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
                value={formData.network_pic}
                onChange={(e) =>
                    setFormData({ ...formData, network_pic: e.target.value })
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
                value={formData.network_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_deadline: e.target.value })
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
                    {formData.network_status}
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
                                    network_status: "Ongoing",
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
                                    network_status: "Finished",
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
                                    network_status: "Past-Deadline",
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

export default NetworkForm;

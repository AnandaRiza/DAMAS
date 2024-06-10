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
        await axios.post("http://localhost:8081/api/operationnetwork", formData);
        alert("Create Project Success");
        

    } catch (error) {
        console.log(error);
        alert("Create Project Failed!");
    }
};

return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl">
        <div>
          <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
    <form className="space-y-4">
        {/* Input fields for memo attributes */}
        <div className="flex flex-col">
            <label
                htmlFor="namaproject"
                className="text-sm font-semibold text-[#0066AE]"
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
                className="text-sm font-semibold text-[#0066AE]"
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
                htmlFor="pic"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Departement
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
                htmlFor="pic"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Team
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
                className="text-sm font-semibold text-[#0066AE]"
            >
                Kick Off
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

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                MOP
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

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Demo MOP
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

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Implementasi
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

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                SK/SE
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

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                UAT
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
                className="text-sm font-semibold text-[#0066AE]"
            >
                Status
            </label>
            <div className="dropdown mt-1">
                <div tabIndex={0} role="button" className="btn m-1 w-52 bg-gray hover:bg-gray">
                    {formData.network_status}
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-300 rounded-box w-52 mb-4"
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
            className="btn btn-success mt-4 border border-gray"
            onClick={handleSubmit}
        >
            <div className=" text-black">
            Create Project
            </div>
        </button>
    </form>
    </div>
    </div>
    </div>
);
};

export default NetworkForm;

'use client';

import axios from "axios";
import React, { useState, useEffect } from "react";

const NetworkForm = () => {
  // State to manage form data
  const [dataAllPic, setDataAllPic] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
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
                {dataAllPic && (
                    <select
                        name="pic"
                        id="pic"
                        className="input input-bordered mt-1"
                        value={formData.nama}
                        onChange={(e) => {
                            const selectedPic = JSON.parse(e.target.value);
                            setFormData({ ...formData, network_pic: selectedPic.nama, departement:selectedPic.departemen });
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
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Kick Off Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_kickoff_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_kickoff_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Kick Off Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_kickoff_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_kickoff_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Kick Off Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_kickoff_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_kickoff_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                MOP Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_mop_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_mop_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                MOP Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_mop_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_mop_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                MOP Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_mop_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_mop_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Demo MOP Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_demomop_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_demomop_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Demo MOP Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_demomop_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_demomop_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Demo MOP Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_demomop_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_demomop_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Implementasi Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_implementasi_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_implementasi_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Implementasi Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_implementasi_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_implementasi_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Implementasi Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_implementasi_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_implementasi_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                SK/SE Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_skse_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_skse_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                SK/SE Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_skse_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_skse_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                SK/SE Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_skse_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_skse_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                UAT Start
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_uat_start}
                onChange={(e) =>
                    setFormData({ ...formData, network_uat_start: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                UAT Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_uat_deadline}
                onChange={(e) =>
                    setFormData({ ...formData, network_uat_deadline: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                UAT Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_uat_done}
                onChange={(e) =>
                    setFormData({ ...formData, network_uat_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div>

        <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Project Deadline
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.network_deadline_project}
                onChange={(e) =>
                    setFormData({ ...formData, network_deadline_project: e.target.value })
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

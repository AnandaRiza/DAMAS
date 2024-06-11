"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const SKSEForm = () => {
    // State to manage form data
    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [formData, setFormData] = useState({
        nosurat: "",
        perihal: "",
        pic: "",
        departement: "",
        deadline: "",
        status: "",
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
            await axios.post(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/newskse`, formData);
            alert("Create SK/SE Success");
        } catch (error) {
            console.log(error);
            alert("Create SK/SE Failed!");
        }
    };

    return (
        <form className="space-y-4">
            {/* Input fields for memo attributes */}
            <div className="flex flex-col">
                <label
                    htmlFor="nosurat"
                    className="text-sm font-semibold text-gray-600"
                >
                    No Surat
                </label>
                <input
                    type="text"
                    id="nosurat"
                    name="nosurat"
                    value={formData.nosurat}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            nosurat: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="perihal"
                    className="text-sm font-semibold text-gray-600"
                >
                    Perihal
                </label>
                <input
                    type="text"
                    id="perihal"
                    name="perihal"
                    value={formData.perihal}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            perihal: e.target.value,
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
                Create SK/SE
            </button>
        </form>
    );
};

export default SKSEForm;

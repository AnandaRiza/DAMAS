"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";

const SKSEForm = () => {
    // State to manage form data
    const router = useRouter();
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
    console.log(formData);

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
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/newskse`,
                formData
            );
            router.push("/main/ppo/allskse");
        } catch (error) {
            console.log(error);
            alert("Create SK/SE Failed!");
        }
    };

    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Input fields for memo attributes */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="nosurat"
                            className="text-sm font-semibold text-gray-600"
                        >
                            No Surat <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="nosurat"
                            name="nosurat"
                            required
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
                            Perihal <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="perihal"
                            name="perihal"
                            required
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
                            PIC <span className="text-red-500">*</span>
                        </label>
                        {dataAllPic && (
                            <select
                                name="pic"
                                required
                                id="pic"
                                className="input input-bordered mt-1"
                                value={formData.nama}
                                onChange={(e) => {
                                    const selectedPic = JSON.parse(
                                        e.target.value
                                    );
                                    setFormData({
                                        ...formData,
                                        pic: selectedPic.nama,
                                        departement: selectedPic.departemen,
                                    });
                                    setSelectedDept(selectedPic.departemen);
                                }}
                            >
                                <option
                                    disabled
                                    selected
                                    className="text-sm text-gray-600 opacity-50"
                                >
                                    Select PIC...
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
                            className="text-sm font-semibold"
                        >
                            Departement
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
                            htmlFor="deadline"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            required
                            value={formData.deadline}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deadline: e.target.value,
                                })
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
                            Status <span className="text-red-500">*</span>
                        </label>
                        <div className="dropdown mt-1">
                            {/* <div
                                tabIndex={0}
                                role="button"
                                className="btn m-1 w-52 bg-white hover:bg-gray text-gray-600"
                            >
                                {formData.status
                                    ? formData.status
                                    : "Select Status"}
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
                            </ul> */}
                            <select
                                name="status"
                                id="status"
                                required
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option disabled value="">
                                    --Select Status--
                                </option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Finished">Finished</option>
                                <option value="Past-Deadline">
                                    Past Deadline
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary mt-4">
                        Create SK/SE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SKSEForm;

"use client";

import { useStateContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SKSEForm = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const { user } = useStateContext();

    // State to manage form data
    const router = useRouter();
    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedUserDomain, setSelectedUserDomain] = useState("");
    const [scheduleInput, setScheduleInput] = useState("");
    const [formData, setFormData] = useState({
        nosurat: "",
        perihal: "",
        pic: "",
        departement: "",
        deadlineskse: "",
        status: "",
        userdomain: "",
        userdomainpic: "",
        createdby: "",
    });

    const [dataEmail, setdataEmail] = useState({
        to: "",
        subject: "Test",
        deadline: "",
        deadlinepro: "",
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
        const userid = document.cookie
            .split("; ")
            .find((row) => row.startsWith("DAMAS-USERID="))
            ?.split("=")[1];
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/newskse`,
                {
                    ...formData,
                    createdby: userid,
                    userdomain: user.userdomain,
                    deadlineskse: calculateDeadline(scheduleInput),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "USER-ID": userid,
                    },
                }
            );
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/schedulesend-email`,
                {
                    ...dataEmail,
                    text: "halo",
                    to: "mayastri_devana@bcasyariah.co.id",
                    deadline: calculateDeadline(scheduleInput),
                    deadlinepro: calculateDeadline(scheduleInput),
                }
            );
            router.push("/main/ppo/allskse");
        } catch (error) {
            console.log(error);
            alert("Create SK/SE Failed!");
        }
    };

    const calculateDeadline = (date) => {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
    
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
    
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
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
                                        userdomainpic: selectedPic.userdomain,
                                    });
                                    setSelectedDept(selectedPic.departemen);
                                    setSelectedUserDomain(
                                        selectedPic.userdomain
                                    );
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
                            htmlFor="deadlineskse"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Deadline SK/SE <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="deadlineskse"
                            name="deadlineskse"
                            required
                            value={scheduleInput}
                            min={getMinDateTime()}
                            onChange={(e) =>
                                setScheduleInput(e.target.value)
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

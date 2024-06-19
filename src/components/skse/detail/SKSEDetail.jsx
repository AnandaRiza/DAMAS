"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SKSEDetail = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const params = useParams();
    const [selectedDept, setSelectedDept] = useState("");
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllSkse, setDataAllSkse] = useState({
        submitter: "",
        authorizer: "",
        submitAt: "",
        deadlineApprovement: "",
        statusApprovement: "",
        nosurat: "",
        perihal: "",
        pic: "",
        departement: "",
        deadline: "",
        status: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allskse/getskse?input=${params.id}`
                );
                setDataAllSkse(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getDataAllPic();
        getCurrentData();
        // console.log(dataAllSkse);
    }, [params.id]);

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
        if (dataAllSkse) {
            setSelectedDept(dataAllSkse.departement);
        }
    }, [dataAllSkse]);

    return (
        <div  className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
            {dataAllSkse ? (
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="nosurat"
                            className="text-sm font-semibold text-gray-600"
                        >
                            No Surat
                        </label>
                        <input
                        disabled
                            type="text"
                            value={dataAllSkse.nosurat}
                            onChange={(e) =>
                                setDataAllSkse({
                                    ...dataAllSkse,
                                    nosurat: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
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
                        disabled
                            type="text"
                            value={dataAllSkse.perihal}
                            onChange={(e) =>
                                setDataAllSkse({
                                    ...dataAllSkse,
                                    perihal: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
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
                            disabled
                                type="text"
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                value={dataAllSkse.name}
                                onChange={(e) => {
                                    const selectedPic = JSON.parse(
                                        e.target.value
                                    );
                                    setDataAllSkse({
                                        ...dataAllSkse,
                                        pic: selectedPic.nama,
                                        departement: selectedPic.departemen,
                                    });
                                    setSelectedDept(selectedPic.departemen);
                                }}
                            >
                                <option
                                    // disabled
                                    // selected
                                    className="text-sm text-gray-600 opacity-50"
                                    value={dataAllSkse.pic}
                                >
                                    {dataAllSkse.pic}
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
                            Departemen
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
                            Deadline
                        </label>
                        <input
                        disabled
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={dataAllSkse.deadline}
                            onChange={(e) =>
                                setDataAllSkse({
                                    ...dataAllSkse,
                                    deadline: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1 disabled:text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="status"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Status
                        </label>
                        <div className="dropdown mt-1">
                            <div className="btn m-1 disabled:text-black">
                                {dataAllSkse.status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li className="  disabled:text-black">
                                    <a
                                        onClick={(e) =>
                                            setDataAllSkse({
                                                ...dataAllSkse,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllSkse({
                                                ...dataAllSkse,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Finished">
                                            Finished
                                        </option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllSkse({
                                                ...dataAllSkse,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Past Deadline">
                                            Past Deadline
                                        </option>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </form>
            ) : (
                <PleaseWait />
            )}
        </div>
        </div>
    );
};

export default SKSEDetail;

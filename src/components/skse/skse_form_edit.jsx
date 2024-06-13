"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
    const params = useParams();
    const [selectedDept, setSelectedDept] = useState("");
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllSkse, setDataAllSkse] = useState({
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
        console.log(dataAllSkse);
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
            );
            setDataAllPic(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditedData = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allskse/editedskse?input=${params.id}`,
                dataAllSkse
            );
            // console.log(response.data);
            alert("Edit Success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-4">
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
                            type="text"
                            value={dataAllSkse.nosurat}
                            onChange={(e) =>
                                setDataAllSkse({
                                    ...dataAllSkse,
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
                            value={dataAllSkse.perihal}
                            onChange={(e) =>
                                setDataAllSkse({
                                    ...dataAllSkse,
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
                                type="text"
                                className="input input-bordered mt-1"
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
                            className="input input-bordered mt-1"
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
                            <div tabIndex={0} role="button" className="btn m-1">
                                {dataAllSkse.status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li>
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
                    <div className="flex gap-2 items-center text-white ml-3 mt-3">
                        <Link href="/main/development">
                            <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                                <MdOutlineCancel />
                                <span>Cancel</span>
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center"
                            onClick={handleEditedData}
                        >
                            <FiSave />
                            <span>Edit</span>
                        </button>
                    </div>
                </form>
            ) : (
                <PleaseWait />
            )}
        </div>
    );
};

export default Page;

"use client"
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const page = () => {
    const params = useParams();
    const [dataAllNetwork, setDataAllNetwork] = useState({
        network_perihal: "",
        network_pic: "",
        network_deadline: "",
        network_status: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow/getnetwork?input=${params.network_id}`
                );
                setDataAllNetwork(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentData();
    }, [params.network_id]);

    const handleEditedData = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow/editednetwork?input=${params.network_id}`,
                dataAllNetwork
            );
            console.log(response.data);
            alert("Edit Success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
<div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl ">
    <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <div className="space-y">
            {dataAllNetwork ? (
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="perihal"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Network Name
                        </label>
                        <input
                            type="text"
                            value={dataAllNetwork.network_perihal}
                            onChange={(e) =>
                                setDataAllNetwork({
                                    ...dataAllNetwork,
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
                            className="input input-bordered mt-1"
                            value={dataAllNetwork.network_pic}
                            onChange={(e) =>
                                setDataAllNetwork({
                                    ...dataAllNetwork,
                                    network_pic: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllNetwork.network_deadline}
                            onChange={(e) =>
                                setDataAllNetwork({
                                    ...dataAllNetwork,
                                    network_deadline: e.target.value,
                                })
                            }
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
                                {dataAllNetwork.network_status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li>
                                    <a
                                        onClick={(e) =>
                                            setDataAllNetwork({
                                                ...dataAllNetwork,
                                                network_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllNetwork({
                                                ...dataAllNetwork,
                                                network_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Finished">
                                            Finished
                                        </option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllNetwork({
                                                ...dataAllNetwork,
                                                network_status: e.target.value,
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
                        <Link href="/main/operation/allprogress">
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
        </div>
        </div>
    );
};

export default page;

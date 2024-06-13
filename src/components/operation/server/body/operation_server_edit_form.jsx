'use client';

import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
    const params = useParams();
    const [selectedDept, setSelectedDept] = useState("");
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllServer, setDataAllServer] = useState({
        network_perihal: "",
        network_pic: "",
        departement: "",
        network_deadline: "",
        network_status: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/getserver?input=${params.server_id}`
                );
                setDataAllServer(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };getDataAllPic();
        console.log(dataAllServer);
        getCurrentData();
    }, [params.server_id]);

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
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/editedserver?input=${params.server_id}`,
                dataAllServer
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
            {dataAllServer ? (
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="perihal"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Nama Project
                        </label>
                        <input
                            type="text"
                            value={dataAllServer.server_perihal}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_perihal: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>
                    
                    {/* <div className="flex flex-col">
                        <label
                            htmlFor="pic"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            PIC
                        </label>
                        <input
                            type="text"
                            className="input input-bordered mt-1"
                            value={dataAllServer.network_pic}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    network_pic: e.target.value,
                                })
                            }
                        />
                    </div> */}

                        <div className="flex flex-col">
                        <label
                            htmlFor="pic"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            PIC
                        </label>
                        {dataAllPic && (
                            <select
                                type="text"
                                className="input input-bordered mt-1"
                                value={dataAllServer.name}
                                onChange={(e) => {
                                    const selectedPic = JSON.parse(
                                        e.target.value
                                    );
                                    dataAllServer({
                                        ...dataAllProject,
                                        server_pic: selectedPic.nama,
                                        departement: selectedPic.departemen,
                                    });
                                    setSelectedDept(selectedPic.departemen);
                                }}
                            >
                                <option
                                    // disabled
                                    // selected
                                    className="text-sm text-gray-600 opacity-50"
                                    value={dataAllServer.server_pic}
                                >
                                    {dataAllServer.server_pic}
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
                            className="text-sm font-semibold text-[#0066AE]"
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
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Kick Off Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_kickoff_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_kickoff_start: e.target.value,
                                })
                            }
                            disabled
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
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_kickoff_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_kickoff_deadline: e.target.value,
                                })
                            }
                            disabled
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
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_kickoff_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_kickoff_done: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Penyiapan Server Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_peyiapanserver_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_peyiapanserver_start: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Penyiapan Server Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_peyiapanserver_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_peyiapanserver_deadline: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Penyiapan Server Done
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_peyiapanserver_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_peyiapanserver_done: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Instalasi Aplikasi Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_instalasiaplikasi_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalasiaplikasi_start: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Instalasi Aplikasi Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_instalasiaplikasi_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalasiaplikasi_deadline: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Instalasi Aplikasi Done
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_instalasiaplikasi_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalasiaplikasi_done: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Install Checkpoint Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_instalcheckpoint_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalcheckpoint_start: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Install Checkpoint Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_instalcheckpoint_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalcheckpoint_deadline: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Install Checkpoint Done
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_instalcheckpoint_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_instalcheckpoint_done: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Testing Koneksi Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_testingkoneksi_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_testingkoneksi_start: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Testing Koneksi Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_testingkoneksi_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_testingkoneksi_deadline: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Testing Koneksi Done
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_testingkoneksi_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_testingkoneksi_done: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Serah Terima Server Start
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_serahterimaserver_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_serahterimaserver_start: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Serah Terima Server Deadline
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1 font-semibold"
                            value={dataAllServer.server_serahterimaserver_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_serahterimaserver_deadline: e.target.value,
                                })
                            }
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Serah Terima Server Done
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_serahterimaserver_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_serahterimaserver_done: e.target.value,
                                })
                            }
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
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_implementasi_start}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_implementasi_start: e.target.value,
                                })
                            }
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
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_implementasi_deadline}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_implementasi_deadline: e.target.value,
                                })
                            }
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
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_implementasi_done}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_implementasi_done: e.target.value,
                                })
                            }
                        />
                    </div>


                    <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Deadline Project
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllServer.server_deadline_project}
                            onChange={(e) =>
                                setDataAllServer({
                                    ...dataAllServer,
                                    server_deadline_project: e.target.value,
                                })
                            }
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label
                            htmlFor="status"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Status
                        </label>
                        <div className="dropdown mt-1">
                            <div tabIndex={0} role="button" className="btn m-1">
                                {dataAllServer.server_status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li>
                                    <a
                                        onClick={(e) =>
                                            setDataAllServer({
                                                ...dataAllServer,
                                                server_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllServer({
                                                ...dataAllServer,
                                                server_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Finished">
                                            Finished
                                        </option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllServer({
                                                ...dataAllServer,
                                                server_status: e.target.value,
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
                        <Link href="/main/operation/server/allprogress">
                            <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                                <MdOutlineCancel />
                                <span>Cancel</span>
                            </button>
                        </Link>
                        <button
                        type="button"
                            className="py-2 px-4 rounded-xl bg-green-500 flex gap-1 items-center"
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

export default Page;

"use client";
import PleaseWait from "@/components/PleaseWait";
import { useStateContext } from "@/context/ContextProvider";
import { convertToDate } from "@/utils/dateFormater";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const { user } = useStateContext();

    const params = useParams();
    const router = useRouter();
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDeptKadep, setSelectedDeptKadep] = useState("");
    const [selectedUserKadep, setSelectedUserKadep] = useState("");
    const [scheduleInput, setScheduleInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllKadep, setDataAllKadep] = useState(null);
    const [filteredDataAllPic, setFilteredDataAllPic] = useState(null);
    // const [isRejecting, setIsRejecting] = useState(false);
    // const [isApproving, setIsApproving] = useState(false);
    const [loadingAction, setLoadingAction] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        memoNum: "",
        memoPerihal: "",
        memoPic: "",
        memoDepartment: "",
        memoCreatedBy: "",
        memoReviewer: null,
        memoDeadline: "",
        memoStatus: "",
        memoNotes: "",
        memoUpload: null,
        userdomain: "",
        userdomainpic: "",
        userdomainreviewer: "apa",
        memoCategory: "",
        memoSuratType: "",
        memoMasuk: "",
        memoDocType: "",
        memoKeluar: "",
        memoTerima: "",
        idmemo: "",
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/disposition/memo?input=${params.id}`
                );
                setFormData(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getDataAllPic();
        getCurrentData();
        // console.log(dataAllProject);
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/organization/spv-stl-example`
            );
            setDataAllPic(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDataAllKadep = async () => {
        setDataAllKadep(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/organization/spv-kadep-example`
            );
            setDataAllKadep(response.data.data);
            setFilteredDataAllPic(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (formData) {
            setSelectedDept(formData.memoDepartment);
        }
    }, [formData]);

    useEffect(() => {
        getDataAllKadep();
        const userid = document.cookie
            .split("; ")
            .find((row) => row.startsWith("DAMAS-USERID="))
            ?.split("=")[1];
    }, []);

    const handleEditedData = async (newStatus, action) => {
        setLoadingAction(action);

        if (newStatus === "PROCESS") {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;

            setFormData({
                ...formData,
                memoKeluar: formattedDate,
            });
        }

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/disposition/disposisimemo`,
                {
                    ...formData,
                    memoStatus: newStatus,
                    idmemo: formData.id,
                    userdomain: formData.userdomain,
                    userdomainpic: selectedUserKadep,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "USER-ID": userid,
                    },
                }
            );
            router.push("/main/memo/disposisimemo");
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAction(null);
        }
    };

    // const convertDateToCron = (date) => {
    //     const d = new Date(date);
    //     const seconds = "0";
    //     const minutes = d.getMinutes();
    //     const hours = d.getHours();
    //     const dayOfMonth = d.getDate();
    //     const month = d.getMonth() + 1;
    //     const dayOfWeek = "?";
    //     return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
    // };

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

    const submitAtDate = () => {
        const d = new Date();
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");

        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };

    // const getMinDateTime = () => {
    //     const now = new Date();
    //     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    //     return now.toISOString().slice(0, 16);
    // };

    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
                {formData ? (
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_num"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Nomor Memo
                            </label>
                            <input
                                type="text"
                                value={formData.memoNum}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoNum: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_perihal"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Perihal Memo
                            </label>
                            <input
                                type="text"
                                value={formData.memoPerihal}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoPerihal: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                disabled
                            />
                        </div>

                        {/* <div className="" hidden>
                            <label
                                htmlFor="pic"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                PIC
                            </label>
                            {dataAllPic && (
                                <select
                                    type="text"
                                    className="input input-bordered"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const selectedPic = JSON.parse(
                                            e.target.value
                                        );
                                        setFormData({
                                            ...formData,
                                            memoPic: selectedPic.nama,
                                            memoDepartment:
                                                selectedPic.departemen,
                                            userdomainpic:
                                                selectedPic.userdomain,
                                        });
                                        setSelectedDept(selectedPic.departemen);
                                        setSelectedUserDomain(
                                            selectedPic.userdomain
                                        );
                                    }}
                                >
                                    <option
                                        className="text-sm text-gray-600 opacity-50"
                                        value={formData.memoPic}
                                    >
                                        {formData.memoPic}
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

                        <div className="" hidden>
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
                        </div> */}

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_pic_kadep"
                                className="text-sm font-semibold"
                            >
                                PIC <span className="text-red-500">*</span>
                            </label>
                            {dataAllKadep && (
                                <select
                                    name="memo_pic_kadep"
                                    id="memo_pic_kadep"
                                    className="input input-bordered mt-1"
                                    value={JSON.stringify(
                                        dataAllKadep.find(
                                            (item) =>
                                                item.name === formData.memoPic
                                        )
                                    )}
                                    onChange={(e) => {
                                        const selectedPicKadep = JSON.parse(
                                            e.target.value
                                        );
                                        setFormData({
                                            ...formData,
                                            memoPic: selectedPicKadep.employee,
                                            memoDepartment:
                                                selectedPicKadep.name,
                                                userdomainpic:
                                                selectedPicKadep.userDomainpics, 
                                        });
                                        setSelectedDeptKadep(
                                            selectedPicKadep.name
                                        );
                                        setSelectedUserKadep(selectedPicKadep.userDomainpics);
                                    }}
                                >
                                    <option
                                        disabled
                                        selected
                                        className="text-sm text-gray-600 opacity-50"
                                    >
                                        Select PIC...
                                    </option>
                                    {filteredDataAllPic.map((item, index) => (
                                        <option
                                            key={index}
                                            value={JSON.stringify(item)}
                                        >
                                            {item.employee}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_department"
                                className="text-sm font-semibold"
                            >
                                Department
                            </label>
                            <input
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                type="text"
                                value={selectedDeptKadep}
                                disabled
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_department"
                                className="text-sm font-semibold"
                            >
                                userdomainpickadep
                            </label>
                            <input
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                type="text"
                                value={selectedUserKadep}
                                disabled
                            />
                        </div>
                        <div className="" hidden>
                            <label
                                htmlFor="memo_createdBy"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Created By
                            </label>
                            <input
                                type="text"
                                value={formData.memoCreatedBy}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoCreatedBy: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_createdBy"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Kategori Memo
                            </label>
                            <input
                                type="text"
                                value={formData.memoCategory}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoCategory: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_surat_type"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tipe Surat
                            </label>
                            <input
                                type="text"
                                value={formData.memoSuratType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoSuratType: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_doc_type"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tipe Dokumen
                            </label>
                            <input
                                type="text"
                                value={formData.memoDocType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoDocType: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_masuk"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tanggal Masuk Memo
                            </label>
                            <input
                                disabled
                                type="date"
                                id="memo_masuk"
                                name="memo_masuk"
                                value={convertToDate(formData.memoMasuk)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoMasuk: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="" hidden>
                            <label
                                htmlFor="memo_keluar"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tanggal Keluar Memo
                            </label>
                            <input
                                disabled
                                type="date"
                                id="memo_keluar"
                                name="memo_keluar"
                                value={convertToDate(formData.memoKeluar)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoKeluar: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_terima"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tanggal Terima Memo
                            </label>
                            <input
                                disabled
                                type="date"
                                id="memo_terima"
                                name="memo_terima"
                                value={convertToDate(formData.memoTerima)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoTerima: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_notes"
                                hidden
                                className="text-sm font-semibold text-gray-600"
                            >
                                Notes
                            </label>
                            <textarea
                                id="memo_notes"
                                name="memo_notes"
                                value={formData.memoNotes}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoNotes: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                                rows={3}
                                hidden
                            />
                        </div>
                        <div className="" hidden>
                            <label
                                htmlFor="memo_status"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Status <span className="text-red-500">*</span>
                            </label>
                            <div className="dropdown mt-1 ">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn m-1"
                                >
                                    {formData.memoStatus
                                        ? formData.memoStatus
                                        : "Select Status"}
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
                                                    memoStatus:
                                                        "WAITING FOR APPROVAL",
                                                })
                                            }
                                        >
                                            WAITING FOR APPROVAL
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    memoStatus: "DRAFT",
                                                })
                                            }
                                        >
                                            DRAFT
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="deadlinememo"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Deadline Memo
                            </label>
                            <input
                                disabled
                                // type="date"
                                id="deadlinememo"
                                name="deadlinememo"
                                value={formData.memoDeadline}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoDeadline: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_notes"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Notes
                            </label>
                            <textarea
                                id="memo_notes"
                                name="memo_notes"
                                value={formData.memoReviewer}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoReviewer: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                                rows={3}
                            />
                        </div>

                        <div className="flex gap-2 items-center text-white ml-3 mt-3">
                            <button
                                type="button"
                                className="py-2 px-4 rounded-xl bg-red-500 flex gap-1 items-center"
                                onClick={() =>
                                    handleEditedData("REJECTED", "REJECTED")
                                }
                                disabled={
                                    loadingAction &&
                                    loadingAction !== "REJECTED"
                                }
                            >
                                <MdOutlineCancel />
                                {loadingAction === "REJECTED" ? (
                                    <div className="flex justify-center gap-3">
                                        <p>Please wait</p>
                                        <span className="loading loading-spinner"></span>
                                    </div>
                                ) : (
                                    <span>REJECTED</span>
                                )}
                            </button>
                            <button
                                type="button"
                                className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center"
                                onClick={
                                    () =>
                                        handleEditedData("PROCESS", "APPROVED") // Change the status to "PROCESS"
                                }
                                disabled={
                                    loadingAction &&
                                    loadingAction !== "APPROVED"
                                } // Disable if another action is loading
                            >
                                <FiSave />
                                {loadingAction === "APPROVED" ? (
                                    <div className="flex justify-center gap-3">
                                        <p>Please wait</p>
                                        <span className="loading loading-spinner"></span>
                                    </div>
                                ) : (
                                    <span>APPROVED</span>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <PleaseWait />
                )}
            </div>
        </div>
    );
};

export default Page;

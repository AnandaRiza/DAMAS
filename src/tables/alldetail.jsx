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

const AllDetail = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const { user } = useStateContext();

    const params = useParams();
    const router = useRouter();
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDeptKadep, setSelectedDeptKadep] = useState("");
    const [selectedUserDomain, setSelectedUserDomain] = useState("");
    const [scheduleInput, setScheduleInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataAllPic, setDataAllPic] = useState(null);
    const [dataAllKadep, setDataAllKadep] = useState(null);
    const [filteredDataAllPic, setFilteredDataAllPic] = useState(null);
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
        userdomainpic: "apabang",
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
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/findregister/memo?input=${params.id}`
                );
                setFormData(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getDataAllPic();
        getCurrentData();
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/organization/spv-stl-example`
            );
            setDataAllPic(response.data.data);

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

    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
                {formData ? (
                    <form className="space-y-4">
                        <div className="flex flex-col" >
                            <label
                                htmlFor="memo_num"
                                className="text-sm font-semibold text-[#0066AE] "
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
                        <div className="flex flex-col" >
                            <label
                                htmlFor="departemen"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                PIC
                            </label>
                            <input
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                type="text"
                                value={formData.memoPic}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col" >
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
                                className="text-sm font-semibold text-gray-600 "
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
                                className="input input-bordered mt-1 "
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
                            <div className="dropdown mt-1">
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
                    </form>
                ) : (
                    <PleaseWait />
                )}
            </div>
        </div>
    );
};

export default AllDetail;

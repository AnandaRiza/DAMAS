"use client";
import PleaseWait from "@/components/PleaseWait";
import { useStateContext } from "@/context/ContextProvider";
import { convertToDate, convertToDateFormat } from "@/utils/dateFormater";
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
    const [selectedUserDomain, setSelectedUserDomain] = useState("");
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
        tanggalDokumen: ""
    });
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/draftmemo/memo?input=${params.id}`
                );
                setFormData(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getDataAllPic();
        getCurrentData();
        console.log(formData);
    }, [params.id]);

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/organization/spv-stl-example`
            );
            setDataAllPic(response.data.data);
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
        getDataAllPic();
        const userid = document.cookie
            .split("; ")
            .find((row) => row.startsWith("DAMAS-USERID="))
            ?.split("=")[1];
    }, []);

    const handleEditedData = async (newStatus, action) => {
        setLoadingAction(action);

        try {
            // Include the 'input' parameter in the URL as a query parameter
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/draftmemo/editedmemo`, // Pass 'input' as a query parameter
                {
                    ...formData,
                    userdomain: formData.userdomain,
                    userdomainpic: dataAllPic.userdomainpic,
                    memoCreatedBy: formData.memoCreatedBy,
                    memoDeadline: convertToDateFormat(formData.memoDeadline),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "USER-ID": userid,
                    },
                }
            );

            // Navigate to another page after successful request
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
                                className="input input-bordered mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="tanggaldokumen"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tanggal Document
                            </label>
                            <input
                                type="date"
                                id="tanggaldokumen"
                                name="tanggaldokumen"
                                value={convertToDate(formData.tanggalDokumen)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tanggalDokumen: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
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
                                className="input input-bordered mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_pic"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                PIC <span className="text-red-500">*</span>
                            </label>
                            {dataAllPic && (
                                <select
                                    name="memo_pic"
                                    id="memo_pic"
                                    className="input input-bordered mt-1"
                                    value={JSON.stringify(
                                        dataAllPic.find(
                                            (item) =>
                                                item.name === formData.memoPic
                                        )
                                    )}
                                    onChange={(e) => {
                                        const selectedPic = JSON.parse(
                                            e.target.value
                                        );
                                        setFormData({
                                            ...formData,
                                            memoPic: selectedPic.employee,
                                            memoDepartment: selectedPic.name,
                                        });
                                        setSelectedDept(selectedPic.name);
                                    }}
                                >
                                    <option
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
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Department
                            </label>
                            <input
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                type="text"
                                value={selectedDept}
                                disabled
                            />
                        </div>

                        {/* <div className="flex flex-col">
                            <label
                                htmlFor="memo_pic_kadep"
                                className="text-sm font-semibold"
                            >
                                PIC Dis <span className="text-red-500">*</span>
                            </label>
                            {dataAllPic && (
                                <select
                                    name="memo_pic_kadep"
                                    id="memo_pic_kadep"
                                    className="input input-bordered mt-1"
                                    value={JSON.stringify(
                                        dataAllPic.find(
                                            (item) =>
                                                item.name === formData.memoPic
                                        )
                                    )}
                                    onChange={(e) => {
                                        const selectedPic = JSON.parse(
                                            e.target.value
                                        );
                                        setFormData({
                                            ...formData,
                                            memoPic: selectedPic.employee,
                                            memoDepartment:
                                            selectedPic.name,
                                        });
                                        setSelectedDept(
                                            selectedPic.name
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
                        </div> */}

                        {/* <div className="flex flex-col">
                            <label
                                htmlFor="memo_department"
                                className="text-sm font-semibold"
                            >
                                Department Dis
                            </label>
                            <input
                                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                                type="text"
                                value={selectedDept}
                                disabled
                            />
                        </div> */}
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
                                htmlFor="memo_category"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Kategori Dokumen{" "}
                            </label>
                            <select
                                type="text"
                                id="memo_category"
                                name="memo_category"
                                value={formData.memoCategory}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoCategory: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                            >
                                <option value="" disabled>
                                    Pilih Kategori Dokumen ...
                                </option>
                                <option value="Memo Masuk">Masuk</option>
                                <option value="Memo Keluar">Keluar</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_surat_type"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tipe Surat
                            </label>
                            <select
                                id="memo_surat_type"
                                name="memo_surat_type"
                                value={formData.memoSuratType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoSuratType: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                            >
                                <option value="" disabled>
                                    Pilih Tipe Surat ...
                                </option>
                                <option value="-">-</option>
                                <option value="MO">MO</option>
                                <option value="SE">SE</option>
                                <option value="SK">SK</option>
                                <option value="AGR">AGR</option>
                                <option value="NDA">NDA</option>
                                <option value="PKS">PKS</option>
                                <option value="SPJ">SPJ</option>
                                <option value="SKU">SKU</option>
                                <option value="BAST">BAST</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_doc_type"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tipe Dokumen
                            </label>
                            <select
                                id="memo_doc_type"
                                name="memo_doc_type"
                                value={formData.memoDocType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoDocType: e.target.value,
                                    })
                                }
                                className="input input-bordered mt-1"
                            >
                                <option value="" disabled>
                                    Pilih Tipe Dokumen ...
                                </option>
                                <option value="-">-</option>
                                <option value="PKS">PKS</option>
                                <option value="BAST">BAST</option>
                                <option value="MEMO">MEMO</option>
                                <option value="INVOICE">INVOICE</option>
                                <option value="NDA">NDA</option>
                                <option value="PROGRAM KERJA">
                                    PROGRAM KERJA
                                </option>
                                <option value="BON">BON</option>
                                <option value="DOKUMEN">DOKUMEN</option>
                                <option value="PAYMENT">PAYMENT</option>
                                <option value="FORM">FORM</option>
                                <option value="TANDA TERIMA">
                                    TANDA TERIMA
                                </option>
                                <option value="SURAT">SURAT</option>
                                <option value="LAPORAN">LAPORAN</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="memo_masuk"
                                className="text-sm font-semibold text-[#0066AE]"
                            >
                                Tanggal Masuk Memo
                            </label>
                            <input
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
                                className="input input-bordered mt-1"
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
                                className="input input-bordered mt-1"
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
                                className="input input-bordered mt-1"
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
                        <div className="flex flex-col">
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
                                type="datetime-local"
                                id="deadlinememo"
                                name="deadlinememo"
                                value={formData.memoDeadline} 
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        memoDeadline: e.target.value, 
                                    })
                                }
                                className="input input-bordered mt-1"
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

                        <button
                            type="button"
                            onClick={handleEditedData}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Register Draft
                        </button>
                    </form>
                ) : (
                    <PleaseWait />
                )}
            </div>
        </div>
    );
};

export default Page;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/ContextProvider";
import Swal from "sweetalert2";
import { convertToDateFormat } from "@/utils/dateFormater";

const RegisterForm = () => {
    const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];

    const { user } = useStateContext();

    const [dataAllPic, setDataAllPic] = useState(null);
    const [filteredDataAllPic, setFilteredDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [scheduleInput, setScheduleInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
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
        tanggalDokumen: ""
    });

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
        getDataAllPic();
        const userid = document.cookie
            .split("; ")
            .find((row) => row.startsWith("DAMAS-USERID="))
            ?.split("=")[1];
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/register`,
                {
                    ...formData,
                    memoCreatedBy: userid,
                    userdomain: user.userdomain,
                    memoDeadline: convertToDateFormat(scheduleInput),
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
            console.log(error);
            alert("Create Project Failed!");
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

    const Deadlinereal = (date) => {
        const d = new Date(date);

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
                    className="space-y-4 "
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="memo_num"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Nomor Dokumen
                        </label>
                        <input
                            type="text"
                            id="memo_num"
                            name="memo_num"
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
                            htmlFor="memo_masuk"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tanggal Dokumen
                        </label>
                        <input
                            type="date"
                            id="memo_masuk"
                            name="memo_masuk"
                            value={formData.tanggalDokumen}
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
                            className="text-sm font-semibold text-gray-600"
                        >
                            Perihal Dokumen
                        </label>
                        <input
                            type="text"
                            id="memo_perihal"
                            name="memo_perihal"
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
                            className="text-sm font-semibold"
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
                                        (item) => item.name === formData.memoPic
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
                            value={selectedDept}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="memo_createdBy"
                            className="text-sm font-semibold text-gray-600"
                            hidden
                        >
                            Created By
                        </label>
                        <input
                            type="text"
                            id="memo_createdBy"
                            name="memo_createdBy"
                            value={formData.memoCreatedBy}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    memoCreatedBy: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                            hidden
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="memo_category"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Kategori Dokumen{" "}
                            {/* <span className="text-red-500">*</span> */}
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
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tipe Surat
                        </label>
                        <select
                            type="text"
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
                            <option value="MO">MEMO</option>
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
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tipe Dokumen
                        </label>
                        <select
                            type="text"
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
                            <option value="PROGRAM KERJA">PROGRAM KERJA</option>
                            <option value="BON">BON</option>
                            <option value="DOKUMEN">DOKUMEN</option>
                            <option value="PAYMENT">PAYMENT</option>
                            <option value="FORM">FORM</option>
                            <option value="TANDA TERIMA">TANDA TERIMA</option>
                            <option value="SURAT">SURAT</option>
                            <option value="LAPORAN">LAPORAN</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="memo_masuk"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tanggal Masuk
                        </label>
                        <input
                            type="date"
                            id="memo_masuk"
                            name="memo_masuk"
                            value={formData.memoMasuk}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    memoMasuk: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="memo_keluar"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tanggal Keluar Memo
                        </label>
                        <input
                            type="date"
                            id="memo_keluar"
                            name="memo_keluar"
                            value={formData.memoKeluar}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    memoKeluar: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div>

                    {/* <div className="flex flex-col">
                        <label
                            htmlFor="memo_masuk"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Tanggal Terima Memo
                        </label>
                        <input
                            type="date"
                            id="memo_terima"
                            name="memo_terima"
                            value={formData.memoTerima}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    memoTerima: e.target.value,
                                })
                            }
                            className="input input-bordered mt-1"
                        />
                    </div> */}

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
                            <div tabIndex={0} role="button" className="btn m-1">
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
                                                memoStatus: "WAITING FOR APPROVAL",
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
                    <div className="flex flex-col mt-4">
                        <label
                            htmlFor="note"
                            className="text-sm font-semibold text-gray-600"
                        >
                            Note
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            value={formData.memoNotes}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    memoNotes: e.target.value,
                                })
                            }
                            className="textarea textarea-bordered mt-1"
                            rows="4"
                            placeholder="Tuliskan catatan di sini..."
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="deadlinememo"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Deadline memo{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="deadlinememo"
                            name="deadlinememo"
                            required
                            value={scheduleInput}
                            min={getMinDateTime()}
                            onChange={(e) => setScheduleInput(e.target.value)}
                            className="input input-bordered mt-1"
                        
                        />

                       
                    </div>
                   
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Register Memo
                    </button>
                    
                </form>
                
            </div>
        </div>
    );
};

export default RegisterForm;

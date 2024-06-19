import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { FiSave } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaPenNib } from "react-icons/fa";
import LogisticSignature from "@/components/logistic_components/logistic_signature";
import MemoApprovalForm from "@/components/logistic_components/approval_components/memo_approval"; // Make sure this is the correct import path

const EditMemoPage = () => {
    const [dataAllMemo, setDataAllMemo] = useState({
        memo_id: "",
        memo_num: "",
        memo_perihal: "",
        memo_pic: "",
        memo_department: "",
        memo_createdBy: "",
        memo_reviewer: "",
        memo_deadline: "",
        memo_status: "", // Initialize with desired value
        memo_notes: "", // Ensure this is not null
    });
    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showApprovalForm, setShowApprovalForm] = useState(false); // State to show or hide the approval form
    const [approvalData, setApprovalData] = useState(null); // State to store approval data
    const params = useParams(); 
    const router = useRouter();

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
            );
            setDataAllPic(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/getMemoByID/${params.memoId}`
                );
                setDataAllMemo(response.data.data);
                setSelectedDept(response.data.data.memo_department);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        setDataAllMemo(prevState => ({ ...prevState, memo_createdBy: userid }));

        if (params.memoId) {
            getCurrentData();
        }
        getDataAllPic();
    }, [params.memoId]);

    const handleDateChange = (e) => {
        const { value } = e.target;
        const regex = /^[0-9-]*$/; // Allows only numbers and hyphens
        if (regex.test(value)) {
            setDataAllMemo({
                ...dataAllMemo,
                memo_deadline: value,
            });
            setError("");
        } else {
            setError("Only numeric values allowed");
        }
    };

    const handleStatusChange = () => {
        setDataAllMemo(prevState => ({
            ...prevState,
            memo_status: 'APPROVAL REQUEST SENT'
        }));
    };

    const handleEditedData = async () => {
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        const memoId = params.memoId;
        const payload = {
            ...dataAllMemo,
            memo_createdBy: userid,
            memo_department: selectedDept // Ensure memo_department is included
        };
        console.log('Payload:', payload); // Log the payload to verify its content
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo?memoId=${memoId}`, 
                payload, 
                {
                    headers: {
                        "USER-ID": userid,
                    }
                }
            );
            alert("Memo Update Success");
            router.push('/main/logistic');
        } catch (error) {
            console.log(error);
        }
    };
    


    if (loading) {
        return <PleaseWait />;
    }

    return (
        <>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="memo_num" className="text-sm font-semibold text-gray-600">
                        Nomor Memo
                    </label>
                    <input
                        type="text"
                        id="memo_num"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_num}
                        onChange={(e) =>
                            setDataAllMemo({
                                ...dataAllMemo,
                                memo_num: e.target.value,
                            })
                        }
                        name="memo_num"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_perihal" className="text-sm font-semibold text-gray-600">
                        Perihal Memo
                    </label>
                    <input
                        type="text"
                        id="memo_perihal"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_perihal}
                        onChange={(e) =>
                            setDataAllMemo({
                                ...dataAllMemo,
                                memo_perihal: e.target.value,
                            })
                        }
                        name="memo_perihal"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_pic" className="text-sm font-semibold text-gray-600">
                        PIC <span className="text-red-500">*</span>
                    </label>
                    {dataAllPic && (
                       <select
                       name="memo_pic"
                       id="memo_pic"
                       className="input input-bordered mt-1"
                       value={JSON.stringify(dataAllPic.find(item => item.nama === dataAllMemo.memo_pic))} 
                       onChange={(e) => {
                           const selectedPic = JSON.parse(e.target.value);
                           setDataAllMemo({
                               ...dataAllMemo,
                               memo_pic: selectedPic.nama,
                               memo_department: selectedPic.departemen
                           });
                           setSelectedDept(selectedPic.departemen);
                       }}
                   >
                   
                            <option disabled selected className="text-sm text-gray-600 opacity-50">
                                Select PIC...
                            </option>
                            {dataAllPic.map((item, index) => (
                                <option key={index} value={JSON.stringify(item)}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_department" className="text-sm font-semibold text-gray-600">
                        Department
                    </label>
                    <input
                        type="text"
                        className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                        value={selectedDept} disabled />
                </div>

                <input
                    type="text"
                    id="memo_createdBy"
                    name="memo_createdBy"
                    value={dataAllMemo.memo_createdBy} // Make sure this is using memo_createdBy
                    onChange={(e) =>
                        setDataAllMemo({
                            ...dataAllMemo,
                            memo_createdBy: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    hidden
                />


                <div className="flex flex-col">
                    <label htmlFor="memo_reviewer" className="text-sm font-semibold text-gray-600">
                        Reviewer
                    </label>
                    {dataAllPic && (
                        <select
                            name="memo_reviewer"
                            id="memo_reviewer"
                            className="input input-bordered mt-1"
                            value={dataAllMemo.memo_reviewer}
                            onChange={(e) =>
                                setDataAllMemo({
                                    ...dataAllMemo,
                                    memo_reviewer: e.target.value,
                                })
                            }
                        >
                            <option disabled selected className="text-sm text-gray-600 opacity-50">
                                Select Reviewer...
                            </option>
                            {dataAllPic.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
                        Deadline
                    </label>
                    <input
                        type="date"
                        id="memo_deadline"
                        name="memo_deadline"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_deadline}
                        onChange={handleDateChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_status" className="text-sm font-semibold text-gray-600">
                        Status
                    </label>
                    <input
                        type="text"
                        id="memo_status"
                        className="input input-bordered mt-1 disabled:bg-gray-100"
                        value={dataAllMemo.memo_status}
                        disabled
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_notes" className="text-sm font-semibold text-gray-600">
                        Notes
                    </label>
                    <textarea
                        id="memo_notes"
                        name="memo_notes"
                        value={dataAllMemo.memo_notes}
                        onChange={(e) =>
                            setDataAllMemo({
                                ...dataAllMemo,
                                memo_notes: e.target.value,
                            })
                        }
                        className="input input-bordered mt-1"
                        disabled
                    />
                </div>

                <div className="flex gap-2 items-center text-white ml-3 mt-3 justify-between">
                    <Link href="/main/logistic">
                        <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                            <IoMdArrowRoundBack />
                            <span>Back</span>
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center"
                        onClick={handleEditedData}
                    >
                        <FiSave />
                        <span>Save Edit</span>
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 rounded-xl bg-green-500 flex gap-1 items-center"
                        onClick={handleStatusChange}
                    >
                        <FaPenNib />
                        <span>Request Approval</span>
                    </button>
                </div>

                {showSignaturePad && <LogisticSignature />}
                {showApprovalForm && <MemoApprovalForm approvalData={approvalData} />} {/* Conditionally render the MemoApprovalForm component */}
            </form>
        </>
    );
};

export default EditMemoPage;

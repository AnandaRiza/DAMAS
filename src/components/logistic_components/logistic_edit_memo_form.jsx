import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
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
        memo_status: "",
        memo_deadline: "",
        memo_signature: "",
        maxSize: ""
    });
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showApprovalForm, setShowApprovalForm] = useState(false); // State to show or hide the approval form
    const [approvalData, setApprovalData] = useState(null); // State to store approval data
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/getMemoByID/${params.memoId}`
                );
                setDataAllMemo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (params.memoId) {
            getCurrentData();
        }
    }, [params.memoId]);

    const validateDate = (date) => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(date);
    };

    const handleDateChange = (e) => {
        const { value } = e.target;
        const regex = /^[0-9\/]*$/; // Allow only numbers and "/"
        if (regex.test(value)) {
            setDataAllMemo({
                ...dataAllMemo,
                memo_deadline: value,
            });
            if (!validateDate(value)) {
                setError("Date must be in the format dd/mm/yyyy");
            } else {
                setError("");
            }
        } else {
            setError("Only numbers and '/' are allowed");
        }
    };

    const handleEditedData = async () => {
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        const memoId = params.memoId;
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo?memoId=${memoId}`, dataAllMemo, {
                    headers: {
                        "USER-ID": userid,
                    }
                }
            );
            console.log(response.data);
            alert("Edit Success");
            router.push('/main/logistic');
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrCreateApproval = async () => {
        const memoId = params.memoId;
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memo-approval/memo-or-create/${memoId}?userId=${userid}`);
            setApprovalData(response.data);
            setShowApprovalForm(true); // Show the approval form
        } catch (error) {
            console.log("Error fetching or creating approval:", error);
            if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
                alert(`Error: ${error.response.data.message || "Server error"}`);
            } else if (error.request) {
                console.log("Request data:", error.request);
                alert("No response received from the server");
            } else {
                console.log("Error message:", error.message);
                alert("Error setting up the request");
            }
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
                        Memo PIC
                    </label>
                    <input
                        type="text"
                        id="memo_pic"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_pic}
                        onChange={(e) =>
                            setDataAllMemo({
                                ...dataAllMemo,
                                memo_pic: e.target.value,
                            })
                        }
                        name="memo_pic"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_status" className="text-sm font-semibold text-gray-600">
                        Status
                    </label>
                    <select
                        id="memo_status"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_status}
                        onChange={(e) =>
                            setDataAllMemo({
                                ...dataAllMemo,
                                memo_status: e.target.value,
                            })
                        }
                        name="memo_status"
                    >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Finished">Finished</option>
                        <option value="Past Deadline">Past Deadline</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
                        Deadline
                    </label>
                    <input
                        type="text"
                        id="memo_deadline"
                        className="input input-bordered mt-1"
                        value={dataAllMemo.memo_deadline}
                        onChange={handleDateChange}
                        name="memo_deadline"
                        placeholder="dd/mm/yyyy"
                    />
                    {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
                </div>

                <div className="flex gap-2 items-center text-white ml-3 mt-3">
                    <Link href="/main/logistic">
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
                    <button
                        type="button"
                        className="py-2 px-4 rounded-xl bg-green-500 flex gap-1 items-center"
                        onClick={fetchOrCreateApproval}
                    >
                        <FaPenNib />
                        <span>Approval</span>
                    </button>
                </div>
            </form>
            {showApprovalForm && <MemoApprovalForm memoId={params.memoId} approvalData={approvalData} />} 
        </>
    );
};

export default EditMemoPage;

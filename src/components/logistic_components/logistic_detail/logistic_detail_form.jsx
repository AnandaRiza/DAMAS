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

const DetailMemoPage = () => {
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
        memo_notes: "",
        memo_upload: "" // Ensure this is not null
    });
    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showApprovalForm, setShowApprovalForm] = useState(false); // State to show or hide the approval form
    const [approvalData, setApprovalData] = useState(null); // State to store approval data
    const [file, setFile] = useState(null); // State to hold uploaded file
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

    // Function to handle file upload
    const handleFileUpload = async (event) => {
        const fileToUpload = event.target.files[0];
        const formData = new FormData();
        formData.append("file", fileToUpload);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo/upload/${params.memoId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            setDataAllMemo(prevState => ({
                ...prevState,
                memo_upload: response.data.fileName // Update state with uploaded file name
            }));
            setFile(fileToUpload); // Update file state to track if a new file is uploaded
        } catch (error) {
            console.error("Error uploading file: ", error);
            setError("Failed to upload file");
        }
    };

  // Helper function to check if a string is Base64 encoded
const isBase64 = (str) => {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};



// Function to handle file download
const handleFileDownload = async () => {
    const { memo_upload } = dataAllMemo;
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo/download/${memo_upload}`,
            {
                responseType: "blob" // Important to specify blob response type
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", memo_upload);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error downloading file: ", error);
        setError("Failed to download file");
    }
};
    // Decode base64 string if necessary
    const decodeBase64 = (encodedString) => {
        try {
            return atob(encodedString);
        } catch (e) {
            console.error("Error decoding base64 string: ", e);
            return encodedString;
        }
    };

    // Function to handle form submission after edits
    const handleEditedData = async () => {
        try {
            if (!file) {
                setDataAllMemo(prevState => ({
                    ...prevState,
                    memo_upload: prevState.memo_upload // Keep existing file name if no new file is uploaded
                }));
            }
            const updatedData = {
                ...dataAllMemo,
                memo_upload: decodeBase64(dataAllMemo.memo_upload) // Decode base64 before sending if necessary
            };
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo?memoId=${params.memoId}`,
                updatedData
            );
            alert("Memo Update Success");
            router.push('/main/logistic');
        } catch (error) {
            console.error("Error updating memo: ", error);
            setError("Failed to update memo");
        }
    };

    if (loading) {
        return <PleaseWait />;
    }

    const isReadOnly = dataAllMemo.memo_status === "MEMO APPROVED";

    return (
        <>
            <form className="space-y-4">
            <Link href="/main/logistic">
                        <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                            <IoMdArrowRoundBack />
                            <span>Back</span>
                        </button>
                    </Link>
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
                        readOnly={isReadOnly}
                        disabled
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
                        readOnly={isReadOnly}
                        disabled
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_pic" className="text-sm font-semibold text-gray-600">
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
                            disabled
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
                        id="memo_department"
                        className="input input-bordered mt-1"
                        value={selectedDept}
                        readOnly
                        disabled
                    />
                </div>


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
            disabled // Correctly set the disabled attribute
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
                        readOnly
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="memo_status" className="text-sm font-semibold text-gray-600">
                        Status
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="memo_status"
                            className="input input-bordered mt-1 disabled:bg-gray-100 flex-1"
                            value={dataAllMemo.memo_status}
                            disabled
                        />
                
                    </div>
                </div>

               {dataAllMemo.memo_notes && ( // Only render this section if memo_notes has data
                    <div className="flex flex-col">
                        <label htmlFor="memo_notes" className="text-sm font-semibold text-gray-600">
                            Memo Notes
                        </label>
                        <textarea
                            id="memo_notes"
                            className="textarea textarea-bordered mt-1"
                            value={dataAllMemo.memo_notes}
                            onChange={(e) =>
                                setDataAllMemo({
                                    ...dataAllMemo,
                                    memo_notes: e.target.value,
                                })
                            }
                            name="memo_notes"
                            readOnly
                        />
                    </div>
                )}

                {/* File Upload Field */}
                <div className="flex flex-col">
                    <label htmlFor="memo_upload" className="text-sm font-semibold text-gray-600">
                        Upload File <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="memo_upload"
                        className="file-input file-input-bordered mt-1"
                        onChange={handleFileUpload}
                        name="memo_upload"
                        disabled
                    />
                    {dataAllMemo.memo_upload && (
                        <div>
                            <button type="button" className="btn btn-sm btn-link text-blue-600 underline" onClick={handleFileDownload}>
                                Download Current File
                            </button>
                        </div>
                    )}
                </div>


                {/* Download Link */}
          

                {/* Error Handling */}
          

            

                {showApprovalForm && <MemoApprovalForm approvalData={approvalData} />} {/* Conditionally render the MemoApprovalForm component */}
            </form>
        </>
    );
};

export default DetailMemoPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { FiSave } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { FaPenNib } from "react-icons/fa";
import { useStateContext } from "@/context/ContextProvider";
import LogisticSignature from "@/components/logistic_components/logistic_signature";
import MemoApprovalForm from "@/components/logistic_components/approval_components/memo_approval"; // Make sure this is the correct import path
import { PiEngineDuotone } from "react-icons/pi";
import { MdEditAttributes } from "react-icons/md";
import { IoBook, IoPencil } from "react-icons/io5";





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
    memo_upload: "",
    userdomain: "",
    userdomainpic: "",
    userdomainreviewer: "",
    memo_category: "",
    memo_surat_type: "",
    memo_masuk: "",
    memo_doc_type: "",
    memo_keluar: "",
    memo_terima: "",
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


  const { user } = useStateContext();

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
    
        const responseData = response.data.data;
    
        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };
    
        setDataAllMemo((prevState) => ({
          ...prevState,
          ...responseData,
          memo_masuk: formatDate(responseData.memo_masuk),
          memo_keluar: formatDate(responseData.memo_keluar),
          memo_terima: formatDate(responseData.memo_terima),
        }));
    
        setSelectedDept(responseData.memo_department);
        setLoading(false);
    
        // Log the updated state
        console.log("Updated dataAllMemo:", {
          ...responseData,
          memo_masuk: formatDate(responseData.memo_masuk),
          memo_keluar: formatDate(responseData.memo_keluar),
          memo_terima: formatDate(responseData.memo_terima),
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchUserIdAndUserDomain = async () => {
      const userid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("DAMAS-USERID="))
        ?.split("=")[1];
      if (userid) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users/${userid}`
          );
          const userdomain = response.data.data.userdomain;
          setDataAllMemo((prevState) => ({
            ...prevState,
            memo_createdBy: userid,
            userdomain: user.userdomain,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserIdAndUserDomain();
    if (params.memoId) {
      getCurrentData();
    }
    getDataAllPic();
  }, [params.memoId]);

  // const handleDateChange = (e) => {
  //   const { value } = e.target;
  //   const regex = /^[0-9-]*$/; // Allows only numbers and hyphens
  //   if (regex.test(value)) {
  //     setDataAllMemo({
  //       ...dataAllMemo,
  //       memo_deadline: value,
  //     });
  //     setError("");
  //   } else {
  //     setError("Only numeric values allowed");
  //   }
  // };

  const handlePicChange = (e) => {
    const { value } = e.target;
    if (value) {
      const selectedPic = JSON.parse(value);
      setDataAllMemo({
        ...dataAllMemo,
        memo_pic: selectedPic.nama,
        memo_department: selectedPic.departemen,
        userdomainpic: selectedPic.userdomain,
      });
      setSelectedDept(selectedPic.departemen);
      setError("");
    } else {
      setError("Invalid PIC selected");
    }
  };
  const handleStatusChange = () => {
    const confirmChange = window.confirm(
      "Are you sure you want to change the status? Once the status is changed, it cannot be undone."
    );
    if (confirmChange) {
      setDataAllMemo((prevState) => ({
        ...prevState,
        memo_status: "APPROVAL REQUEST SENT TO HEAD OF DEPARTMENT",
      }));
    }
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
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDataAllMemo((prevState) => ({
        ...prevState,
        memo_upload: response.data.fileName, // Update state with uploaded file name
      }));
      setFile(fileToUpload); // Update file state to track if a new file is uploaded
      console.log(`File updated: ${response.data.fileName}`); // Console log the updated file name
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
      const decodedFileName = decodeBase64(memo_upload);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo/download/${decodedFileName}`,
        {
          responseType: "blob", // Important to specify blob response type
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", decodedFileName);
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



  useEffect(() => {
    console.log("Updated dataAllMemo:", dataAllMemo);
  }, [dataAllMemo])

  // Function to handle form submission after edits
  const handleEditedData = async () => {
    if (window.confirm("Are you sure you want to save the changes?")) {
      try {
        if (!file) {
          setDataAllMemo((prevState) => ({
            ...prevState,
            memo_upload: prevState.memo_upload, // Keep existing file name if no new file is uploaded
          }));
        }
        const updatedData = {
          ...dataAllMemo,
          memo_upload: decodeBase64(dataAllMemo.memo_upload), // Decode base64 before sending if necessary
        };
  
        // Console log the data being posted
        console.log("Data being posted:", updatedData);
  
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo?memoId=${params.memoId}`,
          updatedData
        );
  
        console.log("Memo update response:", response.data);
        console.log(`File updated: ${updatedData.memo_upload}`); // Console log the updated file name
  
        alert("Memo Update Success");
        router.push("/main/logistic/mymemo");
      } catch (error) {
        console.error("Error updating memo: ", error);
        setError("Failed to update memo");
      }
    }
  };
  

  if (loading) {
    return <PleaseWait />;
  }

  // const isReadOnly = dataAllMemo.memo_status !== "MEMO DRAFT";
  
  return (
    <>
      <form className="space-y-4">
      <div className="flex justify-between items-center p-4">
  <Link href="/main/logistic/general/allproject">
    <button className="py-2 px-4 rounded-xl bg-red-500 hover:bg-red-800 text-white flex gap-1 items-center">
      <IoMdArrowRoundBack />
      <span>Back</span>
    </button>
  </Link>

  <Link href={`/main/logistic/mymemo/editmemo/${dataAllMemo.memo_id}`}>
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl  flex gap-1 items-center">
    <IoPencil className="mr-2" />
    Edit
  </button>
</Link>
</div>

        <div className="flex flex-col">
          <label
            htmlFor="memo_num"
            className="text-sm font-semibold text-gray-600"
          >
            Nomor Memo
          </label>
          <input readOnly
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
            // readOnly={isReadOnly}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="memo_perihal"
            className="text-sm font-semibold text-gray-600"
          >
            Perihal Memo
          </label>
          <input readOnly   
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
            // readOnly={isReadOnly}
          />
        </div>
        {/* 
        <input
            type="text"
            name="memo_createdBy"
            value={dataAllMemo.userdomain}
            className="input input-bordered mt-1"
            
          />

<input
            type="text"
            name="memo_createdBy"
            value={dataAllMemo.userdomainpic}
            className="input input-bordered mt-1"
            
          />


<input
            type="text"
            name="userdomainreviewer"
            value={dataAllMemo.userdomainreviewer}
            className="input input-bordered mt-1"
            
          /> */}
        <div className="flex flex-col">
          <label
            htmlFor="memo_pic"
            className="text-sm font-semibold text-gray-600"
          >
            PIC
          </label>
          {dataAllPic && (
            <select disabled
              name="memo_pic"
              id="memo_pic"
              className="input input-bordered mt-1"
              value={JSON.stringify(
                dataAllPic.find((item) => item.nama === dataAllMemo.memo_pic)
              )}
              onChange={(e) => {
                const selectedPic = JSON.parse(e.target.value);
                setDataAllMemo({
                  ...dataAllMemo,
                  memo_pic: selectedPic.nama,
                  memo_department: selectedPic.departemen,
                  userdomainpic: selectedPic.userdomain,
                });
                setSelectedDept(selectedPic.departemen);
              }}
              // disabled={isReadOnly}
            >
              <option
                disabled
                selected
                className="text-sm text-gray-600 opacity-50"
              >
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
          <label
            htmlFor="memo_department"
            className="text-sm font-semibold text-gray-600"
          >
            Department
          </label>
          <input
            type="text"
            id="memo_department"
            className="input input-bordered mt-1"
            value={selectedDept}
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="memo_perihal"
            className="text-sm font-semibold text-gray-600"
          >
            Pembuat Memo
          </label>
          <input
            type="text"
            name="memo_createdBy"
            value={dataAllMemo.memo_createdBy}
            className="input input-bordered mt-1"
            disabled
          />
        </div>
        <div className="flex flex-col">
  <label
    htmlFor="memo_category"
    className="text-sm font-semibold text-gray-600"
  >
    Kategori Memo
  </label>
  <select disabled
    name="memo_category"
    value={dataAllMemo.memo_category}
    onChange={(e) =>
      setDataAllMemo({
        ...dataAllMemo,
        memo_category: e.target.value,
      })
    }
    className="input input-bordered mt-1"
  >
    <option value="" disabled>
      Pilih Kategori Memo ...
    </option>
    <option value="Memo Masuk">Memo Masuk</option>
    <option value="Memo Keluar">Memo Keluar</option>
  </select>
</div>

<div className="flex flex-col">
  <label
    htmlFor="memo_surat_type"
    className="text-sm font-semibold text-gray-600"
  >
    Tipe Surat
  </label>
  <select disabled
    name="memo_surat_type"
    value={dataAllMemo.memo_surat_type}
    onChange={(e) =>
      setDataAllMemo({
        ...dataAllMemo,
        memo_surat_type: e.target.value,
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
    className="text-sm font-semibold text-gray-600"
  >
    Tipe Dokumen
  </label>
  <select disabled
    name="memo_doc_type"
    value={dataAllMemo.memo_doc_type}
    onChange={(e) =>
      setDataAllMemo({
        ...dataAllMemo,
        memo_doc_type: e.target.value,
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
            htmlFor="memo_reviewer"
            className="text-sm font-semibold text-gray-600"
          >
            Reviewer
          </label>
          {dataAllPic && (
            <select disabled
              name="memo_reviewer"
              id="memo_reviewer"
              className="input input-bordered mt-1"
              value={JSON.stringify(
                dataAllPic.find(
                  (item) => item.nama === dataAllMemo.memo_reviewer
                )
              )}
              onChange={(e) => {
                const selectedReviewer = JSON.parse(e.target.value);
                setDataAllMemo({
                  ...dataAllMemo,
                  memo_reviewer: selectedReviewer.nama,
                  userdomainreviewer: selectedReviewer.userdomain,
                });
              }}
              // disabled={isReadOnly}
            >
              <option
                disabled
                selected
                className="text-sm text-gray-600 opacity-50"
              >
                Select Reviewer...
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
          <label
            htmlFor="memo_masuk"
            className="text-sm font-semibold text-gray-600"
          >
            Tanggal Memo Masuk
          </label>
          <input disabled
  type="date"
  id="memo_masuk"
  name="memo_masuk"
  className="input input-bordered mt-1"
  value={dataAllMemo.memo_masuk || ''}
  onChange={(e) =>
    setDataAllMemo({
      ...dataAllMemo,
      memo_masuk: e.target.value,
    })
  }
/>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="memo_keluar"
            className="text-sm font-semibold text-gray-600"
          >
            Tanggal Memo Keluar
          </label>
          <input disabled
            type="date"
            id="memo_keluar"
            name="memo_keluar"
            className="input input-bordered mt-1"
            value={dataAllMemo.memo_keluar}
            onChange={(e) =>
              setDataAllMemo({
                ...dataAllMemo,
                memo_keluar: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="memo_terima"
            className="text-sm font-semibold text-gray-600"
          >
            Tanggal Terima Memo
          </label>
          <input disabled
            type="date"
            id="memo_terima"
            name="memo_terima"
            className="input input-bordered mt-1"
            value={dataAllMemo.memo_terima}
            onChange={(e) =>
              setDataAllMemo({
                ...dataAllMemo,
                memo_terima: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="memo_status"
            className="text-sm font-semibold text-gray-600"
          >
            Status Memo
          </label>
          <select disabled
            name="memo_status"
            value={dataAllMemo.memo_status}
            onChange={(e) =>
              setDataAllMemo({
                ...dataAllMemo,
                memo_status: e.target.value,
              })
            }            className="input input-bordered mt-1"
          >
            <option value="" disabled>
              Pilih Kategori Memo ...
            </option>
            <option value="MEMO DRAFT">MEMO DRAFT</option>
              <option value="MEMO ON HOLD">MEMO ON HOLD</option>
              <option value="MEMO FINISHED">MEMO FINISHED</option>
              <option value="MEMO CANCELED">MEMO CANCELED</option>
          </select>
        </div>

        {dataAllMemo.memo_notes && ( // Only render this section if memo_notes has data
          <div className="flex flex-col">
            <label
              htmlFor="memo_notes"
              className="text-sm font-semibold text-gray-600"
            >
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
              // disabled={isReadOnly}
              disabled
            />
          </div>
        )}
        {/* File Upload Field */}
        <div className="flex flex-col">
          <label
            htmlFor="memo_upload"
            className="text-sm font-semibold text-gray-600"
          >
            Upload File <span className="text-red-500">*</span>
          </label>
          <input disabled
            type="file"
            id="memo_upload"
            className="file-input file-input-bordered mt-1"
            onChange={handleFileUpload}
            name="memo_upload"
            // disabled={isReadOnly}
          />
          {dataAllMemo.memo_upload && (
            <div>
              <button
                type="button"
                className="btn btn-sm btn-link text-blue-600 underline"
                onClick={handleFileDownload}
              >
Download: {decodeBase64(dataAllMemo.memo_upload)}              </button>
            </div>
          )}
        </div>
        {/* Download Link */}
        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}
   
        {showApprovalForm && <MemoApprovalForm approvalData={approvalData} />}{" "}
        {/* Conditionally render the MemoApprovalForm component */}
      </form>
    </>
  );
};

export default DetailMemoPage;

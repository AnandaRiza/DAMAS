"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/ContextProvider";
import Swal from 'sweetalert2';


const MemoForm = () => {
  const [dataAllPic, setDataAllPic] = useState(null);
  const [filteredDataAllPic, setFilteredDataAllPic] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [scheduleInput, setScheduleInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    memo_num: "",
    memo_perihal: "",
    memo_pic: "",
    memo_department: "",
    memo_createdBy: "",
    memo_reviewer: "",
    memo_deadline: "",
    memo_status: "",
    memo_notes: "",
    memo_upload: null,
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

  const [error, setError] = useState("");
  const router = useRouter();

  const {user}  = useStateContext();

  const getDataAllPic = async () => {
    setDataAllPic(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
      );
      setDataAllPic(response.data.data);
      setFilteredDataAllPic(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataEmail, setdataEmail] = useState({
    to: "",
    subject: "Deadline Memo is Due Tomorrow",
    deadline: "",
    deadlinepro: "",
});


  useEffect(() => {
    getDataAllPic();
    const userid = document.cookie
      .split("; ")
      .find((row) => row.startsWith("DAMAS-USERID="))
      ?.split("=")[1];
    setFormData((prevState) => ({ ...prevState, memo_createdBy: userid }));
  }, []);

  
  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to create this memo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
    });
  
    if (!result.isConfirmed) {
      return;
    }
  
    const userid = document.cookie
      .split("; ")
      .find((row) => row.startsWith("DAMAS-USERID="))
      ?.split("=")[1];
  
    try {
      const formDataToSend = {
        ...formData,
        memo_createdBy: userid,
        userdomain: user.userdomain,
        memo_category: formData.memo_category,
        memo_surat_type: formData.memo_surat_type,
        memo_masuk: formData.memo_masuk,
        memo_keluar: formData.memo_keluar,
        memo_terima: formData.memo_terima,
        memo_doc_type: formData.memo_doc_type,
        memo_status: formData.memo_status, 
      };
  
      console.log("Data to be posted:", formDataToSend);
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            "USER-ID": userid,
          },
        }
      );
  
      console.log("Memo creation response:", response.data);
  
      await Swal.fire({
        title: 'Success!',
        text: 'Memo has been created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      router.push("/main/logistic");
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
      } else {
        console.log("Error message:", error.message);
      }
  
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to create memo!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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

const deadlinecoy = (date) => {
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


  // const handleDateChange = (e) => {
  //   const { value } = setScheduleInput(e.target);
  //   const regex = /^[0-9-]*$/;

  //   if (regex.test(value)) {
  //     setFormData({
  //       ...formData,
  //       memo_deadline: value,
  //     });
  //     setError("");
  //   } else {
  //     setError("Only numeric values allowed");
  //   }
  // };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredDataAllPic(dataAllPic);
    } else {
      const filtered = dataAllPic.filter((pic) =>
        pic.nama.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDataAllPic(filtered);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      memo_upload: file,
    });
  };

  return (
    <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <form className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="memo_num"
              className="text-sm font-semibold text-gray-600"
            >
              Nomor Memo
            </label>
            <input
              type="text"
              id="memo_num"
              name="memo_num"
              value={formData.memo_num}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_num: e.target.value,
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
              Perihal Memo
            </label>
            <input
              type="text"
              id="memo_perihal"
              name="memo_perihal"
              value={formData.memo_perihal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_perihal: e.target.value,
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
              <>
                {/* <input
                  type="text"
                  placeholder="Search PIC..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input input-bordered mt-1"
                /> */}
                <select
                  name="memo_pic"
                  id="memo_pic"
                  className="input input-bordered mt-1"
                  value={JSON.stringify(
                    dataAllPic.find((item) => item.nama === formData.memo_pic)
                  )}
                  onChange={(e) => {
                    const selectedPic = JSON.parse(e.target.value);
                    setFormData({
                      ...formData,
                      memo_pic: selectedPic.nama,
                      memo_department: selectedPic.departemen,
                      userdomainpic: selectedPic.userdomain,
                    });
                    setSelectedDept(selectedPic.departemen);
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
                    <option key={index} value={JSON.stringify(item)}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="memo_department" className="text-sm font-semibold">
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
              value={formData.memo_createdBy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_createdBy: e.target.value,
                })
              }
              className="input input-bordered mt-1"
              hidden
            />
          </div>

          {/* <div className="flex flex-col">
            <label htmlFor="memo_reviewer" className="text-sm font-semibold text-gray-600">
              Reviewer
            </label>
            {dataAllPic && (
              <select
                name="memo_reviewer"
                id="memo_reviewer"
                className="input input-bordered mt-1"
                value={JSON.stringify(dataAllPic.find((item) => item.nama === formData.memo_reviewer))}
                onChange={(e) => {
                  const selectedReviewer = JSON.parse(e.target.value);
                  setFormData({
                    ...formData,
                    memo_reviewer: selectedReviewer.nama,
                    userdomainreviewer: selectedReviewer.userdomain,
                  });
                }}
              >
                <option disabled selected className="text-sm text-gray-600 opacity-50">
                  Select Reviewer...
                </option>
                {filteredDataAllPic.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.nama}
                  </option>
                ))}
              </select>
            )}
          </div> */}

          <div className="flex flex-col">
            <label
              htmlFor="memo_category"
              className="text-sm font-semibold text-gray-600"
            >
              Kategori Memo
            </label>
            <select
              type="text"
              id="memo_category"
              name="memo_category"
              value={formData.memo_category}
              onChange={(e) =>
                setFormData({
                  ...formData,
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
            <select
              type="text"
              id="memo_surat_type"
              name="memo_surat_type"
              value={formData.memo_surat_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
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
            <select
              type="text"
              id="memo_doc_type"
              name="memo_doc_type"
              value={formData.memo_doc_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
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

          {/* <div className="flex flex-col" hidden>
            <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="memo_deadline"
              name="memo_deadline"
              value={scheduleInput}
              min={getMinDateTime()}
              onChange={(e) => setScheduleInput(e.target.value)}
              className="input input-bordered mt-1"
              // placeholder="YYYY-MM-DD"
            />
            {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
          </div> */}

          <div className="flex flex-col">
            <label
              htmlFor="memo_masuk"
              className="text-sm font-semibold text-gray-600"
            >
              Tanggal Masuk Memo
            </label>
            <input
              type="date"
              id="memo_masuk"
              name="memo_masuk"
              value={formData.memo_masuk}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_masuk: e.target.value,
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
              value={formData.memo_keluar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_keluar: e.target.value,
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
              Tanggal Terima Memo
            </label>
            <input
              type="date"
              id="memo_masuk"
              name="memo_masuk"
              value={formData.memo_masuk}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_masuk: e.target.value,
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
              value={formData.memo_notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memo_notes: e.target.value,
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
              Status
            </label>
            <select
  id="memo_status"
  className="input input-bordered mt-1"
  value={formData.memo_status}
  onChange={(e) =>
    setFormData({
      ...formData,
      memo_status: e.target.value,
    })
  }
  name="memo_status"
  defaultValue="MEMO DRAFT"
>
  <option value="MEMO DRAFT">MEMO DRAFT</option>
  <option value="MEMO ON HOLD">MEMO ON HOLD</option>
  <option value="MEMO FINISHED">MEMO FINISHED</option>
  <option value="MEMO CANCELED">MEMO CANCELED</option>
</select>
          </div>

          {/* <div className="flex flex-col">
            <label htmlFor="memo_upload" className="text-sm font-semibold text-gray-600">
              Upload File
            </label>
            <input
              type="file"
              id="memo_upload"
              name="memo_upload"
              onChange={handleFileChange}
              className="mt-1"  
            />
          </div>
           */}

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Create Memo
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemoForm;

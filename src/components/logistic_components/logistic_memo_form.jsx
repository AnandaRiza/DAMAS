"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/ContextProvider";


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
    memo_status: "MEMO DRAFT",
    memo_notes: "",
    memo_upload: null,
    userdomain: "",
    userdomainpic: "",
    userdomainreviewer: "",
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
    if (!window.confirm("Are you sure you want to create this memo?")) {
      return;
    }

    
  
    const userid = document.cookie
      .split("; ")
      .find((row) => row.startsWith("DAMAS-USERID="))
      ?.split("=")[1];

    try {
      // const regex = /^\d{4}-\d{2}-\d{2}$/;
      // if (!regex.test(formData.memo_deadline)) {
      //   setError("Date must be in the format YYYY-MM-DD");
      //   return;
      // }

      const formDataToSend = {
        ...formData,
        memo_createdBy: userid,
        userdomain: user.userdomain,
        memo_deadline: deadlinecoy(scheduleInput),
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/schedulesend-email`,
        {
            ...dataEmail,
            text: `Assalamualaikum Warahmatullahi Wabarakatuh,
    
            Yth. Bapak/Ibu,
            
            Bersama ini kami memberitahukan bahwa deadline memo tinggal 1 hari lagi dengan detail project:
            
            Nomer Memo  : ${formData.memo_num}
            Perihal Memo: ${formData.memo_perihal}
            PIC         : ${formData.memo_pic}
            Departement : ${formData.memo_department}
            Deadline    : ${deadlinecoy(scheduleInput)}
            Website     : http://localhost:3000/main
            
            Mohon pastikan semua persiapan dan tahapan terakhir telah diselesaikan untuk memastikan memo selesai tepat waktu. Terima Kasih.
            
Wassalamualaikum Warahmatullahi Wabarakatuh`,
            to: "ananda_riza@bcasyariah.co.id",
            deadline: calculateDeadline(scheduleInput),
            deadlinepro: calculateDeadline(scheduleInput),
        }
    );

      console.log("Memo creation response:", response.data);

      alert("Create Memo Success");
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
      alert("Create Memo Failed!");
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
            <label htmlFor="memo_num" className="text-sm font-semibold text-gray-600">
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
            <label htmlFor="memo_perihal" className="text-sm font-semibold text-gray-600">
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
            <label htmlFor="memo_pic" className="text-sm font-semibold text-[#0066AE]">
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
                  value={JSON.stringify(dataAllPic.find((item) => item.nama === formData.memo_pic))}
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
                  <option disabled selected className="text-sm text-gray-600 opacity-50">
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
            <label htmlFor="memo_createdBy" className="text-sm font-semibold text-gray-600" hidden>
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

          <div className="flex flex-col">
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
          </div>

          <div className="flex flex-col">
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
          </div>

          <div className="flex flex-col">
            <label htmlFor="memo_notes" hidden className="text-sm font-semibold text-gray-600">
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
            <label htmlFor="memo_status" className="text-sm font-semibold text-gray-600">
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
              disabled
            >
              <option value="MEMO DRAFT">DRAFT MEMO</option>
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

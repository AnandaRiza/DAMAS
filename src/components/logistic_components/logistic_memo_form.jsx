"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MemoForm = () => {
  const [formData, setFormData] = useState({
    memo_num: "",
    memo_perihal: "",
    memo_pic: "",
    memo_department: "",
    memo_createdBy: "",
    memo_reviewer: "",
    memo_deadline: "",
    memo_status: "WAITING FOR APPROVAL", // Initialize with desired value
    memo_notes: "", // Ensure this is not null
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log("Sending data:", formData);

      // Add check for date format
      const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
      if (!regex.test(formData.memo_deadline)) {
        setError("Date must be in the format YYYY-MM-DD");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Create Memo Success");
      router.push("/main/logistic"); // Assuming you want to navigate after success
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

  const handleDateChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9-]*$/; // Allows only numbers and hyphens

    if (regex.test(value)) {
      setFormData({
        ...formData,
        memo_deadline: value,
      });
      setError("");
    } else {
      setError("Only numeric values allowed");
    }
  };

  return (
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
        <label htmlFor="memo_pic" className="text-sm font-semibold text-gray-600">
          PIC
        </label>
        <input
          type="text"
          id="memo_pic"
          name="memo_pic"
          value={formData.memo_pic}
          onChange={(e) =>
            setFormData({
              ...formData,
              memo_pic: e.target.value,
            })
          }
          className="input input-bordered mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="memo_department" className="text-sm font-semibold text-gray-600">
          Department
        </label>
        <input
          type="text"
          id="memo_department"
          name="memo_department"
          value={formData.memo_department}
          onChange={(e) =>
            setFormData({
              ...formData,
              memo_department: e.target.value,
            })
          }
          className="input input-bordered mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="memo_createdBy" className="text-sm font-semibold text-gray-600">
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
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="memo_reviewer" className="text-sm font-semibold text-gray-600">
          Reviewer
        </label>
        <input
          type="text"
          id="memo_reviewer"
          name="memo_reviewer"
          value={formData.memo_reviewer}
          onChange={(e) =>
            setFormData({
              ...formData,
              memo_reviewer: e.target.value,
            })
          }
          className="input input-bordered mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
          Deadline
        </label>
        <input
          type="text"
          id="memo_deadline"
          name="memo_deadline"
          value={formData.memo_deadline}
          onChange={handleDateChange}
          className="input input-bordered mt-1"
          placeholder="YYYY-MM-DD"
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>

      {/* Hidden memo_notes field */}
      <input
        type="hidden"
        id="memo_notes"
        name="memo_notes"
        value={formData.memo_notes}
      />

      {/* Status dropdown */}
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
          <option value="WAITING FOR APPROVAL">Waiting for Approval</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={handleSubmit}
      >
        Create Memo
      </button>
    </form>
  );
};

export default MemoForm;

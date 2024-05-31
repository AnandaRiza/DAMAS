"use client";
 
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
 
const MemoForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    memo_perihal: "",
    memo_pic: "",
    memo_deadline: "",
    memo_status: "",
  });
  
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo`,
        formData
      );
      alert("Create Memo Success");
      router.push('/main/logistic');
    } catch (error) {
      console.log(error);
      alert("Create Memo Failed!");
    }
    
  };
 
  return (
    <form className="space-y-4">
 
 
 
<div className="flex flex-col">
        <label
          htmlFor="memo_perihal"
          className="text-sm font-semibold text-gray-600"
        >
          Memo Number
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
 
 
 
 
      {/* Input fields for memo attributes */}
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
        <label htmlFor="memo_pic" className="text-sm font-semibold text-gray-600">
          PIC
        </label>
        <input
          type="text"
          id="memo_pic"
          name="memo_pic"
          value={formData.memo_pic}
          onChange={(e) => setFormData({ ...formData, memo_pic: e.target.value })}
          className="input input-bordered mt-1"
        />
      </div>
 
 
      <div className="flex flex-col">
        <label
          htmlFor="memo_deadline"
          className="text-sm font-semibold text-gray-600"
        >
          Deadline
        </label>
        <input
          type="date"
          id="memo_deadline"
          name="memo_deadline"
          value={formData.memo_deadline}
          onChange={(e) =>
            setFormData({ ...formData, memo_deadline: e.target.value })
          }
          className="input input-bordered mt-1"
        />
      </div>
 
 
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
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Finished">Finished</option>
          <option value="Past Deadline">Past Deadline</option>
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
'use client';

import React, { useState } from "react";

const SDLC_form_edit = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    namaproject: "",
    pic: "",
    deadline: "",
    status: "Ongoing", // Default status
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log("Form submitted:", formData);
    // Reset form fields after submission
    setFormData({
      namaproject: "",
      pic: "",
      deadline: "",
      status: "Ongoing", // Reset status to default
    });
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle status change
  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input fields for memo attributes */}
      <div className="flex flex-col">
        <label htmlFor="namaproject" className="text-sm font-semibold text-gray-600">Nama Project</label>
        <input
          type="text"
          id="namaproject"
          name="namaproject"
          value={formData.perihal}
          onChange={handleInputChange}
          className="input input-bordered mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="pic" className="text-sm font-semibold text-gray-600">PIC</label>
        <input
          type="text"
          id="pic"
          name="pic"
          value={formData.pic}
          onChange={handleInputChange}
          className="input input-bordered mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="deadline" className="text-sm font-semibold text-gray-600">Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
          className="input input-bordered mt-1"
        />
      </div>
      {/* Status dropdown */}
      <div className="flex flex-col">
        <label htmlFor="status" className="text-sm font-semibold text-gray-600">Status</label>
        <div className="dropdown mt-1">
          <div tabIndex={0} role="button" className="btn m-1">
            {formData.status}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => handleStatusChange("Ongoing")}>Ongoing</a>
            </li>
            <li>
              <a onClick={() => handleStatusChange("Finished")}>Finished</a>
            </li>
            <li>
              <a onClick={() => handleStatusChange("Past Deadline")}>Past Deadline</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary mt-4">Edit Project</button>
    </form>
  );
};

export default SDLC_form_edit;

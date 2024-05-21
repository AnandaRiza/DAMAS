'use client';

import React, { useState, useEffect } from "react";

const EditProgressForm = ({ memoId }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        perihal: "",
        pic: "",
        deadline: "",
        status: "Ongoing", // Default status
    });

    // Fetch memo data from the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/memos/${memoId}`);
                const data = await response.json();
                setFormData({
                    noMemo: data.noMemo,
                    perihal: data.perihal,
                    pic: data.pic,
                    deadline: data.deadline,
                    status: data.status,
                });
            } catch (error) {
                console.error('Failed to fetch memo data:', error);
            }
        };

        fetchData();
    }, [memoId]);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., send data to server)
        console.log("Form submitted:", formData);
        // Optionally reset form fields after submission
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
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            {/* Input fields for memo attributes */}
            <div className="flex flex-col">
                <label htmlFor="perihal" className="text-sm font-semibold text-gray-700">Perihal</label>
                <input
                    type="text"
                    id="perihal"
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleInputChange}
                    className="input input-bordered mt-2 p-2"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="pic" className="text-sm font-semibold text-gray-700">PIC</label>
                <input
                    type="text"
                    id="pic"
                    name="pic"
                    value={formData.pic}
                    onChange={handleInputChange}
                    className="input input-bordered mt-2 p-2"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="deadline" className="text-sm font-semibold text-gray-700">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="input input-bordered mt-2 p-2"
                />
            </div>
            {/* Status dropdown */}
            <div className="flex flex-col">
                <label htmlFor="status" className="text-sm font-semibold text-gray-700">Status</label>
                <div className="dropdown mt-2">
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
            <button type="submit" className="btn bg-[#67e8f9] mt-4">Update Memo</button>
        </form>
    );
};

export default EditProgressForm;

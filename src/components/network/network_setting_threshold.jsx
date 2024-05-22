'use client';

import React, { useState, useEffect } from "react";

const SettingThreshold = ({ memoId }) => {
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
            
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            <div id="dropdown" cl       ass="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
                </ul>
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

export default SettingThreshold;

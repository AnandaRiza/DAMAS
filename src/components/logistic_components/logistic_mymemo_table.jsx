// pages/my-memo.js

"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const MyMemo = () => {
    const [memos, setMemos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMemos = async () => {
            const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/logisticmemo`
                );
                const allMemos = response.data.data;
                const userMemos = allMemos.filter(
                    memo => memo.memo_pic === userid || memo.memo_createdBy === userid
                );
                setMemos(userMemos);
            } catch (error) {
                console.error("Error fetching memos:", error);
                setError("Failed to fetch memos.");
            }
        };

        fetchMemos();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Memos</h1>
            {error && <p className="text-red-600">{error}</p>}
            <ul className="space-y-4">
                {memos.map((memo) => (
                    <li key={memo.memo_num} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{memo.memo_perihal}</h2>
                        <p>PIC: {memo.memo_pic}</p>
                        <p>Department: {memo.memo_department}</p>
                        <p>Created By: {memo.memo_createdBy}</p>
                        <p>Reviewer: {memo.memo_reviewer}</p>
                        <p>Deadline: {memo.memo_deadline}</p>
                        <p>Status: {memo.memo_status}</p>
                        <p>Notes: {memo.memo_notes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyMemo;

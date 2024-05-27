import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditMemoForm = () => {
    const router = useRouter();
    const { memoId } = router.query;

    const [formData, setFormData] = useState({
        memo_num: "",
        memo_perihal: "",
        memo_pic: "",
        memo_deadline: "",
        memo_status: "",
    });

    useEffect(() => {
        if (memoId) {
            fetchMemoDetails();
        }
    }, [memoId]);

    const fetchMemoDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/getMemoByID/${memoId}`
            );
            const { data } = response.data;
            setFormData({
                memo_num: data.memo_num,
                memo_perihal: data.memo_perihal,
                memo_pic: data.memo_pic,
                memo_deadline: data.memo_deadline,
                memo_status: data.memo_status,
            });
        } catch (error) {
            console.error("Error fetching memo details:", error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memo/${memoId}`,
                formData
            );
            // Handle successful update, e.g., show success message or redirect
        } catch (error) {
            console.error("Error updating memo:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="memo_num"
                value={formData.memo_num}
                onChange={handleChange}
            />
            <input
                type="text"
                name="memo_perihal"
                value={formData.memo_perihal}
                onChange={handleChange}
            />
            <input
                type="text"
                name="memo_pic"
                value={formData.memo_pic}
                onChange={handleChange}
            />
            <input
                type="text"
                name="memo_deadline"
                value={formData.memo_deadline}
                onChange={handleChange}
            />
            <input
                type="text"
                name="memo_status"
                value={formData.memo_status}
                onChange={handleChange}
            />
            <button type="submit">Update Memo</button>
        </form>
    );
};

export default EditMemoForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const EditMemoPage = ({ memoId }) => {
    const [dataAllMemo, setDataAllMemo] = useState({
        memo_num: "",
        memo_perihal: "",
        memo_pic: "",
        memo_deadline: "",
        memo_status: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/getMemoByID/${memoId}`
                );
                setDataAllMemo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (memoId) {
            getCurrentData();
        }
    }, [memoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataAllMemo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    if (loading) {
        return <PleaseWait />;
    }

    return (
        <form className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="memo_num" className="text-sm font-semibold text-gray-600">
                    Nomor Memo
                </label>
                <input
                    type="text"
                    id="memo_num"
                    className="input input-bordered mt-1"
                    value={dataAllMemo.memo_num}
                    onChange={handleChange}
                    name="memo_num"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="memo_perihal" className="text-sm font-semibold text-gray-600">
                    Perihal Memo
                </label>
                <input
                    type="text"
                    id="memo_perihal"
                    className="input input-bordered mt-1"
                    value={dataAllMemo.memo_perihal}
                    onChange={handleChange}
                    name="memo_perihal"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="memo_pic" className="text-sm font-semibold text-gray-600">
                    Memo PIC
                </label>
                <input
                    type="text"
                    id="memo_pic"
                    className="input input-bordered mt-1"
                    value={dataAllMemo.memo_pic}
                    onChange={handleChange}
                    name="memo_pic"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="memo_status" className="text-sm font-semibold text-gray-600">
                    Status
                </label>
                <select
                    id="memo_status"
                    className="input input-bordered mt-1"
                    value={dataAllMemo.memo_status}
                    onChange={handleChange}
                    name="memo_status"
                >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Finished">Finished</option>
                    <option value="Past Deadline">Past Deadline</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
                    Deadline
                </label>
                <input
                    type="date"
                    id="memo_deadline"
                    className="input input-bordered mt-1"
                    value={dataAllMemo.memo_deadline}
                    onChange={handleChange}
                    name="memo_deadline"
                />
            </div>

            <div className="flex gap-2 items-center text-white ml-3 mt-3">
                <Link href="/main/logistic">
                    <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                        <MdOutlineCancel />
                        <span>Cancel</span>
                    </button>
                </Link>
                <button className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center">
                    <FiSave />
                    <span>Edit</span>
                </button>
            </div>
        </form>
    );
};

export default EditMemoPage;

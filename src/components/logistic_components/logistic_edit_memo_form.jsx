import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const EditMemoPage = ( ) => {
    const [dataAllMemo, setDataAllMemo] = useState({
        memo_id: "92419b6f-dbf4-4c5a-b3b9-e522cbfd4443",
        memo_num: "",
        memo_perihal: "",
        memo_pic: "",
        memo_status: "",    
        memo_deadline: "",
        maxSize: "123"
        
    });
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    useEffect(() => {
        const getCurrentData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/getMemoByID/${params.memoId}`
                );
                
                setDataAllMemo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (params.memoId) {
            getCurrentData();
        }
    }, [params.memoId]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setDataAllMemo((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    // Function to handle changes in the memo deadline input
    // const handleMemoDeadlineChange = (e) => {
    
    //     const parsedDate = parseDate(e.target.value);
        

    //     setDataAllMemo({
    //         ...dataAllMemo,
    //         memo_deadline: parsedDate,
    //     });
    // };

    // // Function to parse the date string from the input
    // const parseDate = (dateString) => {
    //     const [year, month, day] = dateString.split('-');
    //     // Reformat the date to "yyyy-MM-dd" format
    //     return `${year}-${month}-${day}`;
    // };

// const dummy = {
//     memo_id: "92419b6f-dbf4-4c5a-b3b9-e522cbfd4443",   
//     memo_num: "3012/323/21",
//     memo_perihal: "Pengadaan Barang Logistik",
//     memo_pic: "Pak Muslim",
//     memo_status: "finished",
//     memo_deadline: "04/04/2021",
    
//     maxSize: 3
//      }
    
    const handleEditedData = async () => {
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        const memoId = params.memoId;
        console.log(memoId);
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo?memoId=${memoId}`,dataAllMemo , 
                {
                    headers: {
                        "USER-ID" : userid,  

                    }
                }
            );
            console.log(response.data);
            
            alert("Edit Success");
            router.push('/main/logistic');
        } catch (error) {
            console.log(error);
        }
    };
    
    // const handleEditedData = async () => {
    //     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    //     try {
    //         const response = await axios.put(
    //             `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/editmemo/${params.memoId}`,dataAllMemo , 
    //             {
    //                 headers: {
    //                     "X-API-TOKEN" : token
    //                 }
    //             }
    //         );
    //         console.log(response.data);
    //         alert("Edit Success");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    

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
                    onChange={(e) =>
                        setDataAllMemo({
                            ...dataAllMemo,
                            memo_num: e.target.value,
                        })
                    }
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
                    onChange={(e) =>
                        setDataAllMemo({
                            ...dataAllMemo,
                            memo_perihal: e.target.value,
                        })
                    }
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
                    onChange={(e) =>
                        setDataAllMemo({
                            ...dataAllMemo,
                            memo_pic: e.target.value,
                        })
                    }
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
                    onChange={(e) =>
                        setDataAllMemo({
                            ...dataAllMemo,
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

            <div className="flex flex-col">
            <label htmlFor="memo_deadline" className="text-sm font-semibold text-gray-600">
                Deadline
            </label>
            <input
                type="text"
                id="memo_deadline"
                className="input input-bordered mt-1"
                value={dataAllMemo.memo_deadline}
                onChange={(e) => setDataAllMemo({
                    ...dataAllMemo,
                    memo_deadline: e.target.value,
                })} 
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
                <button
                        type="button"
                            className="py-2 px-4 rounded-xl bg-blue-500 flex gap-1 items-center"
                            onClick={handleEditedData}
                        >
                            <FiSave />
                            <span>Edit</span>
                        </button>
            </div>
        </form>
    );
};

export default EditMemoPage;

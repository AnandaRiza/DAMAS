"use client";

import { useStateContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PpoForm = () => {

    const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

    const {user}  = useStateContext();

    const [dataAllPic, setDataAllPic] = useState(null);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedUserDomain, setSelectedUserDomain] = useState("");
    const [scheduleInput, setScheduleInput] = useState("");
    const router = useRouter();

    // State to manage form data
    const [formData, setFormData] = useState({
        projectname: "",
        pic: "",
        departement:"",
        kickoffstart: "",
        kickoffdeadline: "",
        kickoffdone: "",
        userrequirementstart: "",
        userrequirementdeadline: "",
        userrequirementdone: "",
        applicationdevelopmentstart: "",
        applicationdevelopmentdeadline: "",
        applicationdevelopmentdone: "",
        sitstart: "",
        sitdeadline: "",
        sitdone: "",
        uatstart: "",
        uatdeadline: "",
        uatdone: "",
        implementationpreparestart: "",
        implementationpreparedeadline: "",
        implementationpreparedone: "",
        implementationmeetingstart: "",
        implementationmeetingdeadline: "",
        implementationmeetingdone: "",
        implementationstart: "",
        implementationdeadline: "",
        implementationdone: "",
        postimplementationreviewstart: "",
        postimplementationreviewdeadline: "",
        postimplementationreviewdone: "",
        status: "",
        deadlineproject: "",
        userdomain:"",
        userdomainpic: "",
        createdby: "",
    });

    const [dataEmail, setdataEmail] = useState({
        to: "",
        subject: "Deadline Project is Due Tomorrow",
        deadline: "",
        deadlinepro: "",
    });
  
    

    const getDataAllPic = async () => {
        setDataAllPic(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
            );
            setDataAllPic(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataAllPic();
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
    }, []);

    const handleSubmit = async () => {
        try {
           
            await axios.post( `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/projectdev`,
            {
                ...formData,
                createdby: userid,
                userdomain: user.userdomain,
                deadlineproject: calculateDeadline(scheduleInput)
                
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "USER-ID": userid,
                },
            }
            
        );
         // console.log(calculateDeadline(formData.deadlineproject))
         await axios.post( `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/schedulesend-email`,
            {
                ...dataEmail,
                text: `Assalamualaikum Warahmatullahi Wabarakatuh,
            
                Yth. Bapak/Ibu,
                
                Bersama ini kami memberitahukan bahwa deadline project tinggal 1 hari lagi dengan detail project:
                
                Nama Project: ${formData.projectname}
                PIC         : ${formData.pic}
                Departement : ${formData.departement}
                Deadline    : ${calculateDeadline(scheduleInput)}
                Website     : http://localhost:3000/main
                
                Mohon pastikan semua persiapan dan tahapan terakhir telah diselesaikan untuk memastikan proyek selesai tepat waktu. Terima Kasih.
                
Wassalamualaikum Warahmatullahi Wabarakatuh`,
                to: "ananda_riza@bcasyariah.co.id",
                deadline: calculateDeadline(scheduleInput),
                deadlinepro: calculateDeadline(scheduleInput),
            },
        );
        router.push("/main/ppo")
        // console.log(createdby)
        } catch (error) {
            console.log(error);
            alert("Create Project Failed!");
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

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl">
            <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">

            <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} className="space-y-4 ">
            <div className="flex flex-col">
                <label
                    htmlFor="namaproject"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Project Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="namaproject"
                    name="namaproject"
                    required
                    value={formData.projectname}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            projectname: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="pic"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    PIC <span className="text-red-500">*</span>
                </label>
                {dataAllPic && (
                    <select
                        name="pic"
                        required
                        id="pic"
                        className="input input-bordered mt-1"
                        value={formData.nama}
                        onChange={(e) => {
                            const selectedPic = JSON.parse(e.target.value);
                            setFormData({ ...formData, pic: selectedPic.nama, departement:selectedPic.departemen, userdomainpic:selectedPic.userdomain});
                            setSelectedDept(selectedPic.departemen)
                            setSelectedUserDomain(selectedPic.userdomain)
                        }
                        }
                    >
                        <option
                            disabled
                            selected
                            className="text-sm text-gray-600 opacity-50"
                        >
                            Select PIC...
                        </option>
                        {dataAllPic.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>
                                    {item.nama}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="departemen"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Departement
                </label>
                <input 
                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                type="text" 
                value={selectedDept} disabled />
            </div>

            {/* <div className="flex flex-col">
                <label
                    htmlFor="departemen"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Userdomain pic
                </label>
                <input 
                className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                type="text" 
                value={selectedUserDomain} disabled />
            </div> */}

            <div className="flex flex-col">
                <label
                    htmlFor="kickoffstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Kick Off Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="kickoffstart"
                    name="kickoffstart"
                    value={formData.kickoffstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="kickoffdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Kick Off Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="kickoffdeadline"
                    name="kickoffdeadline"
                    required
                    value={formData.kickoffdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            kickoffdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="userrequirementstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    User Requierement Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="userrequirementstart"
                    name="userrequirementstart"
                    required
                    value={formData.userrequirementstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            userrequirementstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="userrequirementdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    User Requierement Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="userrequirementdeadline"
                    name="userrequirementdeadline"
                    required
                    value={formData.userrequirementdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            userrequirementdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopmentstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Application Development Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="applicationdevelopmentstart"
                    name="applicationdevelopmentstart"
                    required
                    value={formData.applicationdevelopmentstart}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationdevelopmentstart: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="applicationdevelopmentdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Application Development Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="applicationdevelopmentdeadline"
                    name="applicationdevelopmentdeadline"
                    required
                    value={formData.applicationdevelopmentdeadline}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationdevelopmentdeadline: e.target.value,
                        })
                    }
                    className="input input-bordered mt-1"
                    
                />
            </div>
        
            <div className="flex flex-col">
                <label
                    htmlFor="sitstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    SIT Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="sitstart"
                    name="sitstart"
                    required
                    value={formData.sitstart}
                    onChange={(e) =>
                        setFormData({ ...formData, sitstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="sitdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    SIT Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="sitdeadline"
                    name="sitdeadline"
                    required
                    value={formData.sitdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, sitdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="uatstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    UAT Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="uatstart"
                    name="uatstart"
                    required
                    value={formData.uatstart}
                    onChange={(e) =>
                        setFormData({ ...formData, uatstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="uatdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    UAT Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="uatdeadline"
                    name="uatdeadline"
                    required
                    value={formData.uatdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, uatdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationpreparestart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Prepare Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationpreparestart"
                    name="implementationpreparestart"
                    required
                    value={formData.implementationpreparestart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationpreparestart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationpreparedeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Prepare Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationpreparedeadline"
                    name="implementationpreparedeadline"
                    required
                    value={formData.implementationpreparedeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationpreparedeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationmeetingstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Meeting Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationmeetingstart"
                    name="implementationmeetingstart"
                    required
                    value={formData.implementationmeetingstart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeetingstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationmeetingdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Meeting Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationmeetingdeadline"
                    name="implementationmeetingdeadline"
                    required
                    value={formData.implementationmeetingdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationmeetingdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationstart"
                    name="implementationstart"
                    required
                    value={formData.implementationstart}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="implementationdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Implementation Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="implementationdeadline"
                    name="implementationdeadline"
                    required
                    value={formData.implementationdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, implementationdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreviewstart"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Post Implementation Review Start <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="postimplementationreviewstart"
                    name="postimplementationreviewstart"
                    required
                    value={formData.postimplementationreviewstart}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreviewstart: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="postimplementationreviewdeadline"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Post Implementation Review Deadline <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="postimplementationreviewdeadline"
                    name="postimplementationreviewdeadline"
                    required
                    value={formData.postimplementationreviewdeadline}
                    onChange={(e) =>
                        setFormData({ ...formData, postimplementationreviewdeadline: e.target.value })
                    }
                    className="input input-bordered mt-1"
                />
            </div>
            {/* Status dropdown */}
            <div className="flex flex-col">
                <label
                    htmlFor="status"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Status <span className="text-red-500">*</span>
                </label>
                <div className="dropdown mt-1 ">
                    <div tabIndex={0} role="button" className="btn m-1 w-52 bg-white hover:bg-gray text-gray-600">
                        {formData.status ? formData.status : "Select Status"}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 mb-4"
                    >
                        <li>
                            <a
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        status: "Ongoing",
                                    })
                                }
                            >
                                Ongoing
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        status: "Finished",
                                    })
                                }
                            >
                                Finished
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        status: "Past-Deadline",
                                    })
                                }
                            >
                                Past Deadline
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="deadlineproject"
                    className="text-sm font-semibold text-[#0066AE]"
                >
                    Deadline Project <span className="text-red-500">*</span>
                </label>
                <input
                     type="datetime-local"
                     id="deadlineproject"
                     name="deadlineproject"
                     required
                     value={scheduleInput}
                     min={getMinDateTime()}
                     onChange={(e) =>
                         setScheduleInput(e.target.value)
                     }
                     className="input input-bordered mt-1"
                 />
             </div>
            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-primary mt-4"
                
            >
                Create Project
            </button>
        </form>
            </div>
            
        </div>
       
    );
};

export default PpoForm;

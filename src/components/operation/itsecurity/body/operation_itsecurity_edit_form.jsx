'use client';

import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const page = () => {

  const params = useParams();
  const [selectedDept, setSelectedDept] = useState("");
  const [dataAllPic, setDataAllPic] = useState(null);
  const [dataAllItsecurity, setDataAllItsecurity] = useState({
    Itsecurity_perihal: "",
    Itsecurity_pic: "",
    departement: "",
    Itsecurity_deadline: "",
    Itsecurity_status: "",
  });
  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/itsecurityshow/getitsecurity?input=${params.itsecurity_id}`
        );
        setDataAllItsecurity(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllPic();
    console.log(dataAllItsecurity);
    getCurrentData();
  }, [params.itsecurity_id]);

  const getDataAllPic = async () => {
    setDataAllPic(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/bcas-sdmdev/users`
      );
      setDataAllPic(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditedData = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/itsecurityshow/editeditsecurity?input=${params.itsecurity_id}`,
        dataAllItsecurity
      );
      console.log(response.data);
      alert("Edit Success");
    } catch (error) {
      console.log(error);
    }
  };

return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl ">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <div className="space-y">
          {dataAllItsecurity ? (
            <form className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="perihal"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Nama Project
                </label>
                <input
                  type="text"
                  value={dataAllItsecurity.itsecurity_perihal}
                  onChange={(e) =>
                    setDataAllItsecurity({
                      ...dataAllItsecurity,
                      itsecurity_perihal: e.target.value,
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
                  PIC
                </label>
                {dataAllPic && (
                  <select
                    type="text"
                    className="input input-bordered mt-1"
                    value={dataAllItsecurity.name}
                    onChange={(e) => {
                      const selectedPic = JSON.parse(e.target.value);
                      dataAllItsecurity({
                        ...dataAllProject,
                        itsecurity_pic: selectedPic.nama,
                        departement: selectedPic.departemen,
                      });
                      setSelectedDept(selectedPic.departemen);
                    }}
                  >
                    <option
                      // disabled
                      // selected
                      className="text-sm text-gray-600 opacity-50"
                      value={dataAllItsecurity.itsecurity_pic}
                    >
                      {dataAllItsecurity.itsecurity_pic}
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
                  Departemen
                </label>
                <input
                  className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                  type="text"
                  value={selectedDept}
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 1
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 1
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase1}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase1: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 1 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase1_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase1_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 1 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase1_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase1_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 1 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase1_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase1_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 2
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 2
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase2}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase2: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 2 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase2_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase2_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 2 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase2_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase2_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 2 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase2_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase2_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 3
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 3
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase3}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase3: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 3 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase3_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase3_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 3 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase3_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase3_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 3 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase3_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase3_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 4
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 4
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase4}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase4: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 4 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase4_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase4_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 4 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase4_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase4_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 4 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase4_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase4_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 5
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 5
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase5}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase5: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 5 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase5_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase5_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 5 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase5_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase5_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 5 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase5_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase5_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 6
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 6
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase6}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase6: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 6 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase6_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase6_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 6 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase6_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase6_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 6 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase6_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase6_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Phase 7
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 7
                    </label>
                    <input
                      type="text"
                      value={dataAllItsecurity.itsecurity_phase7}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase7: e.target.value,
                        })
                      }
                      disabled
                      className="input input-bordered mt-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 7 Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase7_start}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase7_start: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 7 Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllItsecurity.itsecurity_phase7_deadline}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase7_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Phase 7 Done
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1"
                      value={dataAllItsecurity.itsecurity_phase7_done}
                      onChange={(e) =>
                        setDataAllItsecurity({
                          ...dataAllItsecurity,
                          itsecurity_phase7_done: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Deadline Project
                </label>
                <input
                  type="date"
                  className="input input-bordered mt-1"
                  value={dataAllItsecurity.itsecurity_deadline_project}
                  onChange={(e) =>
                    setDataAllItsecurity({
                      ...dataAllItsecurity,
                      itsecurity_deadline_project: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col">
                        <label
                            htmlFor="deadline"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Deadline Project
                        </label>
                        <input
                            type="date"
                            className="input input-bordered mt-1"
                            value={dataAllItsecurity.Itsecurity_deadline_project}
                            onChange={(e) =>
                                setDataAllItsecurity({
                                    ...dataAllItsecurity,
                                    Itsecurity_deadline_project: e.target.value,
                                })
                            }
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label
                            htmlFor="status"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            Status
                        </label>
                        <div className="dropdown mt-1">
                            <div tabIndex={0} role="button" className="btn m-1">
                                {dataAllItsecurity.Itsecurity_status}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                            >
                                <li>
                                    <a
                                        onClick={(e) =>
                                            setDataAllItsecurity({
                                                ...dataAllItsecurity,
                                                Itsecurity_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllItsecurity({
                                                ...dataAllItsecurity,
                                                Itsecurity_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Finished">
                                            Finished
                                        </option>
                                    </a>
                                    <a
                                        onClick={(e) =>
                                            setDataAllItsecurity({
                                                ...dataAllItsecurity,
                                                Itsecurity_status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Past Deadline">
                                            Past Deadline
                                        </option>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
              <div className="flex gap-2 items-center text-white ml-3 mt-3">
                <Link href="/main/operation/datacenter/allprogress">
                  <button className="py-2 px-4 rounded-xl bg-red-400 flex gap-1 items-center">
                    <MdOutlineCancel />
                    <span>Cancel</span>
                  </button>
                </Link>
                <button
                  type="button"
                  className="py-2 px-4 rounded-xl bg-green-500 flex gap-1 items-center"
                  onClick={handleEditedData}
                >
                  <FiSave />
                  <span>Edit</span>
                </button>
              </div>
            </form>
          ) : (
            <PleaseWait />
          )}
        </div>
      </div>
    </div>
);
};

export default page;

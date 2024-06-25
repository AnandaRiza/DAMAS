"use client";

import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const page = () => {
  const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

const params = useParams();
const router = useRouter();
  const [selectedDept, setSelectedDept] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllPic, setDataAllPic] = useState(null);
  const [dataAllItsupport, setDataAllItsupport] = useState({
    itsupport_id: "",
    itsupport_perihal: "",
    itsupport_pic: "",
    departement: "",
    itsupport_deadline: "",
    itsupport_status: "",
  });

  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/itsupportshow/getitsupport?input=${params.itsupport_id}`
        );
        setDataAllItsupport(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllPic();
    console.log(dataAllItsupport);
    getCurrentData();
  }, [params.itsupport_id]);

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
    if (
      dataAllItsupport.itsupport_status === "Finished" &&
      !dataAllItsupport.itsupport_project_done
    ) {
      alert("Please fill in Project Finished date.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/operationitsupport/log`,
        {
          ...dataAllItsupport,
          submitter: userid,
          authorizer: "Kadev",
          submitAt: "123",
          deadline: "123",
          status_approvement: "PENDING",
          itsupport_id: dataAllItsupport.itsupport_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "USER-ID": userid,
          },
        }
      );
      router.push("/main/operation");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl ">
    <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
      <div className="space-y">
        {dataAllItsupport ? (
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
                value={dataAllItsupport.itsupport_perihal}
                onChange={(e) =>
                  setDataAllItsupport({
                    ...dataAllItsupport,
                    itsupport_perihal: e.target.value,
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
                  value={dataAllItsupport.name}
                  onChange={(e) => {
                    const selectedPic = JSON.parse(e.target.value);
                    dataAllItsupport({
                      ...dataAllProject,
                      itsupport_pic: selectedPic.nama,
                      departement: selectedPic.departemen,
                    });
                    setSelectedDept(selectedPic.departemen);
                  }}
                >
                  <option
                    // disabled
                    // selected
                    className="text-sm text-gray-600 opacity-50"
                    value={dataAllItsupport.itsupport_pic}
                  >
                    {dataAllItsupport.itsupport_pic}
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
                    value={dataAllItsupport.itsupport_phase1}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase1: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase1_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase1_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase1_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase1_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase1_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase1_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase2}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase2: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase2_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase2_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase2_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase2_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase2_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase2_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase3}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase3: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase3_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase3_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase3_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase3_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase3_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase3_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase4}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase4: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase4_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase4_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase4_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase4_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase4_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase4_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase5}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase5: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase5_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase5_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase5_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase5_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase5_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase5_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase6}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase6: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase6_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase6_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase6_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase6_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase6_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase6_done: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase7}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase7: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase7_start}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase7_start: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase7_deadline}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase7_deadline: e.target.value,
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
                    value={dataAllItsupport.itsupport_phase7_done}
                    onChange={(e) =>
                      setDataAllItsupport({
                        ...dataAllItsupport,
                        itsupport_phase7_done: e.target.value,
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
                value={dataAllItsupport.itsupport_deadline_project}
                onChange={(e) =>
                  setDataAllItsupport({
                    ...dataAllItsupport,
                    itsupport_deadline_project: e.target.value,
                  })
                }
                disabled
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
                  {dataAllItsupport.itsupport_status}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                >
                  <li>
                    <a
                      onClick={(e) =>
                        setDataAllItsupport({
                          ...dataAllItsupport,
                          itsupport_status: e.target.value,
                        })
                      }
                    >
                      <option value="Ongoing">Ongoing</option>
                    </a>
                    <a
                      onClick={(e) =>
                        setDataAllItsupport({
                          ...dataAllItsupport,
                          itsupport_status: e.target.value,
                        })
                      }
                    >
                      <option value="Finished">Finished</option>
                    </a>
                    <a
                      onClick={(e) =>
                        setDataAllItsupport({
                          ...dataAllItsupport,
                          itsupport_status: e.target.value,
                        })
                      }
                    >
                      <option value="Past Deadline">Past Deadline</option>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
                <label
                  htmlFor="projectdone"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Project Finished
                </label>
                <input
                  type="date"
                  id="projectdone"
                  name="projectdone"
                  value={dataAllItsupport.itsupport_project_done}
                  onChange={(e) =>
                    setDataAllItsupport({
                      ...dataAllItsupport,
                      itsupport_project_done: e.target.value,
                    })
                  }
                  className="input input-bordered mt-1"
                  required={dataAllItsupport.itsupport_status === "Finished"}
                />
              </div>

            <div className="flex gap-2 items-center text-white ml-3 mt-3">
              <Link href="/main/operation/itsupport/allprogress">
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

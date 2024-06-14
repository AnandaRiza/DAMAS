'use client';

import axios from "axios";
import React, { useState, useEffect } from "react";
import { DiVim } from "react-icons/di";

const page = () => {

const [dataAllPic, setDataAllPic] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [formData, setFormData] = useState({
    server_perihal: "",
    server_pic: "",
    server_deadline: "",
    server_status: "",
  });

  const [showPhase, setShowPhase] = useState(0);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8081/api/operationitsupport", formData);
      alert("Create Project Success");
    } catch (error) {
      console.log(error);
      alert("Create Project Failed!");
    }
  };

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
  }, []);

return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl">
      <div>
        <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
          <form className="space-y-4">
            {/* Input fields for memo attributes */}
            <div className="flex flex-col">
              <label
                htmlFor="namaproject"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Nama Project
              </label>
              <input
                type="text"
                id="namaproject"
                name="namaproject"
                value={formData.itsupport_perihal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                  name="pic"
                  id="pic"
                  className="input input-bordered mt-1"
                  value={formData.nama}
                  onChange={(e) => {
                    const selectedPic = JSON.parse(e.target.value);
                    setFormData({
                      ...formData,
                      itsupport_pic: selectedPic.nama,
                      departement: selectedPic.departemen,
                    });
                    setSelectedDept(selectedPic.departemen);
                  }}
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
                value={selectedDept}
                disabled
              />
            </div>

            {showPhase <= 0 && (
              <button
                type="button"
                className="btn btn-warning mt-4 border border-gray"
                onClick={() => setShowPhase(1)}
              >
                <div className=" text-black">Tambah Phase</div>
              </button>
            )}

            {showPhase >= 1 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 1
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase1: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase1_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase1_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase1_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase1_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase1_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase1_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 1 && (
                  <button
                    type="button"
                    className="btn btn-warning mt-4 border border-gray"
                    onClick={() => setShowPhase(2)}
                  >
                    <div className=" text-black">Tambah Phase</div>
                  </button>
                )}
              </div>
            )}

            {showPhase >= 2 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 2
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase2: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase2_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase2_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase2_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase2_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase2_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase2_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 2 && (
                    <button
                    type="button"
                    className="btn btn-warning mt-4 border border-gray"
                    onClick={() => setShowPhase(3)}
                  >
                    <div className=" text-black">Tambah Phase</div>
                  </button>
                )}
                </div>
            )}

            {showPhase >= 3 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 3
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase3: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase3_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase3_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase3_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase3_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase3_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase3_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 3 && (
                <button
                type="button"
                className="btn btn-warning mt-4 border border-gray"
                onClick={() => setShowPhase(4)}
              >
                <div className=" text-black">Tambah Phase</div>
              </button>
                )}

              </div>
            )}

            {showPhase >= 4 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 4
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase4: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase4_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase4_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase4_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase4_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase4_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase4_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 4 && (
                    <button
                  type="button"
                  className="btn btn-warning mt-4 border border-gray"
                  onClick={() => setShowPhase(5)}
                >
                  <div className=" text-black">Tambah Phase</div>
                </button>
                )}
                
              </div>
            )}

            {showPhase >= 5 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 5
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase5}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase5: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase5_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase5_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase1_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase5_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase5_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase5_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 5 && (
                    <button
                  type="button"
                  className="btn btn-warning mt-4 border border-gray"
                  onClick={() => setShowPhase(6)}
                >
                  <div className=" text-black">Tambah Phase</div>
                </button>
                )}
                
              </div>
            )}

            {showPhase >= 6 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 6
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase6}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase6: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase6_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase6_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase6_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase6_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase6_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase6_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
                {showPhase <= 6 && (
                    <button
                  type="button"
                  className="btn btn-warning mt-4 border border-gray"
                  onClick={() => setShowPhase(7)}
                >
                  <div className=" text-black">Tambah Phase</div>
                </button>
                )}
                
              </div>
            )}

            {showPhase >= 7 && (
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
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 7
                    </label>
                    <input
                      type="text"
                      id="namaphase1"
                      name="namaphase1"
                      value={formData.itsupport_phase7}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase6: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase7_start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase7_start: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase7_deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase7_deadline: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
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
                      id="deadline"
                      name="deadline"
                      value={formData.itsupport_phase7_done}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itsupport_phase7_done: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Project Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_deadline_project}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    server_deadline_project: e.target.value,
                  })
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
                Status
              </label>
              <div className="dropdown mt-1">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 w-52 bg-gray hover:bg-gray"
                >
                  {formData.server_status}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-gray-300 rounded-box w-52 mb-4"
                >
                  <li>
                    <a
                      onClick={() =>
                        setFormData({
                          ...formData,
                          server_status: "Ongoing",
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
                          server_status: "Finished",
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
                          server_status: "Past-Deadline",
                        })
                      }
                    >
                      Past Deadline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Submit button */}
            <button
              type="button"
              className="btn btn-success mt-4 border border-gray"
              onClick={handleSubmit}
            >
              <div className=" text-black">Create Project</div>
            </button>
          </form>
        </div>
      </div>
    </div>
);
};

export default page;

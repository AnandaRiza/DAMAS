"use client";

import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

  const params = useParams();
  const [selectedDept, setSelectedDept] = useState("");
  const [dataAllPic, setDataAllPic] = useState(null);
  const [dataAllDacen, setDataAllDacen] = useState({});
  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/dacenshow/getdacen?input=${params.dacen_id}`
        );
        setDataAllDacen(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllPic();
    console.log(dataAllDacen);
    getCurrentData();
  }, [params.dacen_id]);

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

  return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl ">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <div className="space-y">
          {dataAllDacen ? (
            <form className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="perihal"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Nama Project
                </label>
                <input
                  disabled
                  type="text"
                  value={dataAllDacen.dacen_perihal}
                  onChange={(e) =>
                    setDataAllDacen({
                      ...dataAllDacen,
                      dacen_perihal: e.target.value,
                    })
                  }
                  className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
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
                    disabled
                    type="text"
                    className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                    value={dataAllDacen.name}
                    onChange={(e) => {
                      const selectedPic = JSON.parse(e.target.value);
                      dataAllDacen({
                        ...dataAllProject,
                        dacen_pic: selectedPic.nama,
                        departement: selectedPic.departemen,
                      });
                      setSelectedDept(selectedPic.departemen);
                    }}
                  >
                    <option
                      // disabled
                      // selected
                      className="text-sm text-gray-600 opacity-50"
                      value={dataAllDacen.dacen_pic}
                    >
                      {dataAllDacen.dacen_pic}
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
                  disabled
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
                  <div className="flex flex-col mx-3 my-3">
                    <label
                      htmlFor="perihal"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase1}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase1: e.target.value,
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
                      Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase1_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase1_start: e.target.value,
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
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase1_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase1_deadline: e.target.value,
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
                      Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase1_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase1_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase2}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase2: e.target.value,
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
                    Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase2_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase2_start: e.target.value,
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
                    Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase2_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase2_deadline: e.target.value,
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
                    Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase2_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase2_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase3}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase3: e.target.value,
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
                    Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase3_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase3_start: e.target.value,
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
                    Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase3_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase3_deadline: e.target.value,
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
                    Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase3_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase3_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase4}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase4: e.target.value,
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
                      Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase4_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase4_start: e.target.value,
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
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase4_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase4_deadline: e.target.value,
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
                      Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase4_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase4_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase5}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase5: e.target.value,
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
                      Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase5_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase5_start: e.target.value,
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
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase5_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase5_deadline: e.target.value,
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
                       Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase5_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase5_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase6}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase6: e.target.value,
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
                     Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase6_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase6_start: e.target.value,
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
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase6_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase6_deadline: e.target.value,
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
                      Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase6_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase6_done: e.target.value,
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
                      Nama Phase 
                    </label>
                    <input
                      type="text"
                      value={dataAllDacen.dacen_phase7}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase7: e.target.value,
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
                      Start
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase7_start}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase7_start: e.target.value,
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
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllDacen.dacen_phase7_deadline}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase7_deadline: e.target.value,
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
                    Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input font-semibold input-bordered mt-1"
                      value={dataAllDacen.dacen_phase7_done}
                      onChange={(e) =>
                        setDataAllDacen({
                          ...dataAllDacen,
                          dacen_phase7_done: e.target.value,
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
                  disabled
                  type="date"
                  className="input font-semibold input-bordered mt-1"
                  value={dataAllDacen.dacen_deadline_project}
                  onChange={(e) =>
                    setDataAllDacen({
                      ...dataAllDacen,
                      dacen_deadline_project: e.target.value,
                    })
                  }
                />
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
                  value={dataAllDacen.dacen_project_done}
                  className="input input-bordered mt-1 font-semibold"
                  onChange={(e) =>
                    setDataAllDacen({
                      ...dataAllDacen,
                      dacen_project_done: e.target.value,
                    })
                  }
                  disabled
                />
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

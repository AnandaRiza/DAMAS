"use client";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const page = () => {
  const params = useParams();
  const [selectedDept, setSelectedDept] = useState("");
  const [dataAllPic, setDataAllPic] = useState(null);
  const [dataAllNetwork, setDataAllNetwork] = useState({
    network_perihal: "",
    network_pic: "",
    departement: "",
    network_deadline: "",
    network_status: "",
  });
  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow/getnetwork?input=${params.network_id}`
        );
        setDataAllNetwork(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllPic();
    console.log(dataAllNetwork);
    getCurrentData();
  }, [params.network_id]);

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
          {dataAllNetwork ? (
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
                  value={dataAllNetwork.network_perihal}
                  onChange={(e) =>
                    setDataAllNetwork({
                      ...dataAllNetwork,
                      network_perihal: e.target.value,
                    })
                  }
                  className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                />
              </div>

              {/* <div className="flex flex-col mx-3 my-3">
                        <label
                            htmlFor="pic"
                            className="text-sm font-semibold text-[#0066AE]"
                        >
                            PIC
                        </label>
                        <input
                            type="text"
                            className="input input-bordered mt-1 disabled:bg-gray-100 disabled:text-black"
                            value={dataAllNetwork.network_pic}
                            onChange={(e) =>
                                setDataAllNetwork({
                                    ...dataAllNetwork,
                                    network_pic: e.target.value,
                                })
                            }
                        />
                    </div> */}

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
                    value={dataAllNetwork.name}
                    onChange={(e) => {
                      const selectedPic = JSON.parse(e.target.value);
                      dataAllNetwork({
                        ...dataAllProject,
                        network_pic: selectedPic.nama,
                        departement: selectedPic.departemen,
                      });
                      setSelectedDept(selectedPic.departemen);
                    }}
                  >
                    <option
                      // disabled
                      // selected
                      className="text-sm text-gray-600 opacity-50"
                      value={dataAllNetwork.network_pic}
                    >
                      {dataAllNetwork.network_pic}
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
                  Kick Off
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_kickoff_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_kickoff_start: e.target.value,
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
                      value={dataAllNetwork.network_kickoff_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_kickoff_deadline: e.target.value,
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
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_kickoff_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_kickoff_done: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  MOP
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_mop_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_mop_start: e.target.value,
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
                      value={dataAllNetwork.network_mop_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_mop_deadline: e.target.value,
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
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_mop_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_mop_done: e.target.value,
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
                  DEMO MOP
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_demomop_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_demomop_start: e.target.value,
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
                      value={dataAllNetwork.network_demomop_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_demomop_deadline: e.target.value,
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
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_demomop_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_demomop_done: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold text-[#0066AE]"
                >
                  Implementasi
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_implementasi_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_implementasi_start: e.target.value,
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
                      value={dataAllNetwork.network_implementasi_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_implementasi_deadline: e.target.value,
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
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_implementasi_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_implementasi_done: e.target.value,
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
                  SK/SE
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_skse_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_skse_start: e.target.value,
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
                      value={dataAllNetwork.network_skse_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_skse_deadline: e.target.value,
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
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_skse_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_skse_done: e.target.value,
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
                  UAT
                </label>
                <div
                  className="border rounded-xl"
                  style={{ borderColor: "#DADADA" }}
                >
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
                      value={dataAllNetwork.network_uat_start}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_uat_start: e.target.value,
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
                      value={dataAllNetwork.network_uat_deadline}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_uat_deadline: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3 mx-3 my-3">
                    <label
                      htmlFor="deadline"
                      className="text-sm font-semibold text-[#0066AE]"
                    >
                      Done
                    </label>
                    <input
                      disabled
                      type="date"
                      className="input input-bordered mt-1 font-semibold"
                      value={dataAllNetwork.network_uat_done}
                      onChange={(e) =>
                        setDataAllNetwork({
                          ...dataAllNetwork,
                          network_uat_done: e.target.value,
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
                  className="input input-bordered mt-1 font-semibold"
                  value={dataAllNetwork.network_deadline_project}
                  onChange={(e) =>
                    setDataAllNetwork({
                      ...dataAllNetwork,
                      network_deadline_project: e.target.value,
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
                  value={dataAllNetwork.network_project_done}
                  className="input input-bordered mt-1 font-semibold"
                  onChange={(e) =>
                    setDataAllNetwork({
                      ...dataAllNetwork,
                      network_project_done: e.target.value,
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

"use client";

import PleaseWait from "@/components/PleaseWait";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
  const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

  const params = useParams();
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllPic, setDataAllPic] = useState(null);
  const [dataAllServer, setDataAllServer] = useState({
    server_perihal: "",
    server_pic: "",
    departement: "",
    server_deadline: "",
    server_status: "",
  });
  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/getserver?input=${params.server_id}`
        );
        setDataAllServer(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllPic();
    console.log(dataAllServer);
    getCurrentData();
  }, [params.server_id]);

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
      dataAllServer.server_status === "Finished" &&
      !dataAllServer.server_project_done
    ) {
      alert("Please fill in Project Finished date.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/operationserver/log`,
        {
          ...dataAllServer,
          submitter: userid,
          authorizer: "Kadev",
          submitAt: "123",
          deadline: "123",
          status_approvement: "PENDING",
          server_id: dataAllServer.server_id,
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
          {dataAllServer ? (
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
                  value={dataAllServer.server_perihal}
                  onChange={(e) =>
                    setDataAllServer({
                      ...dataAllServer,
                      server_perihal: e.target.value,
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
                    value={dataAllServer.name}
                    onChange={(e) => {
                      const selectedPic = JSON.parse(e.target.value);
                      dataAllServer({
                        ...dataAllProject,
                        server_pic: selectedPic.nama,
                        departement: selectedPic.departemen,
                      });
                      setSelectedDept(selectedPic.departemen);
                    }}
                  >
                    <option
                      // disabled
                      // selected
                      className="text-sm text-gray-600 opacity-50"
                      value={dataAllServer.server_pic}
                    >
                      {dataAllServer.server_pic}
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
                      value={dataAllServer.server_kickoff_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_kickoff_start: e.target.value,
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
                      value={dataAllServer.server_kickoff_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_kickoff_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_kickoff_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_kickoff_done: e.target.value,
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
                  Penyiapan Server 
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
                      value={dataAllServer.server_peyiapanserver_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_peyiapanserver_start: e.target.value,
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
                      value={dataAllServer.server_peyiapanserver_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_peyiapanserver_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_peyiapanserver_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_peyiapanserver_done: e.target.value,
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
                Instalasi Aplikasi 
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
                      value={dataAllServer.server_instalasiaplikasi_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalasiaplikasi_start: e.target.value,
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
                      value={dataAllServer.server_instalasiaplikasi_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalasiaplikasi_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_instalasiaplikasi_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalasiaplikasi_done: e.target.value,
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
                    Install Checkpoint
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
                      value={dataAllServer.server_instalcheckpoint_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalcheckpoint_start: e.target.value,
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
                      value={dataAllServer.server_instalcheckpoint_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalcheckpoint_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_instalcheckpoint_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_instalcheckpoint_done: e.target.value,
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
                   Testing Koneksi
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
                      value={dataAllServer.server_testingkoneksi_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_testingkoneksi_start: e.target.value,
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
                      value={dataAllServer.server_testingkoneksi_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_testingkoneksi_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_testingkoneksi_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_testingkoneksi_done: e.target.value,
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
                Serah Terima Server 
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
                      value={dataAllServer.server_serahterimaserver_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_serahterimaserver_start: e.target.value,
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
                      value={dataAllServer.server_serahterimaserver_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_serahterimaserver_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_serahterimaserver_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_serahterimaserver_done: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_implementasi_start}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_implementasi_start: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_implementasi_deadline}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_implementasi_deadline: e.target.value,
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
                      className="input input-bordered mt-1"
                      value={dataAllServer.server_implementasi_done}
                      onChange={(e) =>
                        setDataAllServer({
                          ...dataAllServer,
                          server_implementasi_done: e.target.value,
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
                  value={dataAllServer.server_deadline_project}
                  onChange={(e) =>
                    setDataAllServer({
                      ...dataAllServer,
                      server_deadline_project: e.target.value,
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
                    {dataAllServer.server_status}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
                  >
                    <li>
                      <a
                        onClick={(e) =>
                          setDataAllServer({
                            ...dataAllServer,
                            server_status: e.target.value,
                          })
                        }
                      >
                        <option value="Ongoing">Ongoing</option>
                      </a>
                      <a
                        onClick={(e) =>
                          setDataAllServer({
                            ...dataAllServer,
                            server_status: e.target.value,
                          })
                        }
                      >
                        <option value="Finished">Finished</option>
                      </a>
                      <a
                        onClick={(e) =>
                          setDataAllServer({
                            ...dataAllServer,
                            server_status: e.target.value,
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
                  value={dataAllServer.server_project_done}
                  onChange={(e) =>
                    setDataAllServer({
                      ...dataAllServer,
                      server_project_done: e.target.value,
                    })
                  }
                  className="input input-bordered mt-1"
                  required={setDataAllServer.server_status === "Finished"}
                />
              </div>

              <div className="flex gap-2 items-center text-white ml-3 mt-3">
                <Link href="/main/operation/server/allserver">
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

export default Page;

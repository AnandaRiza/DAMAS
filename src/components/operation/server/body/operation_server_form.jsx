"use client";

import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DiVim } from "react-icons/di";

const Page = () => {
  const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

  const { user } = useStateContext();

  const [dataAllPic, setDataAllPic] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedUserDomain, setSelectedUserDomain] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    server_perihal: "",
    server_pic: "",
    server_deadline: "",
    server_status: "",
    createdBy: "",
    userdomain: "",
    userdomain_pic: "",
  });
  
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/operationserver`,
        {
          ...formData,
          createdBy: userid,
          userdomain: user.userdomain,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "USER-ID": userid,
          },
        }
      );
      router.push("/main/operation/server/allserver");
      // console.log(createdby)
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
    const userid = document.cookie
      .split("; ")
      .find((row) => row.startsWith("DAMAS-USERID="))
      ?.split("=")[1];
  }, []);

  return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl">
      <div>
        <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
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
                value={formData.server_perihal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                  name="pic"
                  id="pic"
                  className="input input-bordered mt-1"
                  value={formData.nama}
                  onChange={(e) => {
                    const selectedPic = JSON.parse(e.target.value);
                    setFormData({
                      ...formData,
                      server_pic: selectedPic.nama,
                      departement: selectedPic.departemen,
                      userdomain_pic: selectedPic.userdomain,
                    });
                    setSelectedDept(selectedPic.departemen);
                    setSelectedUserDomain(selectedPic.userdomain);
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_kickoff_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_kickoff_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_kickoff_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_kickoff_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Kick Off Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_kickoff_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_kickoff_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_peyiapanserver_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_peyiapanserver_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_peyiapanserver_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_peyiapanserver_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Penyiapan Server Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_peyiapanserver_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_peyiapanserver_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_instalasiaplikasi_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_instalasiaplikasi_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_instalasiaplikasi_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_instalasiaplikasi_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Instalasi Aplikasi Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_instalasiaplikasi_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_instalasiaplikasi_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_instalcheckpoint_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_instalcheckpoint_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_instalcheckpoint_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_instalcheckpoint_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Install Checkpoint Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_instalcheckpoint_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_instalcheckpoint_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_testingkoneksi_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_testingkoneksi_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_testingkoneksi_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_testingkoneksi_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Testing Koneksi Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_testingkoneksi_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_testingkoneksi_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_serahterimaserver_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_serahterimaserver_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_serahterimaserver_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_serahterimaserver_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>

                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Serah Terima Server Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_serahterimaserver_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_serahterimaserver_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
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
                    id="deadline"
                    name="deadline"
                    value={formData.server_implementasi_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_implementasi_start: e.target.value,
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.server_implementasi_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        server_implementasi_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>

                {/* <div className="flex flex-col">
            <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
            >
                Implementasi Done
            </label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.server_implementasi_done}
                onChange={(e) =>
                    setFormData({ ...formData, server_implementasi_done: e.target.value })
                }
                className="input input-bordered mt-1"
            />
        </div> */}
              </div>
            </div>

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
                Status <span className="text-red-500">*</span>
              </label>
              <div className="dropdown mt-1 ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 w-52 bg-white hover:bg-gray text-gray-600"
                >
                  {formData.server_status
                    ? formData.server_status
                    : "Select Status"}
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
              type="submit"
              className="btn btn-success mt-4 border border-gray"
            >
              <div className=" text-black">Create Project</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

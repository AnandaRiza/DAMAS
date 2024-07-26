"use client";

import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";

const NetworkForm = () => {
  const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("DAMAS-USERID="))
    ?.split("=")[1];

  const { user } = useStateContext();

  // State to manage form data
  const [dataAllPic, setDataAllPic] = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedUserDomain, setSelectedUserDomain] = useState("");
  const [scheduleInput, setScheduleInput] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    network_perihal: "",
    network_description: "",
    network_pic: "",
    network_deadline: "",
    network_status: "",
    createdBy: "",
    userdomain: "",
    userdomain_pic: "",
    network_deadline_project: "",
    network_category: "",
    network_category_others: "",
  });

  const handleCategorySelect = (category) => {
    if (category === "Others") {
      setFormData({
        ...formData,
        network_category: category,
        network_category_others: "", // Clear others field when Others is selected
      });
    } else {
      setFormData({
        ...formData,
        network_category: category,
      });
    }
  };

  const [dataEmail, setdataEmail] = useState({
    to: "",
    subject: "Deadline Project is Due Tomorrow",
    deadline: "",
    deadlinepro: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/operationnetwork`,
        {
          ...formData,
          createdBy: userid,
          userdomain: user.userdomain,
          network_deadline_project: Deadlinereal(scheduleInput),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "USER-ID": userid,
          },
        }
      );
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/schedulesend-email`,
        {
          ...dataEmail,
          text: `Assalamualaikum Warahmatullahi Wabarakatuh,
    
            Yth. Bapak/Ibu,
            
            Bersama ini kami memberitahukan bahwa deadline project tinggal 1 hari lagi dengan detail project:
            
            Peihal      : ${formData.network_perihal}
            PIC         : ${formData.network_pic}
            Departement : ${formData.departement}
            Deadline    : ${calculateDeadline(scheduleInput)}
            Website     : http://localhost:3000/main
            
            Mohon pastikan semua persiapan dan tahapan terakhir telah diselesaikan untuk memastikan proyek selesai tepat waktu. Terima Kasih.
            
Wassalamualaikum Warahmatullahi Wabarakatuh`,
          to: "ridhwan_rifky@bcasyariah.co.id",
          deadline: calculateDeadline(scheduleInput),
          deadlinepro: calculateDeadline(scheduleInput),
        }
      );
      router.push("/main/operation/general/allproject");
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

  const Deadlinereal = (date) => {
    const d = new Date(date);

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
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white">
      <div className="rounded-xl border border-gray-300">
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
                Nama Project <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="namaproject"
                name="namaproject"
                required
                value={formData.network_perihal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    network_perihal: e.target.value,
                  })
                }
                className="input input-bordered mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="namaproject"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                id="namaproject"
                name="namaproject"
                required
                value={formData.network_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    network_description: e.target.value,
                  })
                }
                className="textarea textarea-bordered mt-1"
              ></textarea>
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
                    setFormData({
                      ...formData,
                      network_pic: selectedPic.nama,
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
                htmlFor="status"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div
                className="border rounded-xl"
                style={{ borderColor: "#DADADA" }}
              >
                <div className="flex flex-col">
                  <div className="dropdown mt-1 mx-3 my-3">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 w-52 bg-white hover:bg-gray text-gray-600"
                    >
                      {formData.network_category
                        ? formData.network_category
                        : "Select Category"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 mb-4"
                    >
                      <li>
                        <a
                          onClick={() =>
                            handleCategorySelect("Jaringan Cabang")
                          }
                        >
                          Jaringan Cabang
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            handleCategorySelect("Jaringan Kantor Pusat")
                          }
                        >
                          Jaringan Kantor Pusat
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleCategorySelect("Jaringan DRC")}>
                          Jaringan DRC
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleCategorySelect("Cloud")}>
                          Cloud
                        </a>
                      </li>
                      <hr className="my-1 border-gray-300" />
                      <li>
                        <a onClick={() => handleCategorySelect("Others")}>
                          Others
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Conditional rendering of Others input */}
                {formData.network_category === "Others" && (
                  <div className="flex flex-col">
                    <label
                      htmlFor="namaproject"
                      className="text-sm font-semibold text-[#0066AE] mx-3 my-3"
                    >
                      Enter Category
                    </label>
                    <input
                      type="text"
                      id="namaproject"
                      name="namaproject"
                      value={formData.network_category_others}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          network_category_others: e.target.value,
                        })
                      }
                      className="input input-bordered mt-1 mx-3 my-3"
                    />
                  </div>
                )}
              </div>
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
                    Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_kickoff_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_kickoff_start: e.target.value,
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
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_kickoff_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_kickoff_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
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
                    Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_mop_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_mop_start: e.target.value,
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
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_mop_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_mop_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
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
                    Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_demomop_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_demomop_start: e.target.value,
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
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_demomop_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_demomop_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
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
                    Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_implementasi_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_implementasi_start: e.target.value,
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
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_implementasi_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_implementasi_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Memo / SK/SE
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
                    value={formData.network_skse_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_skse_start: e.target.value,
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
                    value={formData.network_skse_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_skse_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
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
                    Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_uat_start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_uat_start: e.target.value,
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
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.network_uat_deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        network_uat_deadline: e.target.value,
                      })
                    }
                    className="input input-bordered mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="network_deadline_project"
                className="text-sm font-semibold text-[#0066AE]"
              >
                Project Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="network_deadline_project"
                name="network_deadline_project"
                required
                value={scheduleInput}
                min={getMinDateTime()}
                onChange={(e) => setScheduleInput(e.target.value)}
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
                  {formData.network_status
                    ? formData.network_status
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
                          network_status: "Ongoing",
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
                          network_status: "Finished",
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
                          network_status: "Past-Deadline",
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

export default NetworkForm;

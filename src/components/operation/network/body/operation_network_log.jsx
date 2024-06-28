"use client";
import axios from "axios";
import React from "react";
import { FiCheckSquare, FiXSquare } from "react-icons/fi";

const Page = ({ headers, data, parameter, action, isRefresh }) => {
  const getDisplayName = (header) => {
    const displayNames = {
      submitter: "Submitter",
      authorizer: "Authorizer",
      submit_at: "Submit At",
      deadline_approvement: " Deadline Approvement",
      status_approvement: "Status Approvement",
      network_perihal: "Project Name",
      network_pic: "PIC",
      departement: "Departement",
      network_kickoff_start: "Kick Off Start",
      network_kickoff_deadline: "Kick Off Deadline",
      network_kickoff_done: "Kick off Done",
      network_mop_start: "MOP Start",
      network_mop_deadline: "MOP Deadline",
      network_mop_done: "MOP Done",
      network_demomop_start: "Demo MOP Start",
      network_demomop_deadline: "Demo MOP Deadline",
      network_demomop_done: "Demo MOP Done",
      network_implementasi_start: "Implementasi Start",
      network_implementasi_deadline: "Implementasi Deadline",
      network_implementasi_done: "Implementasi Done",
      network_skse_start: "SKSE Start",
      network_skse_deadline: "SKSE Deadline",
      network_skse_done: "UAT Done",
      network_uat_start: "UAT Start",
      network_uat_deadline: "UAT Deadline",
      network_uat_done: "UAT Done",
      network_status: "Status",
      network_deadline_project: "Project Deadline",
      createdby: "",
    };

    const displayName = displayNames[header] || header;
    // console.log(`Header: ${header}, DisplayName: ${displayName}`);
    return displayName;
  };

  const handleStatusApprove = async (id, network_status) => {
    isRefresh();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/${parameter}/log?id=${id}&network_status=${network_status}`
      );
    } catch (error) {
      console.log(error);
    }
    isRefresh();
  };
  return (
    <div className="overflow-auto mx-auto">
      <table className="text-center border-b cursor-pointer">
        <thead>
          <tr className="border-b-2 bg-[#00A6B4] text-sm">
            {action && <th className="py-2 px-4 w-32">Action</th>}
            {headers.map((item, index) => (
              <th
                key={index}
                className={`py-3 px-6 capitalize ${
                  [
                    "id",
                    "network_id",
                    "network_kickoff_start",
                    "network_kickoff_deadline",
                    "network_kickoff_done",
                    "network_mop_start",
                    "network_mop_deadline",
                    "network_mop_done",
                    "network_demomop_start",
                    "network_demomop_deadline",
                    "network_demomop_done",
                    "network_implementasi_start",
                    "network_implementasi_deadline",
                    "network_implementasi_done",
                    "network_skse_start",
                    "network_skse_deadline",
                    "network_skse_done",
                    "network_uat_start",
                    "network_uat_deadline",
                    "network_uat_done",
                    "network_status",
                    "network_deadline_project",
                    "userdomain",
                    "userdomain_pic",
                  ].includes(item)
                    ? "hidden"
                    : ""
                }`}
              >
                {getDisplayName(item)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-black">
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-[#00A6B4]"
              } hover:bg-gray-100 text-xs leading-5`}
            >
              {action && (
                <td className="py-3 px-6 w-36 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() => handleStatusApprove(item.id, "DECLINE")}
                    disabled={
                      item.status_approvement &&
                      item.status_approvement.toUpperCase() !== "PENDING"
                    }
                    className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                      item.status_approvement &&
                      item.status_approvement.toUpperCase() !== "PENDING"
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-red-400 cursor-pointer"
                    }`}
                  >
                    <FiXSquare size={20} />
                    <p className="">Decline</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusApprove(item.id, "APPROVED")}
                    disabled={
                      item.status_approvement &&
                      item.status_approvement.toUpperCase() !== "PENDING"
                    }
                    className={`flex flex-col gap-1 items-center justify-center pt-2 ${
                      item.status_approvement &&
                      item.status_approvement.toUpperCase() !== "PENDING"
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-green-600 cursor-pointer"
                    }`}
                  >
                    <FiCheckSquare size={20} />
                    <p className="">Approve</p>
                  </button>
                </td>
              )}

              {headers.map((header, headerIndex) => (
                <td
                  key={headerIndex}
                  className={`py-3 px-6 ${
                    [
                      "id",
                      "network_id",
                      "network_kickoff_start",
                      "network_kickoff_deadline",
                      "network_kickoff_done",
                      "network_mop_start",
                      "network_mop_deadline",
                      "network_mop_done",
                      "network_demomop_start",
                      "network_demomop_deadline",
                      "network_demomop_done",
                      "network_implementasi_start",
                      "network_implementasi_deadline",
                      "network_implementasi_done",
                      "network_skse_start",
                      "network_skse_deadline",
                      "network_skse_done",
                      "network_uat_start",
                      "network_uat_deadline",
                      "network_uat_done",
                      "network_status",
                      "network_deadline_project",
                      "userdomain",
                      "userdomain_pic",
                    ].includes(header)
                      ? "hidden"
                      : ""
                  }`}
                >
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;

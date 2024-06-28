"use client";
import {
  IsDacenOperator,
  IsDevOperator,
  IsItmoOperator,
  IsItsecurityOperator,
  IsItsupportOperator,
  IsLogisticOperator,
  IsNetworkOperator,
  IsOperator,
  IsPpoOperator,
  IsServerOperator,
  IsSkseOperator,
} from "@/validation/validateGroupAkses";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const NetworkForm = ({ headers, data, action, link }) => {
  const router = useRouter();

  const handleEdit = (network_id) => {
    const updatedData = data.map((item) => {
      if (item.network_id === network_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${network_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (network_id) => {
    router.push(`${link}/detail/${network_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
      network_id: "Network ID",
      network_perihal: "Nama Project",
      network_pic: "PIC",
      network_kickoff_start: "Kick Off Start",
      network_kickoff_deadline: "Kick Off Deadline",
      network_kickoff_done: " Kikck Off Done",
      network_mop_start: "MOP Start",
      network_mop_deadline: "MOP Deadline",
      network_mop_done: "MOP Dne",
      network_demomop_start: "Demo MOP Start",
      network_demomop_deadline: "Demo MOP Deadline",
      network_demomop_done: "Demo MOP Done",
      network_implementasi_start: "Implementasi Start",
      network_implementasi_deadline: "Impplementasi Deadline",
      network_implementasi_done: "implementasi_done",
      network_skse_start: "SKSE start",
      network_skse_deadline: "SKSE deadline",
      network_skse_done: "SKSE done",
      network_uat_start: "UAT start",
      network_uat_deadline: "UAT deadline",
      network_uat_done: "UAT done",
      network_status: "Status",
      network_deadline_project: "Deadline Project",
      network_project_done: "Project Done",
    };
    return displayNames[header] || header;
  };

  const getStatus = (item) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

      return daysLeft;
    };

    const { network_status } = item;

    if (network_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.network_deadline_project);

    if (daysLeft < 0) {
      return "Past Deadline";
    } else if (daysLeft <= 3) {
      return "Within 3 days";
    } else if (daysLeft <= 7) {
      return "Within 7 days";
    } else {
      return "Ongoing";
    }
  };

  const rowClass = (inputDate, network_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (network_status === "Finished") {
      return "bg-green-200 hover:bg-green-300";
    }

    const daysLeft = calculateTimeLeft(inputDate);

    if (daysLeft <= 3) {
      return "bg-red-200 hover:bg-red-300";
    } else if (daysLeft <= 7) {
      return "bg-yellow-200 hover:bg-yellow-300";
    } else {
      return "bg-white-200 hover:bg-gray-300";
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    const classA = rowClass(a.network_deadline_project, a.network_status);
    const classB = rowClass(b.network_deadline_project, b.network_status);

    const aIsFinished = a.network_status === "Finished";
    const bIsFinished = b.network_status === "Finished";

    if (aIsFinished && bIsFinished) {
      // Sort "Finished" items by classA and classB
      return classA.localeCompare(classB);
    }

    if (aIsFinished) {
      return 1; // Move "Finished" (a) to the bottom
    }

    if (bIsFinished) {
      return -1; // Move "Finished" (b) to the bottom
    }

    if (a.network_status === "Finished" && b.network_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.network_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.network_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.network_status === "Ongoing" && b.network_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.network_deadline_project) -
        new Date(b.network_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.network_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.network_status === "Ongoing") {
      return -1; // Letakkan b di atas a
    }

    // Jika keduanya tidak selesai dan tidak ada yang "Ongoing", urutkan berdasarkan classA dan classB
    return classA.localeCompare(classB);
  });

  return (
    <div className="overflow-x-auto">
      <table className="table cursor-pointer text-center ">
        <thead>
          <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm text-center uppercase">
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
            {(IsOperator() ||
              IsDevOperator() ||
              IsPpoOperator() ||
              IsSkseOperator() ||
              IsNetworkOperator() ||
              IsServerOperator() ||
              IsDacenOperator() ||
              IsItsupportOperator() ||
              IsItmoOperator() ||
              IsItsecurityOperator() ||
              IsLogisticOperator()) &&
              action && (
                <th className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                  Edit
                </th>
              )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
            const status = getStatus(item);
            const rowClassName = rowClass(item.deadlineproject, item.status);
            return (
              <tr
                key={index}
                className={`${rowClassName} text-xs leading-5`}
                onDoubleClick={() => handleDoubleClick(item.network_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
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
                    }`}>
                    {header === "status" ? status : item[header]}
                  </td>
                ))}
                {(IsOperator() ||
                  IsDevOperator() ||
                  IsPpoOperator() ||
                  IsSkseOperator() ||
                  IsNetworkOperator() ||
                  IsServerOperator() ||
                  IsDacenOperator() ||
                  IsItsupportOperator() ||
                  IsItmoOperator() ||
                  IsItsecurityOperator() ||
                  IsLogisticOperator()) &&
                  action && (
                    <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item.network_id)}
                        className="text-black-400 flex flex-col gap-1 items-center justify-center pt-2"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                    </td>
                  )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NetworkForm;

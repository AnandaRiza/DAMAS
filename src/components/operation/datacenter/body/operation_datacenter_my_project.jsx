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

const Page = ({ headers, data, action, link }) => {
  const router = useRouter();

  const handleEdit = (dacen_id) => {
    const updatedData = data.map((item) => {
      if (item.dacen_id === dacen_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${dacen_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (dacen_id) => {
    router.push(`${link}/detail/${dacen_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
        dacen_id: "Dacen ID",
        dacen_perihal: "Project Name",
        dacen_pic: "PIC",
        departement: "Departement",
        dacen_phase1: "",
        dacen_phase1_start: "",
        dacen_phase1_deadline: "",
        dacen_phase1_done: "",
        dacen_phase2: "",
        dacen_phase2_start: "",
        dacen_phase2_deadline: "",
        dacen_phase2_done: "",
        dacen_phase3: "",
        dacen_phase3_start: "",
        dacen_phase3_deadline: "",
        dacen_phase3_done: "",
        dacen_phase4: "",
        dacen_phase4_start: "",
        dacen_phase4_deadline: "",
        dacen_phase4_done: "",
        dacen_phase5: "",
        dacen_phase5_start: "",
        dacen_phase5_deadline: "",
        dacen_phase5_done: "",
        dacen_phase6: "",
        dacen_phase6_start: "",
        dacen_phase6_deadline: "",
        dacen_phase6_done: "",
        dacen_phase7: "",
        dacen_phase7_start: "",
        dacen_phase7_deadline: "",
        dacen_phase7_done: "",
        dacen_status: "Status",
        dacen_deadline_project: "Project Deadline",
        dacen_project_done: "Project Done",
        createdBy: "",
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

    const { dacen_status } = item;

    if (dacen_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.dacen_deadline_project);

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

  const rowClass = (inputDate, dacen_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (dacen_status === "Finished") {
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
    const classA = rowClass(a.dacen_deadline_project, a.dacen_status);
    const classB = rowClass(b.dacen_deadline_project, b.dacen_status);

    const aIsFinished = a.dacen_status === "Finished";
    const bIsFinished = b.dacen_status === "Finished";

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

    if (a.dacen_status === "Finished" && b.dacen_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.dacen_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.dacen_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.dacen_status === "Ongoing" && b.dacen_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.dacen_deadline_project) -
        new Date(b.dacen_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.dacen_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.dacen_status === "Ongoing") {
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
                    "dacen_id",
                    "dacen_phase1",
                    "dacen_phase1_start",
                    "dacen_phase1_deadline",
                    "dacen_phase1_done",
                    "dacen_phase2",
                    "dacen_phase2_start",
                    "dacen_phase2_deadline",
                    "dacen_phase2_done",
                    "dacen_phase3",
                    "dacen_phase3_start",
                    "dacen_phase3_deadline",
                    "dacen_phase3_done",
                    "dacen_phase4",
                    "dacen_phase4_start",
                    "dacen_phase4_deadline",
                    "dacen_phase4_done",
                    "dacen_phase5",
                    "dacen_phase5_start",
                    "dacen_phase5_deadline",
                    "dacen_phase5_done",
                    "dacen_phase6",
                    "dacen_phase6_start",
                    "dacen_phase6_deadline",
                    "dacen_phase6_done",
                    "dacen_phase7",
                    "dacen_phase7_start",
                    "dacen_phase7_deadline",
                    "dacen_phase7_done",
                    "dacen_status",
                    "dacen_deadline_project",
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
                onDoubleClick={() => handleDoubleClick(item.dacen_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
                        [
                            "id",
                            "dacen_id",
                            "dacen_phase1",
                            "dacen_phase1_start",
                            "dacen_phase1_deadline",
                            "dacen_phase1_done",
                            "dacen_phase2",
                            "dacen_phase2_start",
                            "dacen_phase2_deadline",
                            "dacen_phase2_done",
                            "dacen_phase3",
                            "dacen_phase3_start",
                            "dacen_phase3_deadline",
                            "dacen_phase3_done",
                            "dacen_phase4",
                            "dacen_phase4_start",
                            "dacen_phase4_deadline",
                            "dacen_phase4_done",
                            "dacen_phase5",
                            "dacen_phase5_start",
                            "dacen_phase5_deadline",
                            "dacen_phase5_done",
                            "dacen_phase6",
                            "dacen_phase6_start",
                            "dacen_phase6_deadline",
                            "dacen_phase6_done",
                            "dacen_phase7",
                            "dacen_phase7_start",
                            "dacen_phase7_deadline",
                            "dacen_phase7_done",
                            "dacen_status",
                            "dacen_deadline_project",
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
                        onClick={() => handleEdit(item.dacen_id)}
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

export default Page;

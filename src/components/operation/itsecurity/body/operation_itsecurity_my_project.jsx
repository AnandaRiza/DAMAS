"use client";
import {
  IsitsecurityOperator,
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

  const handleEdit = (itsecurity_id) => {
    const updatedData = data.map((item) => {
      if (item.itsecurity_id === itsecurity_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${itsecurity_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (itsecurity_id) => {
    router.push(`${link}/detail/${itsecurity_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
        itsecurity_id: "itsecurity ID",
        itsecurity_perihal: "Project Name",
        itsecurity_pic: "PIC",
        departement: "Departement",
        itsecurity_phase1: "",
        itsecurity_phase1_start: "",
        itsecurity_phase1_deadline: "",
        itsecurity_phase1_done: "",
        itsecurity_phase2: "",
        itsecurity_phase2_start: "",
        itsecurity_phase2_deadline: "",
        itsecurity_phase2_done: "",
        itsecurity_phase3: "",
        itsecurity_phase3_start: "",
        itsecurity_phase3_deadline: "",
        itsecurity_phase3_done: "",
        itsecurity_phase4: "",
        itsecurity_phase4_start: "",
        itsecurity_phase4_deadline: "",
        itsecurity_phase4_done: "",
        itsecurity_phase5: "",
        itsecurity_phase5_start: "",
        itsecurity_phase5_deadline: "",
        itsecurity_phase5_done: "",
        itsecurity_phase6: "",
        itsecurity_phase6_start: "",
        itsecurity_phase6_deadline: "",
        itsecurity_phase6_done: "",
        itsecurity_phase7: "",
        itsecurity_phase7_start: "",
        itsecurity_phase7_deadline: "",
        itsecurity_phase7_done: "",
        itsecurity_status: "Status",
        itsecurity_deadline_project: "Project Deadline",
        itsecurity_project_done: "Project Done",
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

    const { itsecurity_status } = item;

    if (itsecurity_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.itsecurity_deadline_project);

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

  const rowClass = (inputDate, itsecurity_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (itsecurity_status === "Finished") {
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
    const classA = rowClass(a.itsecurity_deadline_project, a.itsecurity_status);
    const classB = rowClass(b.itsecurity_deadline_project, b.itsecurity_status);

    const aIsFinished = a.itsecurity_status === "Finished";
    const bIsFinished = b.itsecurity_status === "Finished";

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

    if (a.itsecurity_status === "Finished" && b.itsecurity_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.itsecurity_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.itsecurity_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.itsecurity_status === "Ongoing" && b.itsecurity_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.itsecurity_deadline_project) -
        new Date(b.itsecurity_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.itsecurity_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.itsecurity_status === "Ongoing") {
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
                    "itsecurity_id",
                    "itsecurity_phase1",
                    "itsecurity_phase1_start",
                    "itsecurity_phase1_deadline",
                    "itsecurity_phase1_done",
                    "itsecurity_phase2",
                    "itsecurity_phase2_start",
                    "itsecurity_phase2_deadline",
                    "itsecurity_phase2_done",
                    "itsecurity_phase3",
                    "itsecurity_phase3_start",
                    "itsecurity_phase3_deadline",
                    "itsecurity_phase3_done",
                    "itsecurity_phase4",
                    "itsecurity_phase4_start",
                    "itsecurity_phase4_deadline",
                    "itsecurity_phase4_done",
                    "itsecurity_phase5",
                    "itsecurity_phase5_start",
                    "itsecurity_phase5_deadline",
                    "itsecurity_phase5_done",
                    "itsecurity_phase6",
                    "itsecurity_phase6_start",
                    "itsecurity_phase6_deadline",
                    "itsecurity_phase6_done",
                    "itsecurity_phase7",
                    "itsecurity_phase7_start",
                    "itsecurity_phase7_deadline",
                    "itsecurity_phase7_done",
                    "itsecurity_status",
                    "itsecurity_deadline_project",
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
              IsitsecurityOperator() ||
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
                onDoubleClick={() => handleDoubleClick(item.itsecurity_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
                        [
                            "id",
                            "itsecurity_id",
                            "itsecurity_phase1",
                            "itsecurity_phase1_start",
                            "itsecurity_phase1_deadline",
                            "itsecurity_phase1_done",
                            "itsecurity_phase2",
                            "itsecurity_phase2_start",
                            "itsecurity_phase2_deadline",
                            "itsecurity_phase2_done",
                            "itsecurity_phase3",
                            "itsecurity_phase3_start",
                            "itsecurity_phase3_deadline",
                            "itsecurity_phase3_done",
                            "itsecurity_phase4",
                            "itsecurity_phase4_start",
                            "itsecurity_phase4_deadline",
                            "itsecurity_phase4_done",
                            "itsecurity_phase5",
                            "itsecurity_phase5_start",
                            "itsecurity_phase5_deadline",
                            "itsecurity_phase5_done",
                            "itsecurity_phase6",
                            "itsecurity_phase6_start",
                            "itsecurity_phase6_deadline",
                            "itsecurity_phase6_done",
                            "itsecurity_phase7",
                            "itsecurity_phase7_start",
                            "itsecurity_phase7_deadline",
                            "itsecurity_phase7_done",
                            "itsecurity_status",
                            "itsecurity_deadline_project",
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
                  IsitsecurityOperator() ||
                  IsItsupportOperator() ||
                  IsItmoOperator() ||
                  IsItsecurityOperator() ||
                  IsLogisticOperator()) &&
                  action && (
                    <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item.itsecurity_id)}
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

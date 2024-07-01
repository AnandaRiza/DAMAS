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

  const handleEdit = (itmo_id) => {
    const updatedData = data.map((item) => {
      if (item.itmo_id === itmo_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${itmo_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (itmo_id) => {
    router.push(`${link}/detail/${itmo_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
        itmo_id: "IT MO ID",
        itmo_perihal: "Project Name",
        itmo_pic: "PIC",
        itmotement: "Departement",
        itmo_phase1: "",
        itmo_phase1_start: "",
        itmo_phase1_deadline: "",
        itmo_phase1_done: "",
        itmo_phase2: "",
        itmo_phase2_start: "",
        itmo_phase2_deadline: "",
        itmo_phase2_done: "",
        itmo_phase3: "",
        itmo_phase3_start: "",
        itmo_phase3_deadline: "",
        itmo_phase3_done: "",
        itmo_phase4: "",
        itmo_phase4_start: "",
        itmo_phase4_deadline: "",
        itmo_phase4_done: "",
        itmo_phase5: "",
        itmo_phase5_start: "",
        itmo_phase5_deadline: "",
        itmo_phase5_done: "",
        itmo_phase6: "",
        itmo_phase6_start: "",
        itmo_phase6_deadline: "",
        itmo_phase6_done: "",
        itmo_phase7: "",
        itmo_phase7_start: "",
        itmo_phase7_deadline: "",
        itmo_phase7_done: "",
        itmo_status: "Status",
        itmo_deadline_project: "Project Deadline",
        itmo_project_done: "Project Done",
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

    const { itmo_status } = item;

    if (itmo_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.itmo_deadline_project);

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

  const rowClass = (inputDate, itmo_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (itmo_status === "Finished") {
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
    const classA = rowClass(a.itmo_deadline_project, a.itmo_status);
    const classB = rowClass(b.itmo_deadline_project, b.itmo_status);

    const aIsFinished = a.itmo_status === "Finished";
    const bIsFinished = b.itmo_status === "Finished";

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

    if (a.itmo_status === "Finished" && b.itmo_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.itmo_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.itmo_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.itmo_status === "Ongoing" && b.itmo_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.itmo_deadline_project) -
        new Date(b.itmo_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.itmo_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.itmo_status === "Ongoing") {
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
                    "itmo_id",
                    "itmo_phase1",
                    "itmo_phase1_start",
                    "itmo_phase1_deadline",
                    "itmo_phase1_done",
                    "itmo_phase2",
                    "itmo_phase2_start",
                    "itmo_phase2_deadline",
                    "itmo_phase2_done",
                    "itmo_phase3",
                    "itmo_phase3_start",
                    "itmo_phase3_deadline",
                    "itmo_phase3_done",
                    "itmo_phase4",
                    "itmo_phase4_start",
                    "itmo_phase4_deadline",
                    "itmo_phase4_done",
                    "itmo_phase5",
                    "itmo_phase5_start",
                    "itmo_phase5_deadline",
                    "itmo_phase5_done",
                    "itmo_phase6",
                    "itmo_phase6_start",
                    "itmo_phase6_deadline",
                    "itmo_phase6_done",
                    "itmo_phase7",
                    "itmo_phase7_start",
                    "itmo_phase7_deadline",
                    "itmo_phase7_done",
                    "itmo_status",
                    "itmo_deadline_project",
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
                onDoubleClick={() => handleDoubleClick(item.itmo_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
                        [
                            "id",
                            "itmo_id",
                            "itmo_phase1",
                            "itmo_phase1_start",
                            "itmo_phase1_deadline",
                            "itmo_phase1_done",
                            "itmo_phase2",
                            "itmo_phase2_start",
                            "itmo_phase2_deadline",
                            "itmo_phase2_done",
                            "itmo_phase3",
                            "itmo_phase3_start",
                            "itmo_phase3_deadline",
                            "itmo_phase3_done",
                            "itmo_phase4",
                            "itmo_phase4_start",
                            "itmo_phase4_deadline",
                            "itmo_phase4_done",
                            "itmo_phase5",
                            "itmo_phase5_start",
                            "itmo_phase5_deadline",
                            "itmo_phase5_done",
                            "itmo_phase6",
                            "itmo_phase6_start",
                            "itmo_phase6_deadline",
                            "itmo_phase6_done",
                            "itmo_phase7",
                            "itmo_phase7_start",
                            "itmo_phase7_deadline",
                            "itmo_phase7_done",
                            "itmo_status",
                            "itmo_deadline_project",
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
                        onClick={() => handleEdit(item.itmo_id)}
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

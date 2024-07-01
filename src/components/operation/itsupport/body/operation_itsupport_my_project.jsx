"use client";
import {
  IsitsupportOperator,
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

  const handleEdit = (itsupport_id) => {
    const updatedData = data.map((item) => {
      if (item.itsupport_id === itsupport_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${itsupport_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (itsupport_id) => {
    router.push(`${link}/detail/${itsupport_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
        itsupport_id: "itsupport ID",
        itsupport_perihal: "Project Name",
        itsupport_pic: "PIC",
        departement: "Departement",
        itsupport_phase1: "",
        itsupport_phase1_start: "",
        itsupport_phase1_deadline: "",
        itsupport_phase1_done: "",
        itsupport_phase2: "",
        itsupport_phase2_start: "",
        itsupport_phase2_deadline: "",
        itsupport_phase2_done: "",
        itsupport_phase3: "",
        itsupport_phase3_start: "",
        itsupport_phase3_deadline: "",
        itsupport_phase3_done: "",
        itsupport_phase4: "",
        itsupport_phase4_start: "",
        itsupport_phase4_deadline: "",
        itsupport_phase4_done: "",
        itsupport_phase5: "",
        itsupport_phase5_start: "",
        itsupport_phase5_deadline: "",
        itsupport_phase5_done: "",
        itsupport_phase6: "",
        itsupport_phase6_start: "",
        itsupport_phase6_deadline: "",
        itsupport_phase6_done: "",
        itsupport_phase7: "",
        itsupport_phase7_start: "",
        itsupport_phase7_deadline: "",
        itsupport_phase7_done: "",
        itsupport_status: "Status",
        itsupport_deadline_project: "Project Deadline",
        itsupport_project_done: "Project Done",
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

    const { itsupport_status } = item;

    if (itsupport_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.itsupport_deadline_project);

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

  const rowClass = (inputDate, itsupport_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (itsupport_status === "Finished") {
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
    const classA = rowClass(a.itsupport_deadline_project, a.itsupport_status);
    const classB = rowClass(b.itsupport_deadline_project, b.itsupport_status);

    const aIsFinished = a.itsupport_status === "Finished";
    const bIsFinished = b.itsupport_status === "Finished";

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

    if (a.itsupport_status === "Finished" && b.itsupport_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.itsupport_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.itsupport_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.itsupport_status === "Ongoing" && b.itsupport_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.itsupport_deadline_project) -
        new Date(b.itsupport_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.itsupport_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.itsupport_status === "Ongoing") {
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
                    "itsupport_id",
                    "itsupport_phase1",
                    "itsupport_phase1_start",
                    "itsupport_phase1_deadline",
                    "itsupport_phase1_done",
                    "itsupport_phase2",
                    "itsupport_phase2_start",
                    "itsupport_phase2_deadline",
                    "itsupport_phase2_done",
                    "itsupport_phase3",
                    "itsupport_phase3_start",
                    "itsupport_phase3_deadline",
                    "itsupport_phase3_done",
                    "itsupport_phase4",
                    "itsupport_phase4_start",
                    "itsupport_phase4_deadline",
                    "itsupport_phase4_done",
                    "itsupport_phase5",
                    "itsupport_phase5_start",
                    "itsupport_phase5_deadline",
                    "itsupport_phase5_done",
                    "itsupport_phase6",
                    "itsupport_phase6_start",
                    "itsupport_phase6_deadline",
                    "itsupport_phase6_done",
                    "itsupport_phase7",
                    "itsupport_phase7_start",
                    "itsupport_phase7_deadline",
                    "itsupport_phase7_done",
                    "itsupport_status",
                    "itsupport_deadline_project",
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
              IsitsupportOperator() ||
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
                onDoubleClick={() => handleDoubleClick(item.itsupport_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
                        [
                            "id",
                            "itsupport_id",
                            "itsupport_phase1",
                            "itsupport_phase1_start",
                            "itsupport_phase1_deadline",
                            "itsupport_phase1_done",
                            "itsupport_phase2",
                            "itsupport_phase2_start",
                            "itsupport_phase2_deadline",
                            "itsupport_phase2_done",
                            "itsupport_phase3",
                            "itsupport_phase3_start",
                            "itsupport_phase3_deadline",
                            "itsupport_phase3_done",
                            "itsupport_phase4",
                            "itsupport_phase4_start",
                            "itsupport_phase4_deadline",
                            "itsupport_phase4_done",
                            "itsupport_phase5",
                            "itsupport_phase5_start",
                            "itsupport_phase5_deadline",
                            "itsupport_phase5_done",
                            "itsupport_phase6",
                            "itsupport_phase6_start",
                            "itsupport_phase6_deadline",
                            "itsupport_phase6_done",
                            "itsupport_phase7",
                            "itsupport_phase7_start",
                            "itsupport_phase7_deadline",
                            "itsupport_phase7_done",
                            "itsupport_status",
                            "itsupport_deadline_project",
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
                  IsitsupportOperator() ||
                  IsItsupportOperator() ||
                  IsItmoOperator() ||
                  IsItsecurityOperator() ||
                  IsLogisticOperator()) &&
                  action && (
                    <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item.itsupport_id)}
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

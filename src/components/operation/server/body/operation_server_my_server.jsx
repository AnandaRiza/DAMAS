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

const ServerForm = ({ headers, data, action, link }) => {
  const router = useRouter();

  const handleEdit = (server_id) => {
    const updatedData = data.map((item) => {
      if (item.server_id === server_id) {
        item.status = "Finish";
        router.push(`${link}/edit/${server_id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (server_id) => {
    router.push(`${link}/detail/${server_id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
        server_id: "Server ID",
        server_perihal: "Project Name",
        server_pic: "PIC",
        departement: "Departement",
        server_kickoff_start: "Kick Off Start",
        server_kickoff_deadline: "Kick Off Deadline",
        server_kickoff_done: "Kick off Done",
        server_peyiapanserver_start: "Penyiapan Server Start",
        server_peyiapanserver_deadline: "Penyiapan Server Deadline",
        server_peyiapanserver_done: "Penyiapan Server Done",
        server_instalasiaplikasi_start: "Instalasi Aplikasi Start",
        server_instalasiaplikasi_deadline: "Instalasi Aplikasi Deadline",
        server_instalasiaplikasi_done: "Instalasi Aplikasi Done",
        server_instalcheckpoint_start: "Instal Checkpoint Start",
        server_instalcheckpoint_deadline: "Instal Checkpoint Deadline",
        server_instalcheckpoint_done: "Instal Checkpoint Done",
        server_testingkoneksi_start: "Testing Koneksi Start",
        server_testingkoneksi_deadline: "Testing Koneksi Deadline",
        server_testingkoneksi_done: "Testing Koneksi Done",
        server_serahterimaserver_start: "Serah Terima Server Start",
        server_serahterimaserver_deadline: "Serah Terima Server Start",
        server_serahterimaserver_done: "Serah Terima Server Done",
        server_implementasi_start: "Implementasi Start",
        server_implementasi_deadline: "Implementasi Deadline",
        server_implementasi_done: "Implementasi Done",
        server_status: "Status",
        server_deadline_project: "Project Deadline",
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

    const { server_status } = item;

    if (server_status === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.server_deadline_project);

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

  const rowClass = (inputDate, server_status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(date);
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (server_status === "Finished") {
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
    const classA = rowClass(a.server_deadline_project, a.server_status);
    const classB = rowClass(b.server_deadline_project, b.server_status);

    const aIsFinished = a.server_status === "Finished";
    const bIsFinished = b.server_status === "Finished";

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

    if (a.server_status === "Finished" && b.server_status === "Finished") {
      return classA.localeCompare(classB);
    }

    if (a.server_status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
    }

    if (b.server_status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
    }

    // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
    if (a.server_status === "Ongoing" && b.server_status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return (
        new Date(a.server_deadline_project) -
        new Date(b.server_deadline_project)
      );
    }

    // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
    if (a.server_status === "Ongoing") {
      return 1; // Letakkan a di bawah b
    }

    if (b.server_status === "Ongoing") {
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
                    "server_id",
                    "server_kickoff_start",
                    "server_kickoff_deadline",
                    "server_kickoff_done",
                    "server_peyiapanserver_start",
                    "server_peyiapanserver_deadline",
                    "server_peyiapanserver_done",
                    "server_instalasiaplikasi_start",
                    "server_instalasiaplikasi_deadline",
                    "server_instalasiaplikasi_done",
                    "server_instalcheckpoint_start",
                    "server_instalcheckpoint_deadline",
                    "server_instalcheckpoint_done",
                    "server_testingkoneksi_start",
                    "server_testingkoneksi_deadline",
                    "server_testingkoneksi_done",
                    "server_serahterimaserver_start",
                    "server_serahterimaserver_deadline",
                    "server_serahterimaserver_done",
                    "server_implementasi_start",
                    "server_implementasi_deadline",
                    "server_implementasi_done",
                    "server_status",
                    "server_deadline_project",
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
                onDoubleClick={() => handleDoubleClick(item.server_id)}
              >
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className={`py-3 px-6 text-center ${
                      [
                        "id",
                        "server_id",
                        "server_kickoff_start",
                        "server_kickoff_deadline",
                        "server_kickoff_done",
                        "server_peyiapanserver_start",
                        "server_peyiapanserver_deadline",
                        "server_peyiapanserver_done",
                        "server_instalasiaplikasi_start",
                        "server_instalasiaplikasi_deadline",
                        "server_instalasiaplikasi_done",
                        "server_instalcheckpoint_start",
                        "server_instalcheckpoint_deadline",
                        "server_instalcheckpoint_done",
                        "server_testingkoneksi_start",
                        "server_testingkoneksi_deadline",
                        "server_testingkoneksi_done",
                        "server_serahterimaserver_start",
                        "server_serahterimaserver_deadline",
                        "server_serahterimaserver_done",
                        "server_implementasi_start",
                        "server_implementasi_deadline",
                        "server_implementasi_done",
                        "server_status",
                        "server_deadline_project",
                        "userdomain",
                        "userdomain_pic",
                      ].includes(header)
                        ? "hidden"
                        : ""
                    }`}
                  >
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
                        onClick={() => handleEdit(item.server_id)}
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

export default ServerForm;

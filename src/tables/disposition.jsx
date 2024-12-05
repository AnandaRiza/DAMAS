"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { convertToDate, convertToDateCalculate } from "@/utils/dateFormater";

const DispositionTable = ({ headers, data, action, link }) => {
  const router = useRouter();

  const rowClass = (inputDate, status) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(convertToDateCalculate(date));
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    if (status === "Finished") {
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

  const handleEdit = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        item.status = "Finish";
        router.push(`${link}/disposisi/${id}`);
      }
      return item;
    });
  };

  const handleDoubleClick = (id) => {
    router.push(`${link}/disposisi/${id}`);
  };

  const getDisplayName = (header) => {
    const displayNames = {
      memoNum: "NOMOR DOCUMENT",
      memoPerihal: "PERIHAL DOCUMENT",
      memoPic: "PIC",
      memoStatus: "STATUS DOCUMENT",
      memoSuratType: "TIPE SURAT",
      memoMasuk: "TANGGAL DOCUMENT MASUK",
      memoDocType: "TIPE DOCUMENT",
      memoKeluar: "TANGGAL DOCUMENT KELUAR",
      memoTerima: "TANGGAL TERIMA DOCUMENT",
      memoCategory: "KATEGORI DOCUMENT",
      memoDeadline: "DOCUMENT DEADLINE",
      tanggalDokumen: "TANGGAL DOCUMENT",
      memoDepartment: "DEPARTMENT",
      memoNotes: "NOTES"
      
    };
    return displayNames[header] || header;
  };

  const getStatus = (item) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const deadline = new Date(convertToDateCalculate(date));
      const difference = deadline.getTime() - now.getTime();
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return daysLeft;
    };

    const { memoStatus } = item;

    if (memoStatus === "Finished") {
      return "Finished";
    }

    const daysLeft = calculateTimeLeft(item.memoDeadline);

    if (daysLeft < 0) {
      return memoStatus;
    } else if (daysLeft <= 3) {
      return memoStatus;
    } else if (daysLeft <= 7) {
      return memoStatus;
    } else {
      return memoStatus;
    }
  };

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const classA = rowClass(convertToDateCalculate(a.memoDeadline), a.memoStatus);
      const classB = rowClass(convertToDateCalculate(b.memoDeadline), b.memoStatus);

      const aIsFinished = a.memoStatus === "Finished";
      const bIsFinished = b.memoStatus === "Finished";

      if (aIsFinished && bIsFinished) {
        return classA.localeCompare(classB);
      }

      if (aIsFinished) {
        return 1;
      }

      if (bIsFinished) {
        return -1;
      }

      if (a.memoStatus === "Ongoing" && b.memoStatus === "Ongoing") {
        return new Date(convertToDateCalculate(a.memoDeadline)) - new Date(convertToDateCalculate(b.memoDeadline));
      }

      return a.memoStatus === "Ongoing" ? 1 : -1;
    });
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <table className="table cursor-pointer text-center">
        <thead>
          <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
          {action && (
              <th className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                EDIT
              </th>
            )}
            {headers.map((item, index) => (
              <th key={index}
              className={`py-3 px-6 uppercase ${
                item === "id" || item === "userdomain" || item === "memoCreatedBy" || item === "memoReviewer" || item === "memoKeluar" || item === "userdomainreviewer" || item === "memoUpload" || item === "idMemo" || item === "userdomainpic"
                    ? "hidden"
                    : ""
            }`}
              >
                {getDisplayName(item)}</th>
            ))}
           
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
            const memoStatus = getStatus(item);
            const rowClassName = rowClass(item.memoDeadline, item.memoStatus);
            return (
              <tr
                key={index}
                className={`${rowClassName} text-xs leading-5`}
                onDoubleClick={() => handleDoubleClick(item.id)}
              >
                {action && (
                  <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(item.id)}
                      className="text-black-400 flex flex-col gap-1 items-center justify-center pt-2"
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                  </td>
                )}
                {headers.map((header, headerIndex) => (
                  <td key={headerIndex}
                  className={`py-3 px-6 ${
                    header === "id" || header === "userdomain" || header === "memoCreatedBy" || header === "memoReviewer" || header === "memoKeluar"|| header === "userdomainreviewer" || header === "memoUpload" || header === "idMemo" || header === "userdomainpic" ? "hidden" : ""
                }`}
                   >
                    {header === "memoStatus" ? memoStatus : 
                 
                      (header === "memoKeluar" || header === "memoMasuk" || header === "memoTerima" ? convertToDate(item[header]) : item[header])
                    }
                  </td>
                ))}

                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DispositionTable;

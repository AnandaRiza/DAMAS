"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

const MyMemoTable = ({ headers, data, action, link, onSort, sortConfig }) => {
  const router = useRouter();

  // Filter the data to only include memos with category "MEMO KELUAR" or "Memo Keluar"
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.memo_category === "MEMO KELUAR" || item.memo_category === "Memo Keluar"
    );
  }, [data]);

  // Sort the filtered data based on the sort configuration
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  useEffect(() => {
    console.log("Incoming data:", data);
  }, [data]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    onSort(key, direction);
  };

  const handleDoubleClick = (memoId) => {
    router.push(`${link}mymemo/detailmemo/${memoId}`);
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;

    // Try parsing as ISO date (YYYY-MM-DD)
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;

    // Try parsing as DD/MM/YYYY
    const parts = dateString.split("/");
    if (parts.length === 3) {
      date = new Date(parts[2], parts[1] - 1, parts[0]);
      if (!isNaN(date.getTime())) return date;
    }

    // If all else fails, return null
    console.warn(`Unable to parse date: ${dateString}`);
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-"; // Return a dash for null or empty dates

    let date;

    // Try parsing as ISO date (YYYY-MM-DDTHH:mm:ss.sssZ)
    date = new Date(dateString);

    // If parsing fails, try DD/MM/YYYY format
    if (isNaN(date.getTime())) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }

    // If parsing still fails, return the original string
    if (isNaN(date.getTime())) {
      console.warn(`Unable to parse date: ${dateString}`);
      return dateString;
    }

    // Format the date
    return date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(/(\d+)/, function (match) {
        const suffixes = ["th", "st", "nd", "rd"];
        const relevantDigits =
          (match > 3 && match < 21) || match % 10 > 3 ? 0 : match % 10;
        return match + (suffixes[relevantDigits] || "th");
      });
  };

  const getDisplayName = (header) => {
    const displayNames = {
      memo_num: "NOMOR MEMO",
      memo_perihal: "PERIHAL MEMO",
      memo_pic: "PIC",
      memo_status: "STATUS MEMO",
      memo_surat_type: "TIPE SURAT",
      memo_masuk: "TANGGAL MEMO MASUK",
      memo_doc_type: "TIPE DOKUMEN",
      memo_keluar: "TANGGAL MEMO KELUAR",
      memo_terima: "TANGGAL TERIMA MEMO", 
      memo_category: "KATEGORI MEMO"
    };
    return displayNames[header] || header;
  };


  const columnsToShow = [
    "memo_num",
    "memo_perihal",
    "memo_pic",
    "memo_status",
    "memo_surat_type",
    "memo_doc_type",
    "memo_masuk",
    "memo_keluar",
    "memo_terima", // Add this if you want to show the receive date
    "memo_category",
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case "MEMO FINISHED":
        return "bg-green-100";
      case "MEMO CANCELED":
        return "bg-red-100";
      case "MEMO DRAFT":
        return "bg-blue-100";
      case "MEMO ON HOLD":
        return "bg-yellow-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="overflow-x-auto">
      {sortedData.length === 0 ? (
        <div className="py-5 text-center text-red-500">
          No memos found. Please check back later.
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columnsToShow.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(item)}
                >
                  <div className="flex items-center">
                    {getDisplayName(item)}
                    {sortConfig.key === item &&
                      (sortConfig.direction === "ascending" ? (
                        <MdArrowDropUp className="ml-1" />
                      ) : (
                        <MdArrowDropDown className="ml-1" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={`${getStatusColor(
                  item.memo_status
                )} hover:bg-gray-100 cursor-pointer`}
                onDoubleClick={() => handleDoubleClick(item.memo_id)}
              >
                {columnsToShow.map((header, headerIndex) => {
                  const cellValue = item[header];
                  const isDateField = [
                    "memo_masuk",
                    "memo_keluar",
                    "memo_terima",
                    "memo_deadline",
                  ].includes(header);
                  let displayValue;

                  if (cellValue === null || cellValue === "") {
                    displayValue = "-";
                  } else if (isDateField) {
                    displayValue = formatDate(cellValue);
                  } else {
                    displayValue = cellValue;
                  }

                  return (
                    <td
                      key={headerIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyMemoTable;

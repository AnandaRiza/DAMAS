"use client";

import React, { useState } from "react";
import Link from "next/link";

const LogisticTable = () => {
  // Sample data for demonstration
  const [rowData, setRowData] = useState([
    {
      id: 1,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen A",
      pic: "Bu Maya",
      deadline: "19/03/2024",
      status: "Ongoing",
    },
    {
      id: 2,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen B",
      pic: "Pak Ridhwan",
      deadline: "19/03/2024",
      status: "Ongoing",
    },
    {
      id: 3,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen X",
      pic: "Pak Riza",
      deadline: "19/03/2024",
      status: "Ongoing",
    },
  ]);

  // State to track the currently selected row for editing
  const [selectedRow, setSelectedRow] = useState(null);

  // Function to handle edit action
  const handleEdit = (rowId) => {
    setSelectedRow(rowId);
    // Add your edit logic here, such as opening a modal or navigating to an edit page
    console.log("Editing row with ID:", rowId);
  };

  // Function to handle status change
  const handleStatusChange = (rowId, status) => {
    setRowData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, status: status } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>No Memo</th>
            <th>Perihal</th>
            <th>PIC</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the data array and generate rows dynamically */}
          {rowData.map((row) => (
            <tr key={row.id} className="hover">
              <th>{row.id}</th>
              <td>{row.noMemo}</td>
              <td>{row.perihal}</td>
              <td>{row.pic}</td>
              <td>{row.deadline}</td>
              <td>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {row.status}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => handleStatusChange(row.id, "Ongoing")}>
                        Ongoing
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleStatusChange(row.id, "Finished")}>
                        Finished
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleStatusChange(row.id, "Past Deadline")
                        }
                      >
                        Past Deadline
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <div className="button">
                <Link href="/main/logistic/mymemo/editmemo">
                  <button className="btn btn-slate">
                    Edit Memo
                  </button>
                </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogisticTable;


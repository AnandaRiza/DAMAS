import React from "react";
import Link from "next/link";

const TableNetwork = () => {
  const rowData = [
    {
      id: 1,
      perihal: "Kabel Fiber Wisma 3",
      pic: "Bu Maya",
      deadline: "19/03/2024",
    },
    {
      id: 2,
      perihal: "Kabel Lan Wisma 2 Lantai 4",
      pic: "Pak Ridhwan",
      deadline: "19/03/2024",
    },
    {
      id: 3,
      perihal: "Jaringan DRC ke Wisma 2",
      pic: "Pak Riza",
      deadline: "19/03/2024",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
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
              <td>{row.perihal}</td>
              <td>{row.pic}</td>
              <td>{row.deadline}</td>
              <td>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Ongoing
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Ongoing</a>
                    </li>
                    <li>
                      <a>Finished</a>
                    </li>
                    <li>
                      <a>Past Deadline</a>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
              <div className="button">
                <Link href="/main/operation/myprogress/editprogress">
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

export default TableNetwork;

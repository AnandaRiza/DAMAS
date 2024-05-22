import Link from "next/link";
import React from "react";

const TableSDLC = () => {
  const rowData = [
    {
      id: 1,
      namaproject: "damas",
      pic: "ridwan",
      deadline: "19/03/2024",
    },
    {
      id: 2,
      namaproject: "damas2",
      pic: "riza",
      deadline: "19/03/2024",
    },
    {
      id: 3,
      namaproject: "damas3",
      pic: "maya",
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
            <th>Nama Project</th>
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
              <td>{row.namaproject}</td>
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
                <Link href="/main/development/myproject/editproject">
                  <button className="btn btn-slate">
                    Edit Project
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

export default TableSDLC;

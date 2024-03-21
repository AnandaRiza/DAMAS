import React from "react";

const LogisticTable = () => {
  // Sample data for demonstration
  const rowData = [
    {
      id: 1,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen A",
      pic: "Bu Maya",
      deadline: "19/03/2024",
    },
    {
      id: 2,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen B",
      pic: "Pak Ridhwan",
      deadline: "19/03/2024",
    },
    {
      id: 3,
      noMemo: "2024/01/17A",
      perihal: "TTD persetujuan dokumen X",
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
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Edit
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
                  >
                    <div className="card-body">
                      <h3 className="card-title">Card title!</h3>
                      <p>you can use any element as a dropdown.</p>
                    </div>
                  </div>
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

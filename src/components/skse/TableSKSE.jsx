"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const TableSKSE = ({headers, data, action, link}) => {
  const router = useRouter();

  const rowClass = (inputDate, status) => {
    const calculateTimeLeft = (date) => {
        const now = new Date();
        const deadline = new Date(date);
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
          router.push(`${link}/edit/${id}`);
      }
      return item;
  });
};

const handleDoubleClick = (id) => {
  router.push(`${link}/detail/${id}`);
};

const getDisplayName = (header) => {
  const displayNames = {
      nosurat: 'No Surat',
      perihal: "Perihal",
      pic: "PIC",
      departement: "Departement",
      deadline: "Deadline",
      status: "Status",
    
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

  const { status } = item;

  if (status === "Finished") {
      return "Finished";
  }

  const daysLeft = calculateTimeLeft(item.deadline);

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

const sortedData = data.slice().sort((a, b) => {
  const classA = rowClass(a.deadline, a.status);
  const classB = rowClass(b.deadline, b.status);


  const aIsFinished = a.status === "Finished";
  const bIsFinished = b.status === "Finished";

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

  if (a.status === "Finished" && b.status === "Finished") {
      return classA.localeCompare(classB);
  }

  if (a.status === "Finished") {
      return 1; // Move 'Finished' projects to the bottom
  }

  if (b.status === "Finished") {
      return -1; // Move 'Finished' projects to the bottom
  }

  // Jika keduanya tidak selesai, tetapi memiliki status "Ongoing"
  if (a.status === "Ongoing" && b.status === "Ongoing") {
      // Urutkan berdasarkan deadlineproject
      return new Date(a.deadline) - new Date(b.deadline);
  }

  // Jika hanya salah satu memiliki status "Ongoing", letakkan yang lain di atas
  if (a.status === "Ongoing") {
      return 1; // Letakkan a di bawah b
  }

  if (b.status === "Ongoing") {
      return -1; // Letakkan b di atas a
  }

  // Jika keduanya tidak selesai dan tidak ada yang "Ongoing", urutkan berdasarkan classA dan classB
  return classA.localeCompare(classB);
});


  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm"> 
          {headers.map((item, index) => (
            <th key={index} 
            className={`py-3 px-6 uppercase ${item === 'id' || item === 'id' ? 'hidden' : ''}`}>
             {getDisplayName(item)}
            </th>
          ))}
          {action && 
          <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">Edit</th> }
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
             const status = getStatus(item);
             const rowClassName = rowClass(item.deadline, item.status);
             return (
                        <tr
                            key={index}
                            className={`${rowClassName} text-xs leading-5`}
                            onDoubleClick={() => handleDoubleClick(item.id)}
                        >
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`py-3 px-6 ${header === 'id' ? 'hidden' : ''}`}>
                                {header === "status"
                                            ? status
                                            : item[header]}
                            </td>
                            ))}

                             {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(item[headers[0]])
                                        }
                                        className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2 "
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

export default TableSKSE;

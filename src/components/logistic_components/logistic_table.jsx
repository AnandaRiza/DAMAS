"use client"
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const logistic_table = ({headers, data, action}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm"> 
          
          {headers.map((item, index) => (
            <th key={index} className="py-3 px-6 uppercase">
              {item}
            </th>
          ))}
          {action && <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">Edit</th> }
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-white" : "bg-[#00A6B4]/[0.5]"
                            } hover:bg-gray-100 text-xs leading-5`}
                        >
                           

                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className="py-3 px-6">
                                    {item[header]}
                                </td>
                            ))}

                             {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    <button className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2 ">
                                        <AiOutlineEdit size={20}  />
                                        {/* <p className="text-blue-500">Edit</p> */}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
        </tbody>
      </table>
    </div>
  );
};

export default logistic_table;

//testing
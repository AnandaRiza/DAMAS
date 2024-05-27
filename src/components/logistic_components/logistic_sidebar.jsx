import React from 'react'
import { TbProgress } from "react-icons/tb";
import { GoFile } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { CiMemoPad } from "react-icons/ci";

const Sidebar = () => {
    return (
        <div className="bg-[#00A6B4]/[0.5] text-black w-64 min-h-screen p-4">
          <span className='text-[#0066AE] font-semibold'>Development</span>
          <div className="h-[0.5px] bg-black"></div>
           <button className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <span className='flex items-center'><TbProgress className='mr-1'/>All Memo</span>
            </button>
            <button className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <span className='flex items-center'><TbProgress className='mr-1'/>My Memo</span>
            </button>
            <button className="flex flex-col items-center justify-center tracking-wide text-black transition-colors duration-200 transform focus:outline-none hover:text-blue-600 focus:text-white-600 mb-4">
              <span className='flex items-center'><TbProgress className='mr-1'/>Create New Memo</span>
            </button>
       
          </div>
      );
    };

export default Sidebar
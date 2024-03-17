import React from 'react'
import { TfiBackRight } from "react-icons/tfi";

const Sidebar = () => {
    return (
        <div className="bg-[#00A6B4]/[0.5] text-black w-64 min-h-screen p-4">
           <button className="p-6 flex flex-col w-full items-center justify-center tracking-wide text-white transition-colors duration-200 transform bg-[#0066AE] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              <span>Development</span>
              <div className="w-full h-[0.5px] bg-black"></div>
              <span className='flex items-center'><TfiBackRight />SDLC</span>
            </button>
          {/* <ul>
            <li className="">
              </li>
            <li className="py-5 px-4">PPO</li>
            <li className="py-5 px-4">Operation</li>
            <li className="py-5 px-4">Logistic</li>
          </ul> */}
        </div>
      );
    };

export default Sidebar
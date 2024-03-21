import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({title}) => {
  return (
    <div className='flex justify-between items-center p-3 bg-[#00A6B4] bg-opacity-25 px-8 h-20 font-roboto text-5xl'>
        <h1 className="text-2xl text-[#0066AE] font-bold">{title}</h1>
        <div className="flex items-center px-4 py-2 font-roboto text-[#333] text-base">
        <MdNotifications className='mr-1' /><CgProfile className='mr-1'/><span className='text-[#0066AE]'>Mayastri Devana</span><IoMdArrowDropdown className='mt-1'/></div>
    </div>
  )
}

export default Header
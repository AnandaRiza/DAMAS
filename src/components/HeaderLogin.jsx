import React from 'react'
import Image from "next/image";
import logo2 from '../assets/logo2.png'; // Correct relative path

const HeaderLogin = ({title}) => {
    return (
        <div className='flex justify-between items-center p-3 bg-white px-8 h-20 font-roboto text-5xl shadow-lg border rounded-sm'>
            <Image src={logo2} alt="Damas Logo" width={150} />
            <div className="flex items-center">
        </div>
        </div>
      )
}

export default HeaderLogin
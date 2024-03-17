import React from 'react'

const Header2 = ({title}) => {
  return (
    <div className='flex justify-between items-center p-4 bg-[#FFFFFF] h-20 font-roboto text-5xl'>
        <h1 className="text-white text-2xl" style={{ color: '#333' }}>{title}</h1>
        <div className="flex items-center">
        <div className="px-4 py-2 font-roboto text-black text-base">Welcome, Mayastri Devana</div>
    </div>
    </div>
  )
}

export default Header2
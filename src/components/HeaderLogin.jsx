import React from 'react'

const HeaderLogin = ({title}) => {
    return (
        <div className='flex justify-between items-center p-4 bg-[#FFFFFF] h-20 font-roboto text-5xl'>
            <h1 className="text-white text-2xl" style={{ color: '#333' }}>{title}</h1>
            <div className="flex items-center">
        </div>
        </div>
      )
}

export default HeaderLogin
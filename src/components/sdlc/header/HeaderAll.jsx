import React from 'react'

const HeaderAll = ({title}) => {
  return (
    <>
      <div className="flex-grow justify-center items-center bg-white rounded-xl bg-[#FFFFFF] shadow-md">
        <div>
        <div className="text-[#0066AE] font-semibold ml-12 mt-3 py-2">
            {title}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default HeaderAll
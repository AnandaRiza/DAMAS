import React from 'react'

const HeaderSkse = ({title}) => {
  return (
    <>
      <div className="flex-grow justify-center items-center rounded-xl bg-[#FFFFFF] shadow-md">
        <div>
        <div className="text-[#0066AE] font-semibold ml-12 mt-3 py-2">
            {title}
          </div>
          <div>
            <span className="flex text-[#0066AE] ml-12 mt-2">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>PPO</a>
                  </li>
                  <li>
                    <a>SKSE</a>
                  </li>
                  <li>
                    <a>{title}</a>
                  </li>
                </ul>
              </div>
            </span>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default HeaderSkse
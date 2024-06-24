import Link from 'next/link'
import React from 'react'

const HeaderLogistic = ({title}) => {
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
                  <Link href="/main">
                    Home
                    </Link>
                  </li>
                  <li>
                  <Link href="/main/logistic">
                    Logistic
                    </Link>
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

export default HeaderLogistic
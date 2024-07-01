import Link from 'next/link'
import React from 'react'

const page = () => {
  
  return (
    <>
     <div className="flex-grow justify-center w-full items-center bg-white rounded-xl bg-[#FFFFFF] shadow-md">

        <div className="text-[#0066AE] font-semibold ml-12 mt-3 py-2">
            My Project
          </div>
          <div>
            <span className="flex text-[#0066AE] ml-12 mt-2">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Operation</a>
                  </li>
                  <li>
                    <a>IT Support</a>
                  </li>
                  <li>
                    <a>My Project</a>
                  </li>
                  <li>
                    <a>Detail</a>
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
    </>
  );
};

export default page


import MemoForm from "@/components/logistic_components/logistic_memo_form";
import React from 'react'

const page = () => {
  return (
    <>
      <div className="flex-grow justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="text-[#0066AE] font-semibold ml-10 mt-4">
            Create New Memo
          </div>
          <div>
            <span className="flex text-[#0066AE] ml-10 mt-2">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Memo</a>
                  </li>
                  <li>Add Memo</li>
                </ul>
              </div>
            </span>
          </div>
          <div className="px-10 grid grid-cols-2 gap-3 mt-10 w-full">
            <MemoForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page
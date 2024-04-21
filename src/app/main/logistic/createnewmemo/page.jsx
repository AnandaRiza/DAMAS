import React from "react";
import MemoForm from "@/components/logistic_components/logistic_memo_form";
const page = () => {
  return (
    <>
      <div className="flex-grow justify-center items-center min-h-screen">
        <div>
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
                    <a>Documents</a>
                  </li>
                  <li>Add Document</li>
                </ul>
              </div>
            </span>
          </div>
          <div className="px-10 grid grid-cols-2 gap-3 mt-10 w-full">
            <MemoForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

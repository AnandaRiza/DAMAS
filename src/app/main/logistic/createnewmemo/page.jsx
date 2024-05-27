import React from "react";
import MemoForm from "@/components/logistic_components/logistic_memo_form";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";

const page = () => {
  return (
    <>
      <div className="flex-grow justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="text-[#0066AE] font-semibold ml-10 mt-4">
            Create New Memo
          </div>
          <LogisticBreadcrumbs />
          <div className="px-10 mt-10">
            <MemoForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

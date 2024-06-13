
import HeaderSkse from "@/components/skse/header/HeaderSkse";
import SKSEFormEdit from "@/components/skse/skse_form_edit";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderSkse title="Edit SK/SE"/>
          <div>
            <SKSEFormEdit/>
          </div>
        </div>
      </div>
    );
};

export default page;

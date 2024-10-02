
import SKSEDetail from "@/components/skse/detail/SKSEDetail";
import HeaderSkse from "@/components/skse/header/HeaderSkse";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderSkse title="Detail SK/SE"/>
          <div>
            <SKSEDetail/>
          </div>
        </div>
      </div>
    );
};

export default page;

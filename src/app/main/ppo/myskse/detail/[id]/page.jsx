import HeaderSkse from "@/components/skse/header/HeaderSkse";
import MySkseDetail from "@/components/skse/myskse/MySkseDetail";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderSkse title="Detail SK/SE"/>
          <div>
            <MySkseDetail/>
          </div>
        </div>
      </div>
    );
};

export default page;

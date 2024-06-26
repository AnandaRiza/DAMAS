
import HeaderSkse from "@/components/skse/header/HeaderSkse";
import MySkseFormEdit from "@/components/skse/myskse/MySkseFormEdit";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderSkse title="Edit SK/SE"/>
          <div>
            <MySkseFormEdit/>
          </div>
        </div>
      </div>
    );
};

export default page;

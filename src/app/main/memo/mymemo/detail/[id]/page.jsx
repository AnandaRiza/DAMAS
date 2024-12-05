
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import MyDetail from "@/tables/mymemo";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Detail Memo"/>
          <div>
            <MyDetail/>
          </div>
        </div>
      </div>
    );
};

export default page;

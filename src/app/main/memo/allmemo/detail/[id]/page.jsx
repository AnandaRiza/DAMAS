
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import AllDetail from "@/tables/alldetail";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Detail Memo"/>
          <div>
            <AllDetail/>
          </div>
        </div>
      </div>
    );
};

export default page;

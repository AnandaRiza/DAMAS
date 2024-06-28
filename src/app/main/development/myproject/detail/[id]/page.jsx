import HeaderDev from "@/components/sdlc/header/HeaderDev";
import MyProjectDetail from "@/components/sdlc/myproject/MyProjectDetail";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Detail Project"/>
          <div>
            <MyProjectDetail />
          </div>
        </div>
      </div>
    );
};

export default page;

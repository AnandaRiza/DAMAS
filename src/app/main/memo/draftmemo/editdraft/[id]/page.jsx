import HeaderDev from "@/components/sdlc/header/HeaderDev";
import Page from "@/tables/draftedit";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Draft Memo"/>
          <div>
            <Page/>
          </div>
        </div>
      </div>
    );
};

export default page;

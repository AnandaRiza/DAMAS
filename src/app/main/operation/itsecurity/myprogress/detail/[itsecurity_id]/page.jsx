import Header from "@/components/operation/itsecurity/header/header_myitsecurity_detail";
import Body from "@/components/operation/itsecurity/body/operation_myitsecurity_detail";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <Header/>
          <div>
            <Body />
          </div>
        </div>
      </div>
    );
};

export default page;
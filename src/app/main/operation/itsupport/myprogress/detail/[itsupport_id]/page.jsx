import Header from "@/components/operation/itsupport/header/header_myitsupport_detail";
import Body from "@/components/operation/itsupport/body/operation_myitsupport_detail";
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
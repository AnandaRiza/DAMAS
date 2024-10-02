import Header from "@/components/operation/itmo/header/header_myitmo_detail";
import Body from "@/components/operation/itmo/body/operation_myitmo_detail";
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
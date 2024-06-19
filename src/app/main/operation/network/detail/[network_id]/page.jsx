import Header from "@/components/operation/network/header/header_detail"
import Body from "@/components/operation/network/body/operation_network_detail"
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

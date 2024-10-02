import Header from "@/components/operation/server/header/header_detail"
import Body from "@/components/operation/server/body/operation_server_detail"
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

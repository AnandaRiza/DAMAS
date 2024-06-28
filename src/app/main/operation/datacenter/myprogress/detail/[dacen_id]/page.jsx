import Header from "@/components/operation/datacenter/header/header_mydacen_detail";
import Body from "@/components/operation/datacenter/body/operation_mydacen_detail";
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
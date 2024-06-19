import PpoDetail from "@/components/Ppo/PpoDetail";
import HeaderPpo from "@/components/sdlc/header/HeaderPpo";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderPpo title="Detail Project"/>
          <div>
            <PpoDetail />
          </div>
        </div>
      </div>
    );
};

export default page;


import PpoFormEdit from "@/components/Ppo/PpoFormEdit";
import HeaderPpo from "@/components/sdlc/header/HeaderPpo";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderPpo title="Edit"/>
          <div>
            <PpoFormEdit />
          </div>
        </div>
      </div>
    );
};

export default page;

import MyProjectPpoFormEdit from "@/components/Ppo/myproject/MyProjectPpoFormEdit";
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Edit Project"/>
          <div>
            <MyProjectPpoFormEdit />
          </div>
        </div>
      </div>
    );
};

export default page;

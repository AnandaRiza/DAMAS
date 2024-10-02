import HeaderDev from "@/components/sdlc/header/HeaderDev";
import SDLCFormEdit from "@/components/sdlc/sdlc_form_edit";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Edit Project"/>
          <div>
            <SDLCFormEdit />
          </div>
        </div>
      </div>
    );
};

export default page;

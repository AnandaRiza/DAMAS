import SDLCDetail from "@/components/sdlc/detail/SDLCDetail";
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import React from "react";

const page = () => {
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Detail Project"/>
          <div>
            <SDLCDetail />
          </div>
        </div>
      </div>
    );
};

export default page;

"use client";
import SDLCDetail from "@/components/sdlc/detail/SDLCDetail";
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { recId } = useParams();
    return (
        <div className="flex-grow justify-center items-center min-h-screen">
        <div>
          <HeaderDev title="Detail Project"/>
          <div>
            <SDLCDetail recId={recId} />
          </div>
        </div>
      </div>
    );
};

export default page;

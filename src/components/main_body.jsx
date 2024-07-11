"use client";

import axios from "axios";
import React, { useState } from "react";
import { DiVim } from "react-icons/di";

const Page = () => {
  return (
    <div className="flex-grow justify-center items-center min-h-screen rounded-xl mt-1">

      <div className="flex w-grow">

        <div className="grid h-[330px] w-[90px] flex-grow card bg-white rounded-box mt-4 p-1 mr-2"
        // style={{ background: 'linear-gradient(275deg, rgba(255, 255, 255, 1), rgba(0, 166, 180, 0.8))' }}
        >
          <div className="h-[50px] w-[770px] rounded-box shadow-sm">
          <h1 className="font-bold p-2 mt-1 items-center justify-center">DEVELOPMENT</h1>
          <p className="p-4">Monitoring all STL Project From MBS</p>
          </div>
        </div>

        {/* <div className="divider divider-horizontal"></div> */}

        <div className="grid h-[330px] w-[90px] flex-grow card bg-white rounded-box mt-4 p-1">
          <h1 className="font-bold p-2">PPO</h1>
        </div>
        
      </div>

      <div className="flex w-grow mt-1">

        <div className="grid h-[330px] w-[90px] flex-grow card bg-white rounded-box mt-2 p-1 mr-2 font-bold">
        <h1 className="font-bold p-2">OPERATION</h1>
        </div>

        {/* <div className="divider divider-horizontal"></div> */}

        <div className="grid h-[330px] w-[90px] flex-grow card bg-white rounded-box mt-2 p-1 font-bold">
        <h1 className="font-bold p-2">LOGISTIC</h1>
        </div>

      </div>
    </div>
  );
};

export default Page;

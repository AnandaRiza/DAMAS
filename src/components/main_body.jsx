"use client";

import axios from "axios";
import React, { useState } from "react";
import { DiVim } from "react-icons/di";

const Page = () => {
  return (
    <div className="flex-grow justify-center items-center min-h-screen rounded-xl mt-1">

      <div className="flex w-grow">

        <div className="grid h-[450px] w-[90px] flex-grow card bg-white rounded-box mt-4 p-1 mr-2"
        // style={{ background: 'linear-gradient(315deg, rgba(71, 140, 207, 1), rgba(255, 255, 255, 1))' }}
        >
          <div className="h-[50px] w-[770px] rounded-box shadow-sm">
          <h1 className="font-bold p-4 items-center justify-center">DEVELOPMENT</h1>
          <p className="p-4 text-[#A3A3A3] font-semibold">Monitoring all STL Project From MBS</p>
          <div className="badge badge-accent p-3 m-1 font-bold">SDLC</div>
          </div>
        </div>

        {/* <div className="divider divider-horizontal"></div> */}

        <div className="grid h-[450px] w-[90px] flex-grow card bg-white rounded-box mt-4 p-1"
        style={{ background: 'linear-gradient(315deg, rgba(71, 140, 207, 1), rgba(255, 255, 255, 1))' }}>
        <div className="h-[50px] w-[770px] rounded-box">
          <h1 className="font-bold p-4">PPO</h1>
          <p className="p-4 text-[#A3A3A3] font-semibold">Monitoring all STL Project From MBS and SK/SE Flow</p>
          <div className="badge badge-accent p-3 m-1 font-bold">SDLC</div>
          <div className="badge badge-accent p-3 m-1 font-bold">SK/SE</div>
          </div>
        </div>
        
      </div>

      <div className="flex w-grow mt-1">

        <div className="grid h-[450px] w-[90px] flex-grow card bg-white rounded-box mt-2 p-1 mr-2 font-bold">
        <div className="h-[50px] w-[770px] rounded-box shadow-sm mb-10">
        <h1 className="font-bold p-4">OPERATION</h1>
        <p className="p-4 text-[#A3A3A3] font-semibold">Monitoring all Project in Operation Division</p>
        <div className="badge badge-accent p-3 m-1">Network</div>
        <div className="badge badge-accent p-3 m-1">Server</div>
        <div className="badge badge-accent p-3 m-1">Data Center</div>
        <div className="badge badge-accent p-3 m-1">IT MO</div>
        <div className="badge badge-accent p-3 m-1">IT Support</div>
        <div className="badge badge-accent p-3 m-1">IT Security</div>
        </div>
        <br />
        <div className="flex flex-row items-center mt-10">
        <button className="btn bg-[#ACC8E5] hover:bg-[#8DB5E1] text-[#000000] p-1 m-1 h-[75px] w-[175px]">My Project</button>
        <button className="btn bg-[#ACC8E5] hover:bg-[#8DB5E1] text-[#000000] p-1 m-1 h-[75px] w-[175px]">All Project</button>
        <button className="btn bg-[#00FF66] hover:bg-[#0EDF61] text-[#000000] p-1 m-1 h-[75px] w-[175px]">Create Project</button>
        </div>
        </div>

        {/* <div className="divider divider-horizontal"></div> */}

        <div className="grid h-[450px] w-[90px] flex-grow card bg-white rounded-box mt-2 p-1 font-bold">
        <div className="h-[50px] w-[770px] rounded-box">
        <h1 className="font-bold p-4">LOGISTIC</h1>
        <p className="p-4 text-[#A3A3A3] font-semibold">Monitoring all Logistic Project and Everything Related with Logistic</p>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Page;

'use client';

import axios from "axios";
import React, { useState } from "react";
import { DiVim } from "react-icons/di";

const Page = () => {

return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl mt-4">

<div className="flex w-grow">

  <div className="grid h-20 w-20 flex-grow card bg-base-300 rounded-box place-items-center mt-4 ml-4 p-1">
    DEVELOPMENT
    </div>

  <div className="divider divider-horizontal"></div>

  <div className="grid h-20 w-20 flex-grow card bg-base-300 rounded-box place-items-center mt-4 mr-4 p-1">
    PPO
    </div>

</div>

<div className="flex w-grow mt-2">

  <div className="grid h-60 w-20 flex-grow card bg-base-300 rounded-box place-items-center mt-4 ml-4 p-1">
    <div className="font-bold">
    OPERATION
    </div>
    <div>
        
    </div>

    <div className="">
        <button className="btn btn-success"> 123</button>
        <button className="btn btn-success ml-2"> 123</button>
        <button className="btn btn-success ml-2"> 123</button>
    </div>
    </div>

  <div className="divider divider-horizontal"></div>

  <div className="grid h-20 w-20 flex-grow card bg-base-300 rounded-box place-items-center mt-4 mr-4 p-1">
    LOGISTIC
    </div>

</div>

    </div>
    
);
};

export default Page;

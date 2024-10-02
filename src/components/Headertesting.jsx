import NetworkForm from '@/components/operation/network/body/operation_network_form';
import React from 'react'
import FormSearch from "@/components/FormSearch";
import { useEffect, useState } from "react";

const page = () => {
  
  return (
    <>
      <div className="flex-grow justify-center items-center bg-white rounded bg-[#FFFFFF] rounded-xl">
        <div>
          <div className="text-[#0066AE] font-semibold ml-12 mt-3 py-2">
            All Project
          </div>
          <div>
            <span className="flex text-[#0066AE] ml-12 mt-2">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Operation</a>
                  </li>
                  <li>All Project</li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default page
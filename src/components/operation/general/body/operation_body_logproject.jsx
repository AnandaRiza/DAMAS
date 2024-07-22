// pages/page.js

import React, { useState } from "react";

import Network from "@/components/operation/network/body/network_logtable";
import Server from "@/components/operation/server/body/server_logtable";
import Dacen from "@/components/operation/datacenter/body/dacen_logtable";
import ITSupport from "@/components/operation/itsupport/body/itsupport_logtable";
import ITMo from "@/components/operation/itmo/body/itmo_logtable";
import ITSecurity from "@/components/operation/itsecurity/body/itsecurity_logtable";


const Page = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.innerText); // Memilih opsi berdasarkan teks dari link
  };

  let componentToDisplay;
  if (selectedOption === "Server") {
    componentToDisplay = <Server />;
  } else if (selectedOption === "Network") {
    componentToDisplay = <Network />;
  } else if (selectedOption === "Data Center") {
    componentToDisplay = <Dacen />;
  } else if (selectedOption === "IT Support") {
    componentToDisplay = <ITSupport />
  } else if (selectedOption === "IT MO") {
    componentToDisplay = <ITMo /> 
  } else if (selectedOption === "IT Security") {
    componentToDisplay = <ITSecurity />
  }

  return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <details className="dropdown">
        <summary className="btn m-1">{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : "Choose Table"}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow-md">
            <li>
              <a onClick={handleOptionChange}>Network</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>Server</a>
            </li>
            {/* <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>Data Center</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>IT Support</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>IT MO</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>IT Security</a>
            </li> */}
          </ul>
        </details>
      </div>
      {componentToDisplay && (
        <div className="mt-1">
          {componentToDisplay}
        </div>
      )}
    </div>
  );
};

export default Page;

// pages/page.js

import React, { useState } from "react";
import Server from "@/components/operation/server/body/operation_server_form";
import Network from "@/components/operation/network/body/operation_network_form";
import Dacen from "@/components/operation/datacenter/body/operation_datacenter_form"
import ITSupport from "@/components/operation/itsupport/body/operation_itsupport_form"
import ITMo from "@/components/operation/itmo/body/operation_itmo_form"
import ITSecurity from "@/components/operation/itsecurity/body/operation_itsecurity_form"

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
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen rounded-xl">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <details className="dropdown">
        <summary className="btn m-1">{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : "Choose Team"}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a onClick={handleOptionChange}>Network</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={handleOptionChange}>Server</a>
            </li>
            {/* <hr className="my-1 border-gray-300" /> */}
            {/* <li>
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
        <div className="p-4">
          {componentToDisplay}
        </div>
      )}
    </div>
  );
};

export default Page;

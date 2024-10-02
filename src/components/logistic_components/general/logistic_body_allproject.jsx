import React, { useState, useRef } from "react";
import LogisticTableMasuk from "@/app/main/logistic/table/masuk/page";
import LogisticTableKeluar from "@/app/main/logistic/table/keluar/page";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const detailsRef = useRef(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Close the dropdown
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };

  let componentToDisplay;
  if (selectedOption === "Memo Masuk") {
    componentToDisplay = <LogisticTableMasuk />;
  } else if (selectedOption === "Memo Keluar") {
    componentToDisplay = <LogisticTableKeluar />;
  }

  return (
    <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="px-10 grid grid-cols-2 gap-3 mt-4 w-full p-4">
        <details ref={detailsRef} className="dropdown">
          <summary className="btn m-1">
            {selectedOption ? selectedOption : "Choose Table"}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow-md">
            <li>
              <a onClick={() => handleOptionChange("Memo Masuk")}>Memo Masuk</a>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
              <a onClick={() => handleOptionChange("Memo Keluar")}>Memo Keluar</a>
            </li>
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

import React from "react";
import Card from "@/components/Card";

const data = [
  { name: "riza", age: 20 },
  { name: "ridhwan", age: 24 },
  { name: "maya", age: 17 },
  { name: "aula", age: 17 },
];

const page = () => {
  return (
      <div className="flex-grow justify-center items-center min-h-screen">
            <div className="text-[#0066AE] font-semibold ml-10 mt-4">
              Dashboard
            </div>
            <div>
              <span className="flex text-[#0066AE] ml-10 mt-2">
                Working & Managing Together
              </span>
            </div>
            <div className="px-10 grid grid-cols-2 gap-3 mt-10 w-full">
              {data.map((item, index) => (
                <div key={index} className="w-full">
                  <Card name={item.name} age={item.age} />
                </div>
              ))}
            </div>
          </div>
  );
};

export default page;

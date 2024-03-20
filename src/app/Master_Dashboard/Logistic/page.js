import Header2 from "@/components/Header2";
import Sidebar from "@/components/logistic_components/logistic_sidebar";
import React from "react";
import Card from "@/components/Card";
import Table from "@/components/logistic_components/logistic_table";

const page = () => {


  // const generateBreadcrumbs = () => {
  //   let breadcrumbs = [];
  //   let path = '';
  //   breadcrumbs.push({ label: 'Home', href: '/' }); // Home breadcrumb always present
  //   routeParts.forEach((part, index) => {
  //     path += '/' + part;
  //     breadcrumbs.push({ label: part, href: path });
  //   });
  //   return breadcrumbs;
  // };


  return (
    <>
      <div className="flex-grow justify-center items-center min-h-screen">
        <Header2 title="Damas" />
        <div className="flex">
          <Sidebar />
          <div>
            <div className="text-[#0066AE] font-semibold ml-10 mt-4">
              Dashboard
            </div>
            <div>
              <span className="flex text-[#0066AE] ml-10 mt-2">
                <div className="text-sm breadcrumbs">
                  <ul>
                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <a>Documents</a>
                    </li>
                    <li>Add Document</li>
                  </ul>
                </div>
              </span>
            </div>
            <div className="px-10 grid grid-cols-2 gap-3 mt-10 w-full"></div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

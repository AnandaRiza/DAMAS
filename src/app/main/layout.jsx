import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-[100vh] bg-white ">
      <Header title="DAMAS" />
      <div className="w-full relative pb-10 flex">
        <Sidebar />
        <div className="px-10 w-full">
          <div className="">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default layout;

import React from "react";
import Card from "@/components/network/network_card";

const data = [
  { nama_sistem: "Hard Disk 1", keterangan: "Hard Disk Wisma 1", threshold_1: "500 MB", threshold_2: "500 MB", threshold_3: "500 MB"},
  { nama_sistem: "Hard Disk 2", keterangan: "Hard Disk Wisma 2", threshold_1: "1000 MB", threshold_2: "500 MB", threshold_3: "500 MB"},
  { nama_sistem: "Hard Disk 3", keterangan: "Hard Disk Wisma 3", threshold_1: "1000 MB", threshold_2: "500 MB", threshold_3: "500 MB"},
  { nama_sistem: "Hard Disk 4", keterangan: "Hard Disk Wisma 4", threshold_1: "1000 MB", threshold_2: "500 MB", threshold_3: "500 MB"},
];


const page = () => {
  return (
      <div className="flex-grow justify-center items-center min-h-screen">
            <div className="text-[#0066AE] font-semibold ml-10 mt-4">
              Monitoring Sistem
            </div>
            <div className="px-10 grid grid-cols-2 gap-3 mt-10 w-full">
              {data.map((item, index) => (
                <div key={index} className="w-full">
                  <Card nama_sistem={item.nama_sistem} keterangan={item.keterangan} threshold_1={item.threshold_1} threshold_2={item.threshold_2} threshold_3={item.threshold_3} />
                </div>
              ))}
            </div>
          </div>
  );
};

export default page;

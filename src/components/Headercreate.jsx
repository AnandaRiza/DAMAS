import NetworkForm from '@/components/operation/network/body/operation_network_form';
import React from 'react'
import FormSearch from "@/components/FormSearch";
import { useEffect, useState } from "react";

const page = () => {

  const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllNetwork, setDataAllNetwork] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const handleSearch = async () => {
      try {
          const response = await axios.get(
              `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow/getnetwork?input=${searchInput}`
          );
          setSearchResult(response.data.data);
      }catch (error) {
          console.log(error);
      }
  };
  
  return (
    <>
      <div className="flex-grow justify-center items-center bg-white rounded-xl bg-[#FFFFFF]">
        <div>
        <div className="text-[#0066AE] font-semibold ml-12 mt-3 py-2">
            Create new Project
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
                  <li>Create New</li>
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
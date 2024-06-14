'use client';

import Header from '@/components/operation/datacenter/header/header_all_project';
import Body from '@/components/operation/datacenter/body/operation_datacenter_table';

import NotFound from "@/components/NotFound";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";

import { useEffect, useState } from "react";


import React from 'react'

const page = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dataAllDacen, setDataAllDacen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getDataAllDacen();
}, [startIndex]);

  const getDataAllDacen = async () => {
    setDataAllDacen(null);
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/dacenshow?start=${startIndex}&size=${perPage}`
        );
        setDataAllDacen(response.data.data);
    } catch (error) {
        console.log(error);
    }
};

const handleSearch = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/dacenshow/getdacen?input=${searchInput}`
        );
        setSearchResult(response.data.data);
    }catch (error) {
        console.log(error);
    }
};

  return (
    <>
    <Header />
    <div style={{ position: 'absolute', top: 30, right: 45 }}>
                <FormSearch
                    placeholder="Find Data Center Project "
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
        </div>
            <div className="flex-grow bg-[#FFFFFF] justify-center items-center min-h-screen bg-white rounded-xl px-3">
            <div className=" bw-full px-5 py-2 mt-4">
                <div className="w-full flex justify-between items-center">
                </div>                
            </div>
            {dataAllDacen && (!searchResult || searchInput == "") ? (

                <div className="">
                    <Body
                        headers={Object.keys(dataAllDacen[0]).slice(
                            0,
                            Object.keys(dataAllDacen[0]).length - 1
                        )}
                        data={dataAllDacen}
                        action={true}
                        link={"/main/operation/"}
                    />
                </div>
            ) : (
                !(searchResult && searchInput != "") && <PleaseWait/>
            )}

            {searchResult && searchInput != "" && searchResult.length !== 0 && (
                <div className="mt-4">
                    <Body
                        headers={Object.keys(searchResult[0]).slice(
                            0,
                            Object.keys(searchResult[0]).length - 1
                        )}
                        data={searchResult}
                        action={true}
                        link={"/main/operation/"}
                    />
                </div>
            )}

            {searchResult && searchInput != "" && searchResult.length === 0 && (
                <NotFound />
            )}

            {dataAllDacen &&  (
                <div className="w-full flex justify-end items-center gap-3 mt-2">
                    <button
                        disabled={currentPage === 1 || startIndex === 0}
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            setStartIndex(startIndex - 10);
                        }}
                        className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
                    >
                        Prev
                    </button>
                    <h5 className="font-semibold">{currentPage}</h5>
                    <button
                        disabled={
                            startIndex + perPage >= dataAllDacen[0].maxSize
                        }
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            setStartIndex(startIndex + 10);
                        }}
                        className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    </>
  );
}

export default page
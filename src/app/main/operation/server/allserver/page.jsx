'use client';

import Header from '@/components/operation/server/header/header_all_server';
import Body from '@/components/operation/server/body/operation_server_table';

import NotFound from "@/components/NotFound";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";

import { useEffect, useState } from "react";


import React from 'react'

const page = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dataAllServer, setDataAllServer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
      getDataAllServer();
  }, [startIndex]);

  const getDataAllServer = async () => {
      setDataAllServer(null);
      try {
          const response = await axios.get(
              `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow?start=${startIndex}&size=${perPage}`
          );
          setDataAllServer(response.data.data);
      } catch (error) {
          console.log(error);
      }
  };

  const handleSearch = async () => {
      try {
          const response = await axios.get(
              `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/getserver?input=${searchInput}`
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
                    placeholder="Find Server Project "
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
        </div>
            <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
            <div className=" bw-full px-5 py-2 mt-4">
                <div className="w-full flex justify-between items-center">
                </div>                
            </div>
            {dataAllServer && (!searchResult || searchInput == "") ? (

                <div className="">
                    <Body
                        headers={Object.keys(dataAllServer[0]).slice(
                            0,
                            Object.keys(dataAllServer[0]).length - 1
                        )}
                        data={dataAllServer}
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

            {dataAllServer &&  (
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
                            startIndex + perPage >= dataAllServer[0].maxSize
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
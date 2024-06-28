'use client';
import Header from '@/components/operation/server/header/header_my_server';
import Body from '@/components/operation/server/body/operation_server_my_server';
import React, { useEffect, useState } from "react";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import NotFound from "@/components/NotFound";
import { useStateContext } from "@/context/ContextProvider";
import axios from "axios";


const page = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dataAllServer, setDataAllServer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const { user } = useStateContext();

  useEffect(() => {
    if (user && user.userdomain) {
      getDataAllServer();
    } else {
      setDataAllServer([]);
    }
  }, [startIndex, user]); // Triggered whenever startIndex or user changes

  const getDataAllServer = async () => {
    setDataAllServer(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/userdomainprojects?start=${startIndex}&size=${perPage}&userdomain=${user.userdomain}`
      );
      setDataAllServer(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/servershow/getserver?input=${searchInput}`
      );
      setSearchResult(response.data.data);
      setCurrentPage(1);
      setStartIndex(0);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  const rowClass = (deadline) => {
    // Function to determine row class based on deadline, adjust as per your requirement
    // Example logic:
    return deadline ? (deadline < new Date() ? "bg-red-200" : "") : "";
  };

  return (
    <div>
    <Header title="My Project" />

    <div style={{ position: "absolute", top: 30, right: 45 }}>
      <FormSearch
        placeholder="Find Project"
        setState={setSearchInput}
        handleSubmit={handleSearch}
      />
    </div>
    <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
      <div className="w-full px-5 py-2 mt-4">
        <div className="w-full flex justify-between items-center"></div>
      </div>
      {dataAllServer && dataAllServer.length === 0 ? (
        <NotFound />
      ) : (
        <div>
          {dataAllServer && (!searchResult || searchInput === "") ? (
            <Body
              headers={Object.keys(dataAllServer[0]).slice(
                0,
                Object.keys(dataAllServer[0]).length - 1
              )}
              data={dataAllServer}
              action={true}
              link={"/main/operation/server/myserver/"}
              rowClass={rowClass} // Pass rowClass function as prop
            />
          ) : (
            !(searchResult && searchInput !== "") && <PleaseWait />
          )}

          {searchResult && searchInput !== "" && searchResult.length !== 0 && (
            <div className="mt-4">
              <Body
                headers={Object.keys(searchResult[0]).slice(
                  0,
                  Object.keys(searchResult[0]).length - 1
                )}
                data={searchResult}
                action={true}
                link={"/main/operation/server/myserver"}
                rowClass={rowClass} // Pass rowClass function as prop
              />
            </div>
          )}

          {searchResult && searchInput !== "" && searchResult.length === 0 && (
            <NotFound />
          )}

          {dataAllServer && (
            <div className="w-full flex justify-end items-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1 || startIndex === 0}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  setStartIndex(startIndex - 20);
                }}
                className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
              >
                Prev
              </button>
              <h5 className="font-semibold">{currentPage}</h5>
              <button
                type="button"
                disabled={startIndex + perPage >= dataAllServer[0].maxSize}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setStartIndex(startIndex + 20);
                }}
                className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
  );
}

export default page
"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import TableApproveSkse from "@/components/status/TableApproveSkse";
import HeaderStatusSkse from "@/components/status/header.jsx/HeaderStatusSkse";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [dataLog, setDataLog] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getAllDataLog();
    }, [startIndex], [refresh]);

    const getAllDataLog = async () => {
        setDataLog(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/skselog?start=${startIndex}&size=${perPage}`
            );
            setDataLog(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/skse/getskselog?input=${searchInput}`
            );
            setSearchResult(response.data.data);
            setCurrentPage(1);
            setStartIndex(0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefresh = () => {
        setRefresh(!refresh);
        getAllDataLog();
    };

    return (
        <div>
            <HeaderStatusSkse title="Approvement" />

            <div style={{ position: "absolute", top: 30, right: 45 }}>
                <FormSearch
                    placeholder="Find Project"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>
            <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
                <div className=" bw-full px-5 py-2 mt-4">
                    <div className="w-full flex justify-between items-center"></div>
                </div>
                {dataLog && (!searchResult || searchInput == "") ? (
                    <TableApproveSkse
                        headers={Object.keys(dataLog[0]).slice(
                            0,
                            Object.keys(dataLog[0]).length - 1
                        )}
                        data={dataLog}
                        parameter={"skse"}
                        action={true}
                        isRefresh={handleRefresh}
                    />
                ) : (
                    !(searchResult && searchInput != "") && <PleaseWait />
                )}
                {searchResult &&
                    searchInput != "" &&
                    searchResult.length !== 0 && (
                        <div className="mt-4">
                            <TableApproveSkse
                                headers={Object.keys(searchResult[0]).slice(
                                    0,
                                    Object.keys(searchResult[0]).length - 1
                                )}
                                data={searchResult}
                                parameter={"skse"}
                                action={true}
                                isRefresh={handleRefresh}
                            />
                        </div>
                    )}
                {searchResult &&
                    searchInput != "" &&
                    searchResult.length === 0 && <NotFound />}

                {dataLog && (
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
                            typr="button"
                            disabled={
                                startIndex + perPage >= dataLog[0].maxSize
                            }
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
        </div>
    );
};

export default Page;

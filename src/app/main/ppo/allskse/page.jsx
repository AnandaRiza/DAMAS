"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import TableSKSE from "@/components/skse/TableSKSE";
import HeaderSkse from "@/components/skse/header/HeaderSkse";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllSkse, setDataAllSkse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        getDataAllSkse();
    }, [startIndex]);

    const getDataAllSkse = async () => {
        setDataAllSkse(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allskse?start=${startIndex}&size=${perPage}`
            );
            const fetchedData = response.data.data;
            setDataAllSkse(fetchedData);
            setHasMoreData(fetchedData.length === perPage);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allskse/getskse?input=${searchInput}`
            );
            setSearchResult(response.data.data);
            setCurrentPage(1);
            setStartIndex(0);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <HeaderSkse title="All SK/SE" />

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
                
                {/* Render PleaseWait while loading */}
                {(!dataAllSkse && !searchResult) && <PleaseWait />}

                {/* Render TableSKSE if dataAllSkse has data and no searchResult or empty searchInput */}
                {dataAllSkse && dataAllSkse.length > 0 && (!searchResult || searchInput === "") && (
                    <div className="mt-4">
                        <TableSKSE
                            headers={Object.keys(dataAllSkse[0]).slice(0, Object.keys(dataAllSkse[0]).length - 1)}
                            data={dataAllSkse}
                            action={true}
                            link={"/main/ppo/allskse/"}
                        />
                    </div>
                )}

                {/* Render TableSKSE if searchResult has data */}
                {searchResult && searchInput !== "" && searchResult.length > 0 && (
                    <div className="mt-4">
                        <TableSKSE
                            headers={Object.keys(searchResult[0]).slice(0, Object.keys(searchResult[0]).length - 1)}
                            data={searchResult}
                            action={true}
                            link={"/main/ppo/allskse/"}
                        />
                    </div>
                )}

                {/* Render NotFound if searchResult is empty */}
                {searchResult && searchInput !== "" && searchResult.length === 0 && <NotFound />}

                {/* Render NotFound if dataAllSkse is empty */}
                {dataAllSkse && dataAllSkse.length === 0 && <NotFound />}

                {/* Pagination controls */}
                {dataAllSkse && (
                    <div className="w-full flex justify-end items-center gap-3">
                        <button
                            type="button"
                            disabled={currentPage === 1 || startIndex === 0}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                                setStartIndex(startIndex - perPage);
                            }}
                            className={`py-2 px-4 rounded-xl ${
                                currentPage === 1 || startIndex === 0 ? "bg-gray-400" : "bg-[#00A6B4]"
                            } text-white`}
                        >
                            Prev
                        </button>
                        <h5 className="font-semibold">{currentPage}</h5>
                        <button
                            type="button"
                            disabled={!hasMoreData}
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                                setStartIndex(startIndex + perPage);
                            }}
                            className={`py-2 px-4 rounded-xl ${
                                !hasMoreData ? "bg-gray-400" : "bg-[#00A6B4]"
                            } text-white`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;

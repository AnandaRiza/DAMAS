"use client";
import { useEffect, useState } from "react";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import HeaderLogistic from "@/components/logistic_components/header/HeaderLogistic";
import axios from "axios";
import DispositionTable from "@/tables/disposition";


const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        getDataAllMemo();
    }, [startIndex]);

    const getDataAllMemo = async () => {
        setDataAllMemo(null); 
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/disposition/all?start=${startIndex}&size=${perPage}`
            );
            const fetchedData = response.data.data;
            setDataAllMemo(fetchedData);
            setHasMoreData(fetchedData.length === perPage);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/disposition/getall?input=${searchInput}`
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
            <HeaderLogistic title="Disposisi Memo" />

            <div style={{ position: "absolute", top: 30, right: 45 }}>
                <FormSearch
                    placeholder="Find Memo"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>

            <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
                <div className="w-full px-5 py-2 mt-4">
                    <div className="w-full flex justify-between items-center"></div>
                </div>

                {!dataAllMemo && !searchResult && <PleaseWait />}

                {dataAllMemo && dataAllMemo.length > 0 && !searchResult && (
                    <div className="mt-4">
                        <DispositionTable
                            headers={Object.keys(dataAllMemo[0]).slice(0, Object.keys(dataAllMemo[0]).length - 1)}
                            data={dataAllMemo}
                            action={true}
                            link={"/main/memo/disposisimemo"}
                        />
                    </div>
                )}

                {searchResult && searchResult.length === 0 && <NotFound />}

                {searchResult && searchResult.length > 0 && searchInput !== "" && (
                    <div className="mt-4">
                        <DispositionTable
                            headers={Object.keys(searchResult[0]).slice(0, Object.keys(searchResult[0]).length - 1)}
                            data={searchResult}
                            action={true}
                            link={"/main/memo/disposisimemo"}
                        />
                    </div>
                )}

                {dataAllMemo && dataAllMemo.length === 0 && <NotFound />}

                {dataAllMemo && dataAllMemo.length > 0 && (
                    <div className="w-full flex justify-end items-center gap-3 mt-4">
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

export default Page;

"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import LogisticTable from "@/components/logistic_components/logistic_table";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    useEffect(() => {
        getDataAllMemo();
    }, [startIndex]);

    const getDataAllMemo = async () => {
        setDataAllMemo(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo?start=${startIndex}&size=${perPage}`
            );
            setDataAllMemo(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo/getmemo?input=${searchInput}`
            );
            setSearchResult(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedData = [...dataAllMemo].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setDataAllMemo(sortedData);
    };

    return (
        <div>
            <div className="w-full px-5 py-5 mt-4">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[#0066AE] font-semibold">All Memo</span>
                    <span className="text-end flex">
                        sort by <MdArrowDropDown className="ml-1 mt-auto" />
                    </span>
                </div>
                <FormSearch
                    placeholder="Find Memo"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>
            {dataAllMemo === null && <PleaseWait />}
            {dataAllMemo && dataAllMemo.length === 0 && (
                <div className="py-5 text-center text-red-500">
                    No memos found. Please check back later.
                </div>
            )}
            {dataAllMemo && dataAllMemo.length > 0 && (!searchResult || searchInput === "") && (
                <div className="mt-4">
                    <LogisticTable
                        headers={Object.keys(dataAllMemo[0]).slice(
                            0,
                            Object.keys(dataAllMemo[0]).length - 1
                        )}
                        data={dataAllMemo}
                        action={true}
                        link={"/main/logistic/"}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                </div>
            )}

            {searchResult && searchInput !== "" && searchResult.length !== 0 && (
                <div className="mt-4">
                    <LogisticTable
                        headers={Object.keys(searchResult[0]).slice(
                            0,
                            Object.keys(searchResult[0]).length - 1
                        )}
                        data={searchResult}
                        action={true}
                        link={"/main/logistic/"}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                </div>
            )}

            {searchResult && searchInput !== "" && searchResult.length === 0 && (
                <NotFound />
            )}

            {dataAllMemo && dataAllMemo.length > 0 && !searchResult && (
                <div className="w-full flex justify-end items-center gap-3">
                    <button
                        type="button"
                        disabled={currentPage === 1 || startIndex === 0}
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            setStartIndex(startIndex - perPage);
                        }}
                        className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
                    >
                        Prev
                    </button>
                    <h5 className="font-semibold">{currentPage}</h5>
                    <button
                        type="button"
                        disabled={dataAllMemo.length < perPage}
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            setStartIndex(startIndex + perPage);
                        }}
                        className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;

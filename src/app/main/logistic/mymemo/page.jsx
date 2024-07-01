"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import HeaderLogistic from "@/components/logistic_components/header/HeaderLogistic";
import MyMemoTable from "@/components/logistic_components/logistic_mymemo_table";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        getDataAllMemo();
    }, [startIndex]);

    const getDataAllMemo = async () => {
        setDataAllMemo(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo?start=${startIndex}&size=${perPage}`
            );
            const fetchedData = response.data.data;
            setDataAllMemo(fetchedData);
            setHasMoreData(fetchedData.length === perPage);
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
            if (key === 'memo_status') {
                const statusOrder = [
                    "MEMO DRAFT",
                    "APPROVAL REQUEST SENT ",
                    "REQUEST HAS BEEN REJECTED",
                    "MEMO APPROVED"
                ];
                const aStatusIndex = statusOrder.indexOf(a[key]);
                const bStatusIndex = statusOrder.indexOf(b[key]);

                if (aStatusIndex === bStatusIndex) {
                    const aDeadline = new Date(a['memo_deadline']);
                    const bDeadline = new Date(b['memo_deadline']);
                    return direction === 'ascending' ? aDeadline - bDeadline : bDeadline - aDeadline;
                } else {
                    return direction === 'ascending' ? aStatusIndex - bStatusIndex : bStatusIndex - aStatusIndex;
                }
            } else if (key === 'memo_deadline') {
                const aDeadline = new Date(a[key]);
                const bDeadline = new Date(b[key]);
                return direction === 'ascending' ? aDeadline - bDeadline : bDeadline - aDeadline;
            } else {
                if (a[key] < b[key]) {
                    return direction === "ascending" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === "ascending" ? 1 : -1;
                }
                return 0;
            }
        });
        setDataAllMemo(sortedData);
    };

    return (
        <div>
            <HeaderLogistic title="My Memo" />

            <div style={{ position: "absolute", top: 30, right: 45 }}>
                <FormSearch
                    placeholder="Find Memo"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>
            <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
                <div className="bw-full px-5 py-2 mt-4">
                    <div className="w-full flex justify-between items-center"></div>
                </div>
                {dataAllMemo === null && <PleaseWait />}
                {dataAllMemo && (
                    <>
                        {dataAllMemo.length === 0 ? (
                            <div className="py-5 text-center text-red-500">
                                No memos found. Please check back later.
                            </div>
                        ) : (
                            <div className="mt-4">
                                <MyMemoTable
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
                    </>
                )}

                {searchResult && searchInput !== "" && (
                    <>
                        {searchResult.length === 0 ? (
                            <NotFound />
                        ) : (
                            <div className="mt-4">
                                <MyMemoTable
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
                    </>
                )}

                {dataAllMemo && !searchResult && (
                    <div className="w-full flex justify-end items-center gap-3">
                        <button
                            type="button"
                            disabled={currentPage === 1 || startIndex === 0}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                                setStartIndex(startIndex - perPage);
                            }}
                            className={`py-2 px-4 rounded-xl ${currentPage === 1 || startIndex === 0 ? 'bg-gray-400' : 'bg-[#00A6B4]'} text-white`}
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
                            className={`py-2 px-4 rounded-xl ${!hasMoreData ? 'bg-gray-400' : 'bg-[#00A6B4]'} text-white`}
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
  
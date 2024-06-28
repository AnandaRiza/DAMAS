"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import ApprovalTable from "@/components/logistic_components/approval_components/logistic_approval_table";
import ApprovalTableReviewer from "@/components/logistic_components/approval_components_supervisor/logistic_approval_table";
import HeaderStatusLogistic from "@/components/logistic_components/header/HeaderStatusLogistic";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";


const ApprovalPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(100);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const getDataAllMemo = useCallback(async () => {
        setDataAllMemo(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo`,
                {
                    params: {
                        memo_status: "APPROVAL REQUEST SENT",
                        start: startIndex,
                        size: perPage,
                    },
                }
            );
            console.log("API Response:", response.data.data); // Log API response
            setDataAllMemo(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [startIndex, perPage]);

    useEffect(() => {
        getDataAllMemo();
    }, [getDataAllMemo]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo/getmemo`,
                {
                    params: {
                        input: searchInput,
                        memo_status: "APPROVAL REQUEST SENT",
                    },
                }
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
            <HeaderStatusLogistic title="Logistic Approval Request for Reviewer" />

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
                {dataAllMemo && (!searchResult || searchInput === "") ? (
                    <div className="mt-4">
                        <ApprovalTableReviewer
                            headers={Object.keys(dataAllMemo[0]).slice(
                                0,
                                Object.keys(dataAllMemo[0]).length - 1
                            )}
                            data={dataAllMemo}
                            action={true}
                            link={"/main/status/approvelogistic_supervisor/"}
                            onSort={handleSort}
                            sortConfig={sortConfig}
                        />
                    </div>
                ) : (
                    !(searchResult && searchInput !== "") && <PleaseWait />
                )}

                {searchResult &&
                    searchInput !== "" &&
                    searchResult.length !== 0 && (
                        <div className="mt-4">
                            <ApprovalTableReviewer
                                headers={Object.keys(searchResult[0]).slice(
                                    0,
                                    Object.keys(searchResult[0]).length - 1
                                )}
                                data={searchResult}
                                action={true}
                                link={"/main/status/approvelogistic_supervisor/"}
                                onSort={handleSort}
                                sortConfig={sortConfig}
                            />
                        </div>
                    )}

                {searchResult &&
                    searchInput !== "" &&
                    searchResult.length === 0 && <NotFound />}

                {dataAllMemo && !searchResult && (
                    <div className="w-full flex justify-end items-center gap-3">
                        <button
                            type="button"
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
                            type="button"
                            disabled={
                                startIndex + perPage >= dataAllMemo[0].maxSize
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
        </div>
    );
};

export default ApprovalPage;

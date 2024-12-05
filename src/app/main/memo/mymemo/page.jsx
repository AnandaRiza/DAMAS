"use client";
import { useEffect, useState } from "react";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import HeaderLogistic from "@/header/HeaderAllMemo";
import LogisticTable from "@/components/logistic_components/table/logistic_table_mymemo";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";

const Page = () => {
    const { user } = useStateContext();
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        getDataAllMemo();
    }, [startIndex, user]);

    const getDataAllMemo = async () => {
        if (!user || !user.userdomain) return;

        setDataAllMemo(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/findregister/all?start=${startIndex}&size=${perPage}`
            );
            const fetchedData = response.data.data;
            
            // Filter the fetched data based on userdomain_pic matching user.userdomain
            const filteredMemos = fetchedData.filter(memo => 
                memo.userdomainpic?.toLowerCase() === user.userdomain.toLowerCase()
            );

            setDataAllMemo(filteredMemos);
            setHasMoreData(filteredMemos.length === perPage);
        } catch (error) {
            console.error("Error fetching data:", error);
            setDataAllMemo([]);
        }
    };

    const handleSearch = async () => {
        if (!user || !user.userdomain) return;

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/findregister/memo?input=${searchInput}`
            );  

            // Filter the search results based on userdomain_pic matching user.userdomain
            const filteredMemos = response.data.data.filter(memo => 
                memo.userdomain_pic?.toLowerCase() === user.userdomain.toLowerCase()
            );

            setSearchResult(filteredMemos);
            setCurrentPage(1);
            setStartIndex(0);
        } catch (error) {
            console.log(error);
            setSearchResult([]);
        }
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
                <div className="w-full px-5 py-2 mt-4">
                    <div className="w-full flex justify-between items-center"></div>
                </div>

                {!dataAllMemo && !searchResult && <PleaseWait />}

                {dataAllMemo &&
                    dataAllMemo.length > 0 &&
                    (!searchResult || searchInput === "") && (
                        <div className="mt-4">
                            <LogisticTable
                                headers={Object.keys(dataAllMemo[0]).slice(
                                    0,
                                    Object.keys(dataAllMemo[0]).length - 1
                                )}
                                data={dataAllMemo}
                                action={true}
                                link={"/main/memo/mymemo/"}
                            />
                        </div>
                    )}

                {searchResult &&
                    searchInput !== "" &&
                    searchResult.length > 0 && (
                        <div className="mt-4">
                            <LogisticTable
                                headers={Object.keys(searchResult[0]).slice(
                                    0,
                                    Object.keys(searchResult[0]).length - 1
                                )}
                                data={searchResult}
                                action={true}
                                link={"/main/memo/mymemo/"}
                            />
                        </div>
                    )}

                {((searchResult && searchInput !== "" && searchResult.length === 0) || 
                  (dataAllMemo && dataAllMemo.length === 0)) && (
                    <div className="text-center text-gray-600 mt-10 text-xl">
                        No memos available for you.
                    </div>
                )}

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
                                currentPage === 1 || startIndex === 0
                                    ? "bg-gray-400"
                                    : "bg-[#00A6B4]"
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

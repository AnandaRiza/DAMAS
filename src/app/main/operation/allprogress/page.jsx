"use client";
import NetworkTable from '@/components/operation/operation_network_table';
import NotFound from "@/components/NotFound";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";
import { useEffect, useState } from "react";

import { MdArrowDropDown } from "react-icons/md";

const page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllNetwork, setDataAllNetwork] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getDataAllNetwork();
    }, [startIndex]);

    const getDataAllNetwork = async () => {
        setDataAllNetwork(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow?start=${startIndex}&size=${perPage}`
            );
            setDataAllNetwork(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/networkshow/getnetwork?input=${searchInput}`
            );
            setSearchResult(response.data.data);
        }catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="w-full px-5 py-5 mt-4">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[#0066AE] font-semibold">
                        All Project Network
                    </span>
                    <span className="text-end flex">
                        {" "}
                        sort by <MdArrowDropDown className="ml-1 mt-auto" />
                    </span>
                </div>
                <FormSearch
                    placeholder="Find Network"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>
            {dataAllNetwork && (!searchResult || searchInput == "") ? (

                <div className="mt-4">
                    <NetworkTable
                        headers={Object.keys(dataAllNetwork[0]).slice(
                            0,
                            Object.keys(dataAllNetwork[0]).length - 1
                        )}
                        data={dataAllNetwork}
                        action={true}
                        link={"/main/operation/"}
                    />
                </div>
            ) : (
                !(searchResult && searchInput != "") && <PleaseWait/>
            )}

            {searchResult && searchInput != "" && searchResult.length !== 0 && (
                <div className="mt-4">
                    <NetworkTable
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

            {dataAllNetwork && !searchResult &&  (
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
                            startIndex + perPage >= dataAllNetwork[0].maxSize
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
    );
};

export default page;

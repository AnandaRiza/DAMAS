"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import TableSDLC from "@/components/sdlc/TableSDLC";
import axios from "axios";
import { useEffect, useState } from "react";

import { MdArrowDropDown } from "react-icons/md";

const page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllProject, setDataAllProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(8);

    useEffect(() => {
        getDataAllProject();
    }, [startIndex]);

    const getDataAllProject = async () => {
        setDataAllProject(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject?start=${startIndex}&size=${perPage}`
            );
            setDataAllProject(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/getproject?input=${searchInput}`
            );
            setSearchResult(response.data.data);
            setCurrentPage(1);
            setStartIndex(0);
        }catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="w-full px-5 py-5 mt-4">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[#0066AE] font-semibold">
                        All Project
                    </span>
                    <span className="text-end flex">
                        {" "}
                        sort by <MdArrowDropDown className="ml-1 mt-auto" />
                    </span>
                </div>
                <FormSearch
                    placeholder="Find Project"
                    setState={setSearchInput}
                    handleSubmit={handleSearch}
                />
            </div>
            {dataAllProject && (!searchResult || searchInput == "") ? (
            
                <div className="mt-4">
                    <TableSDLC
                        headers={Object.keys(dataAllProject[0]).slice(
                            0,
                            Object.keys(dataAllProject[0]).length - 1
                        )}
                        data={dataAllProject}
                        action={true}
                        link={"/main/development/"}
                    />
                </div>
            ) : (
                !(searchResult && searchInput != "") && <PleaseWait />
            )}
            
            {searchResult && searchInput != "" && searchResult.length !== 0 && (
                <div className="mt-4">
                    <TableSDLC
                        headers={Object.keys(searchResult[0]).slice(
                            0,
                            Object.keys(searchResult[0]).length - 1
                        )}
                        data={searchResult}
                        action={true}
                        link={"/main/development/"}
                    />
                </div>
            )}

            {searchResult && searchInput != "" && searchResult.length === 0 && (
                <NotFound />
            )}



            {dataAllProject && (
                <div className="w-full flex justify-end items-center gap-3">
                    <button
                    type="button"
                        disabled={currentPage === 1 || startIndex === 0}
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            setStartIndex(startIndex - 8);
                        }}
                        className="py-2 px-4 rounded-xl bg-[#00A6B4] text-white"
                    >
                        Prev
                    </button>
                    <h5 className="font-semibold">{currentPage}</h5>
                    <button
                    typr="button"
                        disabled={
                            startIndex + perPage >= dataAllProject[0].maxSize
                        }
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            setStartIndex(startIndex + 8);
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

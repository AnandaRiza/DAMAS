"use client"
import React, { useEffect, useState } from "react";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import TableSDLC from "@/components/sdlc/TableSDLC";
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";

const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [dataAllProject, setDataAllProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [hasMoreData, setHasMoreData] = useState(true);

    const { user } = useStateContext();

    useEffect(() => {
        if (user && user.userdomain) {
        getDataAllProject();
        } else {
            setDataAllProject([]);
        }
    }, [startIndex, user]);


    const getDataAllProject = async () => {
        setDataAllProject(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/frsproject?start=${startIndex}&size=${perPage}&employee=${user.userdomain}`
            );
            console.log(user.userdomain)
            const fetchedData = response.data.data;
            setDataAllProject(fetchedData);
            setHasMoreData(fetchedData.length === perPage); 
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/search?input=${searchInput}`
            );
            setSearchResult(response.data.data);
            setCurrentPage(1);
            setStartIndex(0);
            setHasMoreData(response.data.data.length === perPage);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <HeaderDev title="All Project" />

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
                {(!dataAllProject && !searchResult) && <PleaseWait />}
                
                {dataAllProject && dataAllProject.length > 0 && (!searchResult || searchInput === "") && (
                    <div>
                        <TableSDLC
                            headers={[
                                'projectNumber',
                                'bcasNoPMO',
                                'projectName',
                                'summary',
                                'owner',
                                'bcasJenisAplikasi',
                                'status',
                                'createdDateTime',
                                'projectEndDate'
                            ]}
                            data={dataAllProject}
                            action={true}
                            link={"/main/development/"}
                        />
                    </div>
                )}

                {searchResult && searchInput !== "" && searchResult.length > 0 && (
                    <div className="mt-4">
                        <TableSDLC
                            headers={[
                                'projectNumber',
                                'bcasNoPMO',
                                'projectName',
                                'summary',
                                'owner',
                                'bcasJenisAplikasi',
                                'status',
                                'createdDateTime',
                                'projectEndDate'
                            ]}
                            data={searchResult}
                            action={true}
                            link={"/main/development/"}
                        />
                    </div>
                )}

                {(dataAllProject && dataAllProject.length === 0) && <NotFound />}
                {(searchResult && searchInput !== "" && searchResult.length === 0) && <NotFound />}

                {dataAllProject && (
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
                                if (hasMoreData) {
                                    setCurrentPage(currentPage + 1);
                                    setStartIndex(startIndex + perPage);
                                }
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

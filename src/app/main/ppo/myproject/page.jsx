"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderDev from "@/components/sdlc/header/HeaderDev";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import NotFound from "@/components/NotFound";
import { useStateContext } from "@/context/ContextProvider";
import MyProjectPpo from "@/components/Ppo/myproject/MyProjectPpo";

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
    }, [startIndex, user]); // Triggered whenever startIndex or user changes

    const getDataAllProject = async () => {
        setDataAllProject(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allproject/userdomainprojects?start=${startIndex}&size=${perPage}&userdomain=${user.userdomain}`
            );
            const fetchedData = response.data.data;
            setDataAllProject(fetchedData);
            setHasMoreData(fetchedData.length === perPage);
        } catch (error) {
            console.error("Error fetching data:", error);
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
        } catch (error) {
            console.error("Error searching projects:", error);
        }
    };

    const rowClass = (deadline) => {
        // Function to determine row class based on deadline, adjust as per your requirement
        // Example logic:
        return deadline ? (deadline < new Date() ? "bg-red-200" : "") : "";
    };

    return (
        <div>
            <HeaderDev title="My Project" />

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

                {dataAllProject && dataAllProject.length === 0 ? (
                    <NotFound />
                ) : (
                    <div>
                        {dataAllProject &&
                        (!searchResult || searchInput === "") ? (
                            <MyProjectPpo
                                headers={Object.keys(dataAllProject[0]).slice(
                                    0,
                                    Object.keys(dataAllProject[0]).length - 1
                                )}
                                data={dataAllProject}
                                action={true}
                                link={"/main/ppo/myproject"}
                                rowClass={rowClass} // Pass rowClass function as prop
                            />
                        ) : (
                            !(searchResult && searchInput !== "") && (
                                <PleaseWait />
                            )
                        )}

                        {searchResult &&
                            searchInput !== "" &&
                            searchResult.length !== 0 && (
                                <div className="mt-4">
                                    <MyProjectPpo
                                        headers={Object.keys(
                                            searchResult[0]
                                        ).slice(
                                            0,
                                            Object.keys(searchResult[0])
                                                .length - 1
                                        )}
                                        data={searchResult}
                                        action={true}
                                        link={"/main/ppo/myproject"}
                                        rowClass={rowClass} // Pass rowClass function as prop
                                    />
                                </div>
                            )}

                        {searchResult &&
                            searchInput !== "" &&
                            searchResult.length === 0 && <NotFound />}

                        {dataAllProject && (
                            <div className="w-full flex justify-end items-center gap-3">
                                <button
                                    type="button"
                                    disabled={
                                        currentPage === 1 || startIndex === 0
                                    }
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
                                        !hasMoreData
                                            ? "bg-gray-400"
                                            : "bg-[#00A6B4]"
                                    } text-white`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;

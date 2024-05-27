"use client";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import TableLogistic from "@/components/logistic_components/logistic_table";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const Page = () => {
    const [searchInput, setSearchInput] = useState("");
    const [dataAllMemo, setDataAllMemo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getDataAllMemo();
    }, [startIndex]);

    const getDataAllMemo = async () => {
        setDataAllMemo(null);
        const url = `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo?start=${startIndex}&size=${perPage}`;
        console.log("Fetching data from URL:", url);

        // Validate parameters
        if (isNaN(startIndex) || isNaN(perPage)) {
            console.error("Invalid parameters: startIndex and perPage must be numbers");
            return;
        }

        try {
            const response = await axios.get(url);
            setDataAllMemo(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request data:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
        }
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
                />
            </div>
            {dataAllMemo ? (
                <div className="mt-4">
                    <TableLogistic
                        headers={Object.keys(dataAllMemo[0]).slice(
                            0,
                            Object.keys(dataAllMemo[0]).length - 1
                        )}
                        data={dataAllMemo}
                        action={true}
                    />  
                </div>
            ) : (
                <PleaseWait />
            )}

            {dataAllMemo && (
                <div className="w-full flex justify-end items-center gap-3">
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
                        disabled={startIndex + perPage >= dataAllMemo[0].maxSize}
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

export default Page;

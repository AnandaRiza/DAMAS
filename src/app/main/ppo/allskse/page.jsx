"use client";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import TableSKSE from "@/components/skse/TableSKSE";


import axios from "axios";
import { useEffect, useState } from "react";

import { MdArrowDropDown } from "react-icons/md";

const page = () => {
    const [serachInput, setSearchInput] = useState("");
    const [dataAllSkse, setDataAllSkse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getDataAllSkse();
    }, [startIndex]);

    const getDataAllSkse = async () => {
        setDataAllSkse(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allskse?start=${startIndex}&size=${perPage}`
            );
            setDataAllSkse(response.data.data);
        } catch (error) {
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
                    placeholder="Find SK/SE"
                    setState={setSearchInput}
                />
            </div>
            {dataAllSkse ? (
                <div className="mt-4">
                    <TableSKSE
                        headers={Object.keys(dataAllSkse[0]).slice(
                            0,
                            Object.keys(dataAllSkse[0]).length - 1
                        )}
                        data={dataAllSkse}
                        action={true}
                    />
                </div>
            ) : (
                <PleaseWait />
            )}

            {dataAllSkse && (
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
                        disabled={
                            startIndex + perPage >= dataAllSkse[0].maxSize
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

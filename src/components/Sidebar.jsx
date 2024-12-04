"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";

const Sidebar = () => {
    const { isOperatorDpti, setIsOperatorDpti } = useStateContext();
    const { isAdminMemo, setIsAdminMemo } = useStateContext();

    useEffect(() => {
        const getIsOperatorDpti = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/validation/Spv-Dpti`
                );
                const fetchedData = response.data.data;
                setIsOperatorDpti(fetchedData);
            } catch (error) {
                console.log(error);
            }
        };

        const getAdminMemo = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/validation/admin-register`
                );
                const fetchedData = response.data.data;
                setIsAdminMemo(fetchedData);
            } catch (error) {
                console.log(error);
            }
        };
        getIsOperatorDpti();
        getAdminMemo();
    }, []);

    return (
        <div
            className={`fixed top-0 flex w-[270px] transition-width duration-300 h-full overflow-auto bg-[#00A6B4]/[0.5]
                 p-2 ml-4 mt-20 rounded-xl shadow-r-md`}
        >
            <div className="w-full">
                <div className="w-full mb-2">
                    <Link href="/main/memo/register">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Register 
                            </button>
                        </div>
                    </Link>
                </div>

                {isAdminMemo && (
                    <div className="w-full mb-2">
                        <Link href="/main/memo/disposisimemo">
                            <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                                <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                    Disposition 
                                </button>
                            </div>
                        </Link>
                    </div>
                )}

                {isAdminMemo && (
                    <div className="w-full mb-2">
                        <Link href="/main/memo/allmemo">
                            <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                                <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                    All Document
                                </button>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="w-full mb-2">
                    <Link href="/main/memo/draftmemo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Draft
                            </button>
                        </div>
                    </Link>
                </div>

                {/* My Memo */}
                <div className="w-full mb-2">
                    <Link href="/main/ppo">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                My Document
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Approval */}
                <div className="w-full mb-2">
                    <Link href="/main/status/approvelogistic_supervisor">
                        <div className="hover:bg-[#ACC8E5] rounded bg-base-200 text-center w-full justify-center">
                            <button className="w-full justify-center text-[#112A46] text-lg font-bold p-4">
                                Approval
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

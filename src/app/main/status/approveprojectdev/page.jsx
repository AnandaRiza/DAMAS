"use client";
import NotFound from "@/components/NotFound";
import TableApprove from "@/components/status/TableApprove";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [dataLog, setDataLog] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAllDataLog();
    }, [refresh]);

    const getAllDataLog = async () => {
        setDataLog(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/projectdev/log`
            );
            setDataLog(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefresh = () => {
        setRefresh(!refresh);
        getAllDataLog();
    };

    return (
        <div>
            <div className="w-full px-5 py-5 mt-4">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[#0066AE] font-semibold">
                        Approvement
                    </span>
                </div>
            </div>
            {dataLog && dataLog.length !==0 ? (
                <TableApprove
                    headers={Object.keys(dataLog[0]).slice(1)}
                    data={dataLog}
                    parameter={"projectdev"}
                    action={true}
                    isRefresh={handleRefresh}
                />
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Page;

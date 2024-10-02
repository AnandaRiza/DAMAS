"use client";
import React from "react";
import { useParams } from "next/navigation";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";
import DetailMemoPage from "@/components/logistic_components/logistic_detail/logistic_detail_form";

const Page = () => {
    const { memoId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl">
                <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                    Detail Memo
                </div>
                <LogisticBreadcrumbs />
                <div className="px-10 mt-10">
                    <DetailMemoPage memoId={memoId} />
                </div>
            </div>
        </div>
    );
};

export default Page;

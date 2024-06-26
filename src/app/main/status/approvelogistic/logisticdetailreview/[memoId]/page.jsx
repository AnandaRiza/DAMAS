"use client";
import React from "react";
import { useParams } from "next/navigation";
import ReviewMemoPage from "@/components/logistic_components/approval_components/logistic_approval_review";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";
import ApprovalDetailTable from "@/components/logistic_components/approval_components/logistic_approval_detail";

const ReviewMemoDetail = () => {
    const { memoId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl">
                <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                    Review Memo
                </div>
                <LogisticBreadcrumbs />
                <div className="px-10 mt-10">
                    <ApprovalDetailTable memoId={memoId} />
                </div>
            </div>
        </div>
    );
};

export default ReviewMemoDetail;


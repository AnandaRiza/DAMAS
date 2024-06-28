"use client";
import React from "react";
import { useParams } from "next/navigation";
import ReviewMemoPage from "@/components/logistic_components/approval_components/logistic_approval_review";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";
import ReviewMemoSupervisorPage from "@/components/logistic_components/approval_components_supervisor/logistic_approval_review";

const ReviewMemo = () => {
    const { memoId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl">
                <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                    Review Memo
                </div>
                <LogisticBreadcrumbs />
                <div className="px-10 mt-10">
                    <ReviewMemoSupervisorPage memoId={memoId} />
                </div>
            </div>
        </div>
    );
};

export default ReviewMemo;


import React from "react";
import { useRouter } from "next/router";
import EditMemoForm from "@/components/logistic_components/logistic_edit_memo_form";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";

const Page = () => {
    const router = useRouter();
    const { memoId } = router.query;

    // Debugging output
    console.log("memoId from query:", memoId);

    return (
        <>
            <div className="flex-grow justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl">
                    <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                        Edit Memo
                    </div>
                    {/* breadcrumbs */}
                    <LogisticBreadcrumbs />

                    <div className="px-10 mt-10">
                        {memoId ? (
                            <EditMemoForm memoId={memoId} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;

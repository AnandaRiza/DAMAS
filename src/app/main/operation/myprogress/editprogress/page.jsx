import React from "react";
import EditMemoForm from "@/components/logistic_components/logistic_edit_memo_form";
import LogisticBreadcrumbs from "@/components/logistic_components/logistic_breadcrumbs";
import EditProgressForm from "@/components/operation/network/body/operation_network_edit_form";

const page = () => {
    return (
        <>
            <div className="flex-grow justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl">
                    <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                        Edit Progress Network
                    </div>
                    {/* breadcrumbs */}
                    <LogisticBreadcrumbs />

                    <div className="px-10 mt-10">
                        <EditProgressForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;

import React from "react";
import SDLC_form_edit from "@/components/sdlc/sdlc_form_edit";

const page = () => {
    return (
        <>
            <div className="flex-grow justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl">
                    <div className="text-[#0066AE] font-semibold ml-10 mt-4">
                        Edit Project
                    </div>
                    <div className="px-10 mt-10">
                        <SDLC_form_edit />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;

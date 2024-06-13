import HeaderDev from "@/components/sdlc/header/HeaderDev";
import SDLCForm from "@/components/sdlc/sdlc_form";
import React from "react";

const page = () => {
    return (
        <>
            <div>
               <div>
               <HeaderDev title="Create New Project" />
               </div>                   
                <div>
                    <SDLCForm />
                </div>
            </div>
        </>
    );
};

export default page;

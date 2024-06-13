import HeaderAll from "@/components/sdlc/header/HeaderAll";
import SDLCForm from "@/components/sdlc/sdlc_form";
import React from "react";

const page = () => {
    return (
        <>
            <div>
               <div>
               <HeaderAll title="Create New Project" />

               </div>
                   
             
                <div>
                    <SDLCForm />
                </div>
            </div>
        </>
    );
};

export default page;

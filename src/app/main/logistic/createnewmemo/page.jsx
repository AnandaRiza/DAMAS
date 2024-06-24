import HeaderLogistic from "@/components/logistic_components/header/HeaderLogistic";
import MemoForm from "@/components/logistic_components/logistic_memo_form";
import React from 'react'

const page = () => {
        return (
        <>
            <div>
               <div>
               <HeaderLogistic title="Create New Memo" />
               </div>                   
                <div>
                    <MemoForm />
                </div>
            </div>
        </>
    );
};

export default page
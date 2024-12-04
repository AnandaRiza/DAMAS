import HeaderLogistic from "@/header/HeaderAllMemo";
import MemoForm from "@/components/logistic_components/logistic_memo_form";
import React from 'react'

const page = () => {
        return (
        <>
            <div>
               <div>
               <HeaderLogistic title="Register Memo" />
               </div>                   
                <div>
                    <MemoForm />
                </div>
            </div>
        </>
    );
};

export default page
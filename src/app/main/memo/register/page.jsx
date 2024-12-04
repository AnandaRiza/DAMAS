import HeaderLogistic from "@/header/HeaderAllMemo";
import RegisterForm from "@/components/memo/registerform";
import React from 'react'

const page = () => {
        return (
        <>
            <div>
               <div>
               <HeaderLogistic title="Register Memo" />
               </div>                   
                <div>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default page
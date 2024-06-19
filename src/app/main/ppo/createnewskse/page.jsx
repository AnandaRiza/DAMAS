import HeaderSkse from '@/components/skse/header/HeaderSkse';
import SKSEForm from '@/components/skse/skse_form';
import React from 'react'

const page = () => {
  return (
    <>
       <div>
               <div>
               <HeaderSkse title="Create New SK/SE" />
               </div>                   
                <div>
                    <SKSEForm />
                </div>
            </div>
    </>
  );
};

export default page
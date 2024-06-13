import PpoForm from '@/components/Ppo/PpoForm';
import HeaderPpo from '@/components/sdlc/header/HeaderPpo';
import React from 'react'

const page = () => {
  return (
    <>
       <div>
               <div>
               <HeaderPpo title="Create New Project" />
               </div>
                <div>
                    <PpoForm />
                </div>
            </div>
    </>
  );
};

export default page
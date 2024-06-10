"use client";
import Headercreate from '@/components/Headercreate';

import Testingform from '@/components/testingform';
import Listtesting from '@/components/Listtesting';
import NetworkTable from '@/components/operation/network/body/operation_network_table';
import Footer from '@/components/Footer';



import React from 'react'

const page = () => {

  return (
      
            <>
            <Headercreate />
            <Testingform />
            {/* <Footer /> */}
            </>
  );
};

export default page
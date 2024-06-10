"use client";

import NetworkForm from '@/components/operation/network/body/operation_network_form';
import Header from '@/components/operation/network/header/header_create_new_project';
import React from 'react'

const page = () => {
  return (
    <>
            <Header />
            <NetworkForm />
            {/* <Footer /> */}
    </>
  );
};

export default page
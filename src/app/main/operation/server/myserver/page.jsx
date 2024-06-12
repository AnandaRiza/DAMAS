'use client';

import Header from '@/components/operation/server/header/header_my_server';
import Body from '@/components/operation/server/body/operation_server_my_server';

// import Body from '@/components/operation/serverr/body/operation_server_table';

import { useEffect, useState } from "react";


import React from 'react'

const page = () => {
  return (
    <>
    <Header />
    <Body />
    </>
  );
}

export default page
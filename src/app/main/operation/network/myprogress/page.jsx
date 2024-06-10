'use client';
import TableNetwork from '@/components/operation/network/body/operation_network_table';
import Header from '@/components/operation/network/header/header_my_project';
import Body from '@/components/operation/network/body/operation_network_my_project';



import React from 'react'


import NetworkForm from '@/components/operation/network/body/operation_network_form';
import Headertesting from '@/components/Headertesting';
import Testingform from '@/components/testingform';
import Listtesting from '@/components/Listtesting';
import NetworkTable from '@/components/operation/network/body/operation_network_table';

import NotFound from "@/components/NotFound";
import FormSearch from "@/components/FormSearch";
import PleaseWait from "@/components/PleaseWait";
import axios from "axios";

import { useEffect, useState } from "react";

import { MdArrowDropDown } from "react-icons/md";


const page = () => {
  return (
    <>
    <Header />
    <Body />
    </>
  );
}

export default page
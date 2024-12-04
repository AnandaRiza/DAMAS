"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useStateContext } from "@/context/ContextProvider";

const Sidebar = () => {
  const { isOperatorDpti, setIsOperatorDpti } = useStateContext();
  const { isAdminMemo, setIsAdminMemo } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [operatorResponse, adminResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/validation/Spv-Dpti`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/validation/admin-register`
          ),
        ]);

        setIsOperatorDpti(operatorResponse.data.data);
        setIsAdminMemo(adminResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setIsOperatorDpti, setIsAdminMemo]);

  const navItems = [
    { href: "/main/memo/register", label: "Register Memo" },
    { href: "/main/memo/disposisimemo", label: "Disposisi Memo" },
    { href: "/main/ppo", label: "My Memo" },
    {
      href: "/main/status/approvelogistic_supervisor",
      label: "Approval",
    },
  ];

  if (isOperatorDpti) {
    navItems.push({ href: "/main/logistic", label: "All Memo" });
  }

  return (
    <div
      className={`fixed top-0 flex flex-col w-[270px] transition-width duration-300 h-full overflow-auto bg-[#00A6B4]/50 p-4 ml-4 mt-20 rounded-xl shadow-md`}
    >
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="mb-2 block hover:bg-[#ACC8E5] rounded bg-base-200 text-center text-[#112A46] text-lg font-bold p-4 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;

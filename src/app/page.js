// 'import Footer from "@/components/Footer";
// import Landing_Page_Header from "@/components/Landing_Page_Header";
// import Link from "next/link";'
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return (
    <div className="min-h-[100vh] bg-[#FFFFF] flex flex-col">
      {/* <div className="w-full flex justify-between p-3 bg-[#00A6B4] bg-opacity-30 px-8 items-center ">
        <Landing_Page_Header title="Damas" />
        <Link href="/Login">
          <button className="rounded-lg w-24 h-11 text-[#DFDCE3] bg-[#0066AE]">
            Login
          </button>
        </Link>
      </div>
      <Footer /> */}
    </div>
  );
}

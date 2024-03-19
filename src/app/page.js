import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100vh] bg-[#FFFFF] flex flex-col">
      <div className="w-full flex justify-between p-3 bg-[#00A6B4] bg-opacity-30 px-8 items-center ">
        <Header title="Damas" />
        <Link href="/Login">
          <button className="rounded-lg w-24 h-11 text-[#DFDCE3] bg-[#0066AE]">
            Login
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}


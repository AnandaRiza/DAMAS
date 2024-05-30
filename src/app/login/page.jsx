"use client";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import HeaderLogin from "@/components/HeaderLogin";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PleaseWait from "@/components/PleaseWait";

const Page = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        userid: "",
        pass: "",
    });
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        try {
            const currentUserInfo = await axios.get(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/users`,
                {
                    headers: {
                        "USER-ID": form.userid,
                    },
                }
            );
            if (currentUserInfo.data.data.status == 1) {
                document.cookie = `DAMAS-USERID=${form.userid}; expires=; path=/`;
                router.push("/main");
                setIsLoading(false);
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/login`,
                    form
                );
                document.cookie = `DAMAS-USERID=${form.userid}; expires=; path=/`;
                router.push("/main");
                setIsLoading(false);
            }
        } catch (error) {
            setErrors(error.response.data.errors);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#00A6B4] bg-opacity-20">
            <HeaderLogin title="Damas" />
            <Footer />
            <div className="mt-32 flex flex-col justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-[450px]">
                    <form>
                        <div className="mb-4">
                            {errors && (
                                <div className="text-red-500 font-semibold text-sm ml-3 mb-1">
                                    <p>* {errors}</p>
                                </div>
                            )}
                            <h1 className="font-roboto font-bold text-2xl flex justify-center">
                                Login Page
                            </h1>
                            <div className="w-full h-[0.5px] bg-black mt-3"></div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800 mt-4"
                            >
                                Username
                            </label>
                            <input
                                type="username"
                                id="username"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        userid: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pass: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <Link href="/main">
                            <div className="mt-2">
                                <button
                                    className="w-full px-4 py-2 text-white transition-colors duration-200 transform bg-[#0066AE] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                    onClick={() => handleLogin()}
                                >
                                    {isLoading ? (
                                        <PleaseWait />
                                    ) : (
                                        <span className="text-sm font-semibold">
                                             Login
                                        </span>
                                    )}
                                   
                                </button>
                            </div>
                        </Link>

                        {/* <div className="w-full h-[0.5px] bg-black mt-3"></div>
                        <div className="mb-2">
                            <a className="text-xs text-blue-600 hover:underline flex justify-center mt-2">
                                Forget Password?
                            </a>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Page;

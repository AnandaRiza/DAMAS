"use client";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import HeaderLogin from "@/components/HeaderLogin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        userid: "",
        pass: "",
    });
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setErrors(null);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/login`,
                form
            );
            document.cookie = `DAMAS-USERID=${form.userid}; expires=; path=/`;
            router.push("/main");
            setIsLoading(false);

        } catch (error) {
            if (error.response?.data?.error === "userid already in use!") {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/logout?userid=${form.userid}`
                );
                try {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/login`,
                        form
                    );
                    document.cookie = `DAMAS-USERID=${form.userid}; expires=; path=/`;
                    router.push("/main");
                    setIsLoading(false);
                } catch (error) {
                    if (error.response?.data?.error === "userid is blocked!") {
                        setErrors("Your Userdomain is blocked!");
                        setIsLoading(false);
                    } else {
                        setErrors(error.response.data.error);
                        setIsLoading(false);
                    }
                }
            } else if (error.response?.data?.error === "userid is blocked!") {
                setErrors("Your Userdomain is blocked!");
                setIsLoading(false);
            } else {
                setErrors(error.response?.data?.error);
                setIsLoading(false);
                console.log("err4");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#00A6B4] bg-opacity-20">
            <HeaderLogin title="DAMAS" />
            <Footer />
            <div className="mt-32 flex flex-col justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-[450px]">
                    <form>
                        <div className="mb-4">
                            <h1 className="font-roboto font-bold text-2xl flex justify-center">
                                Login Page
                            </h1>
                            <div className="w-full h-[0.5px] bg-black mt-3"></div>
                            {errors && (
                                <div className="text-red-500 font-semibold text-sm mt-3">
                                    <p>* {errors}</p>
                                </div>
                            )}
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-gray-800 mt-4"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
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
                        <div className="relative w-full">
                            <label
                                htmlFor="Password"
                                className="block text-sm font-semibold text-gray-800 mt-4"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                id="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 pr-10"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pass: e.target.value,
                                    })
                                }
                            />
                            <button
                                onClick={handleToggle}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                }}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8"
                            >
                                {showPassword ? <LuEyeOff /> : <LuEye />}
                            </button>
                        </div>
                        
                        <div className="mt-5">
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-white transition-colors duration-200 transform bg-[#0066AE] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex justify-center gap-3">
                                        <p>Please wait</p>
                                        <span className="loading loading-spinner"></span>
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold">
                                        Login
                                    </span>
                                )}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;

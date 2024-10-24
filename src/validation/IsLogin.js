"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PleaseWait from '@/components/PleaseWait';
import { useStateContext } from '@/context/ContextProvider';

export const IsLogin = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { setUserAplikasi, setUser } = useStateContext();

    useEffect(() => {
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
        setUser((prevData) => ({
            ...prevData,
            userdomain: userid
        }))

        const fetchUserData = async () => {
            if (!userid) {
                router.push('/login');
                return;
            }

            // try {
                // const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/users`, {
                //     headers: { 'USER-ID': userid }
                // });
                // const userData = userResponse.data.data;

            //     // Check if the user is valid
            //     // if (userData.status !== 1) {
            //     //     router.push("/login");
            //     //     return;
            //     // }

            //     setUser(userData);

            // //     // const aplikasiResponse = await axios.get(
            // //     //     `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/usraplikasi`,
            // //     //     { headers: { "USER-ID": userid } }
            // //     // );

            // //     // setUserAplikasi(aplikasiResponse.data.data);

            // //     axios.defaults.headers.common['USER-ID'] = userid;

            // } catch (error) {
            //     console.error("Error fetching user data:", error.response ? error.response.data : error.message);
            //     router.push('/login');
            // } finally {
            //     setLoading(false);
            // }
        };

        fetchUserData();
    }, [router, setUser, setUserAplikasi]);

    // if (loading) {
    //     return <div><PleaseWait /></div>;
    // }

    return children;
};

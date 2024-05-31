"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiRefreshCw } from "react-icons/fi";
import PleaseWait from '@/components/PleaseWait';
 
export const IsLogin = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const userid = document.cookie.split('; ').find(row => row.startsWith('DAMAS-USERID='))?.split('=')[1];
       
        if (userid) {
            
            const getUserInfo = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/users`,
                {
                    headers: {
                        'USER-ID': userid
                    }
                });
                if (response.data.data.status != 1) {
                    router.push("/login")
                }
            }

            getUserInfo();
            
            axios.defaults.headers.common['USER-ID'] = userid;
        } else {
            router.push('/login');
        }

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);
 
 
    if (loading) {
        return <div>
           <PleaseWait/>
        </div>
    } else {
        return children
    }
}
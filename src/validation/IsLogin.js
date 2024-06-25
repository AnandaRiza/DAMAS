"use client"
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
       
        if (userid) {
            
            const getUserInfo = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/users`,
                {
                    headers: {
                        'USER-ID': userid
                    }
                });
                setUser(response.data.data);
                if (response.data.data.status != 1) {
                    router.push("/login")
                }
            }

            const getUserAplikasi = async () => {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/secure/usraplikasi`,
                    {
                        headers: {
                            "USER-ID": userid,
                        },
                    }
                );
                setUserAplikasi(response.data.data);
            };

            getUserInfo();
            getUserAplikasi();
            
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
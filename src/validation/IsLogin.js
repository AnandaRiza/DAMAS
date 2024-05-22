"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
export const IsLogin = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
       
        if (token) {
            axios.defaults.headers.common['X-API-TOKEN'] = token;
        } else {
            router.push('/login');
        }
 
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1000);
 
        return () => clearTimeout(timeoutId);
    }, []);
 
 
    if (loading) {
        return <div>Please Wait...</div>
    } else {
        return children
    }
}
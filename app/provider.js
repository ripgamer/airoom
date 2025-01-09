// app/provider.js
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({children}) {
    const {user} = useUser();
    const [userDetail,setUserDetail]=useState();
    useEffect(() => {
        if (user) {
            VerifyUser();
        }
    }, [user]);
    
    const VerifyUser = async () => {
        try {
            const dataResult = await axios.post('/api/verify-user', {
                user: user
            });
            setUserDetail(dataResult.data.result);
           // console.log("Verification result:", dataResult.data);
        } catch (error) {
            console.error("Error verifying user:", error.response?.data || error.message);
        }
    }
    
    return (
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        <div>
            {children}
        </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;
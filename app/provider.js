"use client"
import axios from 'axios';
import React, { children, useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
function Provider({children}) {
    
    const {user}=useUser();
    useEffect(()=>{
        user&&VerifyUser();
    },[user])
    
    const VerifyUser=async()=>{
        const dataResult=await axios.post('/api/verify-user',{
            user:user
        });
console.log(dataResult.data)

        }
    
  return (
    <div>
        {children}
      
    </div>
  )
}

export default Provider

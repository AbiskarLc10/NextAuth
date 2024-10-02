"use client"
import DashProfile from '@/components/DashProfile';
import DashSideBar from '@/components/DashSideBar';
import { Button } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const dashboard = () => {


  const {data: session} = useSession();
  const params = useSearchParams();
  const  tab = params.get('tab'); 


  return (
    <>
      {
           tab==="profile"?
           <DashProfile/>:<></>
      }
      
    </>
  )
}

export default dashboard

"use client";

import { RootState } from '@/store';
import { updateUser } from '@/store/userSlice/user-slice';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import { useDispatch, useSelector} from 'react-redux';


const Navbar = () => {

  const {email, password} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  const handleLogout = () => {
    if(email && password) {

      localStorage.removeItem("credential");
      localStorage.removeItem("buyArticles");
      dispatch(updateUser({type: "user", email: "", password: ""}));

    }
    
  }


  return (
    <div className='w-full bg-black text-white p-4 flex items-center justify-between font-bold sticky top-0 z-10'>

      <Link href="/">

      <Image src="/images/logo.svg" alt="logo" height={100} width={200} objectFit='cover'/>
      
      </Link>

      <Link href="/login" onClick={handleLogout}>{email && password ? "LogOut" : "Login"}</Link>
      
    </div>
  )
}

export default Navbar;

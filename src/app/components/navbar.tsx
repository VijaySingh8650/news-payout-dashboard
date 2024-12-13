
"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-black text-white p-4 flex items-center justify-between font-bold sticky top-0 z-10'>

      <Link href="/">

      <Image src="/images/logo.svg" alt="logo" height={100} width={200} objectFit='cover'/>
      
      </Link>

      <Link href="/login">Login</Link>
      
    </div>
  )
}

export default Navbar;

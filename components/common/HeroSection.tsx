import React from 'react'
import Navbar from './Navbar';
import heroBg from '@/assets/hero-bg.svg';
import { Inter, Montserrat } from 'next/font/google'
import Link from 'next/link';
import { AiFillRightCircle } from 'react-icons/ai';

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
export default function HeroSection() {
    return (
        <div style={{
            background: `url(${heroBg.src})`
        }} className='min-h-screen px-6 lg:px-[8.4rem] flex flex-col gap-y-32 pt-8 pb-40'>
            <Navbar className='bg-transparent text-white' color='white' />
            <div className={`flex flex-col text-center items-center lg:items-start lg:text-start gap-y-9 text-white ${montserrat.className} leading-normal`}>
                <h4 className='text-2xl font-semibold'>Just seconds away from</h4>
                <h1 className='text-7xl font-bold lg:max-w-[40vw]'>A WORLD OF LUXURY</h1>
                <p className={`text-lg max-w-[70%] lg:max-w-[30vw] ${inter.className}`}>Book and manage your entire vacation or business trip from flights, private jet charter flights, car rentals, hotels, and excursions with a few clicks.</p>
                <Link href={'/register'} className='flex bg-primary border border-primary transition-all duration-300 ease-in-out rounded-lg text-white hover:bg-white hover:text-primary  items-center gap-2.5 px-6 py-4'>
                    <p>Let&apos;s Start now</p>
                    <AiFillRightCircle />
                </Link>
            </div>
        </div>
    )
}
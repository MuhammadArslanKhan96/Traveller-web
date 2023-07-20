import Image from 'next/image'
import React from 'react'
import Success from '@/assets/succes.gif'
import Link from 'next/link'

const BookingSuccessCard = () => {
    return (
        <div className='bg-white flex gap-y-5 flex-col items-center justify-center p-10 text-center lg:p-14 rounded-xl'>
            <Image src={Success.src} alt='' width={135} height={135} />
            <p className='text-primary text-2xl lg:text-4xl font-bold'>Booking Successful</p>
            <p className='text-light-text text-sm lg:text-lg font-medium'>We will send an Email with the Booking information.</p>
            <Link href={'/orders'} className='mt-5 flex items-center justify-center gap-1 px-8 py-2.5 rounded-lg bg-primary text-white hover:text-primary hover:bg-white border transition-all duration-200 ease-in-out hover:border-primary shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)]'>Done</Link>
        </div>
    )
}

export default BookingSuccessCard
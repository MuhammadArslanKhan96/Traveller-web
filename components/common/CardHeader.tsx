import { Montserrat } from 'next/font/google';
import React from 'react'
import { FaPlane } from 'react-icons/fa';


interface CardHeaderProps {
    text: string;
}

const montserrat = Montserrat({ subsets: ['latin'] })
const CardHeader = ({ text }: CardHeaderProps) => {
    return (
        <div className='flex justify-between max-lg:flex-col'>
            <div className='flex items-center justify-center px-6 py-5 gap-1.5 border-b text-primary border-primary'>
                <FaPlane />
                <p className={`text-center text-sm text-black font-medium ${montserrat.className}`}>{text}</p>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default CardHeader
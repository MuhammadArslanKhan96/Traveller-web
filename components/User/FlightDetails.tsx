import travelers from '@/assets/users.svg';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import CalenderIcon from '@/assets/calender-icon.svg';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { FlightContext } from '@/context/FlightContext';

const montserrat = Montserrat({ subsets: ['latin'] })
const FlightDetails = ({ setFilter, setShowPopup, departure, arrival }: any) => {
    const FlightData = React.useContext(FlightContext);
    function handleOpenLocationPopup(callback: string) {
        setShowPopup(callback);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        FlightData?.setLoading?.(true);
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);
        setFilter(formValues);
    }


    return (
        <div className='flex flex-col gap-8 py-16 px-8'>
            <form onSubmit={handleSubmit} className="flex justify-center max-sm:flex-col gap-16">
                <div className="flex gap-8">
                    <div>
                        <div className="flex justify-center max-lg:flex-col items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Flying from</p>
                                    <div className="flex justify-center text-primary items-center gap-1">
                                        <FaPlaneDeparture />
                                        <input type="text" className='hidden' value={departure} name='departure' />
                                        <button onClick={() => handleOpenLocationPopup('departure')} className='text-ligher-text outline-none text-sm font-medium'>{departure}</button>
                                    </div>
                                </div>
                                <div className='text-ligher-text'>

                                    <MdOutlineSwapHoriz size={24} />
                                </div>
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Flying to</p>
                                    <div className="flex justify-center text-primary items-center gap-1">
                                        <FaPlaneArrival />
                                        <input type="text" className='hidden' value={arrival} name='arrival' />
                                        <button onClick={() => handleOpenLocationPopup('arrival')} className='text-ligher-text outline-none text-sm font-medium'>{arrival}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-0.5 h-[50px] bg-stroke max-lg:hidden"></div>
                            <div className="flex items-center gap-6">
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Departure</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                                        <DatePicker name='departuretime' defaultValue={dayjs("18 Apr 2023")}
                                            format="DD-MM-YYYY" className='text-ligher-text border-none text-sm font-medium' />
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Return</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                                        <DatePicker name='returntime'
                                            defaultValue={dayjs("06 May 2023")}
                                            format="DD-MM-YYYY" className='text-ligher-text border-none text-sm font-medium' />
                                    </div>
                                </div>
                            </div>
                            <div className="w-0.5 h-[50px] bg-stroke max-lg:hidden"></div>
                            <div className="flex items-center gap-6">
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Travelers</p>
                                    <div className="flex justify-center text-primary items-center gap-1">
                                        <Image src={travelers.src} alt='' width={24} height={24} />
                                        <p className='text-ligher-text text-sm font-medium'>2 Adults, 3 Children</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button type='submit' className='flex justify-center border border-primary transition-all duration-300 ease-in-out  hover:bg-white hover:text-primary h-fit ouline-none  items-center px-8 py-3 gap-2.5 text-white rounded-lg bg-primary shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)]'>
                    <BsSearch size={22} />
                    <p className={`text-base font-semibold ${montserrat.className}`}>Search</p>
                </button>
            </form>
        </div>
    )
}

export default FlightDetails
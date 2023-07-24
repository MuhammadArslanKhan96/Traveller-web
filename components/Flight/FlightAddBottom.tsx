import { Montserrat } from 'next/font/google';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Spin } from 'antd';
import CalenderIcon from '@/assets/calender-icon.svg';
import Image from 'next/image';
import { useState } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] })

interface FlightSectionProps {
    setShowPopup: (val: string) => void;
    departure: string;
    loading: boolean;
    arrival: string;
}
const FlightAddBottom = ({ loading, setShowPopup, departure, arrival }: FlightSectionProps) => {
    const [departuretime, setdeparturetime] = useState<Dayjs | null | undefined>(dayjs());
    const [returntime, setreturntime] = useState<Dayjs | null | undefined>(dayjs().add(1, 'day'));

    function handleOpenLocationPopup(callback: string) {
        setShowPopup(callback);
    }

    return (
        <div className='flex flex-col gap-8 py-16 px-8'>
            <div className="flex justify-center max-sm:flex-col gap-16">
                <div className="flex gap-8">
                    <div>
                        <div className="flex justify-center max-lg:flex-col items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Flying from</p>
                                    <div className="flex justify-center text-primary items-center gap-1">
                                        <FaPlaneDeparture />
                                        <input type="text" className='hidden' value={departure} name='departure' />
                                        <button onClick={() => handleOpenLocationPopup('departure')} className='text-ligher-text outline-none text-sm font-medium'>{departure.length > 17 ? departure.slice(0, 17) + '...' : departure}</button>
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
                                        <button onClick={() => handleOpenLocationPopup('arrival')} className='text-ligher-text outline-none text-sm font-medium'>{arrival.length > 17 ? arrival.slice(0, 17) + '...' : arrival}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-0.5 h-[50px] bg-stroke max-lg:hidden"></div>
                            <div className="flex items-center gap-6">
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Departure</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                                        <DatePicker name='departuretime' onChange={newVal => {
                                            if (returntime?.isBefore(newVal)) {
                                                setreturntime(newVal?.add(1, 'day'))
                                            }
                                            setdeparturetime(newVal)
                                        }} value={departuretime}
                                            format="DD/MM/YYYY" className='text-ligher-text border-none text-sm font-medium' />
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                                    <p className='text-dark text-xs font-medium'>Return</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                                        <DatePicker name='returntime'
                                            value={returntime} onChange={newVal => setreturntime(newVal)} disabledDate={d => !d || d.isBefore(departuretime)}
                                            format="DD/MM/YYYY" className='text-ligher-text border-none text-sm font-medium' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button disabled={loading} className='flex btn justify-center hover:bg-white hover:border-primary h-fit ouline-none border hover:text-primary transition-all duration-300 ease-in-out items-center px-8 py-3 gap-2.5 text-white rounded-lg bg-primary shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)]'>
                    {
                        loading ? <Spin /> :
                            <p className={`text-base font-semibold ${montserrat.className}`}>Add</p>

                    }
                </button>
            </div>
        </div>
    )
}

export default FlightAddBottom
import React from 'react'
import { BsImages } from 'react-icons/bs'
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import CalenderIcon from '@/assets/calender-icon.svg';
import { Montserrat } from 'next/font/google';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import Image from 'next/image';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { returnDate } from '@/utils/stringToDate';
const montserrat = Montserrat({ subsets: ['latin'] })

interface EditCard {
    flight: any;
    setShowPopup: (val: string) => void;
    departure: string;
    arrival: string;
}

const BookingSuccessCard = ({ flight, setShowPopup, departure, arrival }: EditCard) => {
    const [image, setImage] = React.useState(flight.image);
    const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const [companyName, setCompanyName] = React.useState(flight['company-name']);
    let ref = React.useRef<any>(null)


    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        let file = e.target?.files?.[0];
        if (file && supportedTypes.includes(file.type)) {
            setImage(URL.createObjectURL(file));
        }
    }

    function handleOpenLocationPopup(callback: string) {
        setShowPopup(callback);
    }
    return (
        <div className='bg-white flex gap-y-12 flex-col justify-center p-10 lg:p-14 rounded-xl'>
            <p className='text-primary text-2xl lg:text-4xl font-bold'>Edit Flight</p>
            <div className='flex gap-5 max-md:flex-col'>
                {image ? <>
                    <Image src={image} alt='' width={128} height={128} />
                </> :
                    <div className='bg-[#D9D9D9] rounded-lg w-28 h-28 flex justify-center items-center text-4xl font-bold'>
                        +
                    </div>
                }
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <p className='text-dark text-sm font-medium'>Profile picture</p>
                        <p className='text-lighter-text text-sm'>PNG or JPG no bigger than 800px wide and tall.</p>
                    </div>
                    <button type='button' onClick={() => ref.current!.click()} className="flex justify-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out w-fit items-center gap-1.5 rounded-lg border border-stroke text-primary px-5 py-3">
                        <BsImages />
                        <input accept='image/*' ref={ref} onChange={handleImageChange} type="file" name="image" id='imageElement' className='hidden' />
                        <p className='text-sm font-semibold'>Browse</p>
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                    <p className='text-dark text-xs font-medium'>Flying from</p>
                    <div className="flex justify-center text-primary items-center gap-1">
                        <FaPlaneDeparture />
                        <input type="text" className='hidden' value={departure} name='departure' />
                        <button type='button' onClick={() => handleOpenLocationPopup('departure')} className='text-ligher-text outline-none text-sm font-medium'>{departure.length > 17 ? departure.slice(0, 17) + '...' : departure}</button>
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
                        <button type='button' onClick={() => handleOpenLocationPopup('arrival')} className='text-ligher-text outline-none text-sm font-medium'>{arrival.length > 17 ? arrival.slice(0, 17) + '...' : arrival}</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col gap-2">
                <label htmlFor='company-name' className='text-dark text-sm font-medium'>Name</label>
                <input type='text' name="company-name" id="company-name" onChange={e => setCompanyName(e.target.value)} value={companyName} className='text-ligher-text outline-none text-sm font-medium' placeholder='Company full name' />
            </div>
            <div className="flex items-center gap-6">
                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                    <p className='text-dark text-xs font-medium'>Departure</p>
                    <div className="flex justify-center items-center gap-1">
                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                        <DatePicker name='departuretime' defaultValue={dayjs(returnDate(flight.departuretime))}
                            format="DD/MM/YYYY" className='text-ligher-text border-none text-sm font-medium' />
                    </div>
                </div>
                <div className={`flex flex-col justify-center gap-2 ${montserrat.className}`}>
                    <p className='text-dark text-xs font-medium'>Return</p>
                    <div className="flex justify-center items-center gap-1">
                        <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                        <DatePicker name='returntime'
                            defaultValue={dayjs(returnDate(flight.returntime))}
                            format="DD/MM/YYYY" className='text-ligher-text border-none text-sm font-medium' />
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='mt-5 flex items-center justify-center w-fit gap-1 px-8 py-2.5 rounded-lg bg-primary text-white hover:text-primary hover:bg-white border transition-all duration-200 ease-in-out hover:border-primary shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)]'>Save</button>
            </div>
        </div>
    )
}

export default BookingSuccessCard
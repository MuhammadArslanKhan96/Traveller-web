import CalenderIcon from '@/assets/calender-icon.svg';
import { FlightContext } from '@/context/FlightContext';
import { UserContext } from '@/context/UserContext';
import { Spin } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiUser } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';

interface FlightProp {
    item?: any;
}

const AdminFlight = ({ item }: FlightProp) => {
    const [active, setActive] = React.useState(item[0].id);
    const [loading, setLoading] = React.useState(false);
    const FlightsData = React.useContext(FlightContext);
    const UserData = React.useContext(UserContext);

    function getItem(id: string) {
        return item.filter((i: any) => i.id === id)[0]
    }

    let flight = getItem(active);

    async function deleteFlight(id: string) {
        setLoading(true);
        FlightsData?.setLoading?.(true);
        try {
            await axios.delete(`/api/flights/delete-flight?id=` + id);
            FlightsData?.setFlights(FlightsData?.flights.filter(i => i.id !== id))
            setLoading(false);
        } catch (error) {
            setLoading(false);
            UserData?.messageApi.open({
                type: 'error',
                content: 'Something Went Wrong while trying to delete!',
            });
        }
    }


    return (
        <div className='flex items-center max-lg:flex-col gap-9'>
            <div className="flex items-center lg:max-w-[600px] max-sm:flex-wrap max-sm:justify-center">
                <div className="drop-shadow-[0px_12px_24px_rgba(0,0,0,0.07)] relative">
                    <div className='flex absolute top-8 left-0 py-1 px-2 justify-center items-center gap-2.5 rounded-tr-xl bg-primary'>
                        <p className='text-xl font-bold text-white max-lg:text-sm'>{flight.bookings.length} Bookings</p>
                    </div>
                    <Image src={flight.image} alt='' className='max-lg:w-[150px] w-full' width={293} height={385} />
                </div>
                {item.length > 1 && item.filter((i: any) => i.id !== active).map((item: any, idx: number) => (
                    <div key={idx} onClick={() => setActive(item.id)} className="drop-shadow-[0px_12px_24px_rgba(0,0,0,0.07)] cursor-pointer relative">
                        <div className='flex absolute top-8 left-0 py-1 px-2 justify-center items-center gap-2.5 rounded-tr-xl bg-primary'>
                            <p className='text-xl font-bold text-white max-lg:text-sm'>{item.bookings.length} Bookings</p>
                        </div>
                        <Image src={item.image} alt='' className='max-lg:w-[150px] h-full max-w-full' width={240} height={315} />
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-8 max-lg:text-center lg:max-w-[400px]'>
                <div className="flex flex-col gap-5">
                    <h2 className='text-5xl font-bold text-dark'>{flight['company-name']}</h2>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-primary">
                            <HiUser />
                            <p className='text-sm font-medium text-light-text'>{FlightsData?.flightsCompanies?.filter(i => i.email === flight.user)[0]?.name}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                            <p className='text-sm font-medium text-light-text'>{new Date(flight.departuretime).getTime() < new Date().getTime() ? flight.returntime : flight.departuretime}</p>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                            <ImLocation />
                            <p className='text-sm font-medium text-light-text'>{new Date(flight.departuretime).getTime() < new Date().getTime() ? flight.arrive : flight.departure}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 max-lg:items-center">
                    <div className='text-light-text break-words text-lg max-w-[300px]'>Lörem ipsum fotobomba minynat. Göra en pudel masar fadogon heteroktigt holatt. </div>
                    <div className='flex gap-4'>
                        <Link href={"/edit?id=" + flight.id} className="flex min-w-[120px] items-center py-4 justify-center text-white border hover:text-primary border-primary gap-2 5 rounded-lg bg-primary hover:bg-white">
                            <h2 className='text-base font-semibold'>Edit</h2>
                        </Link>
                        <button disabled={loading} onClick={() => deleteFlight(flight.id)} className="btn flex min-w-[120px] items-center py-4 justify-center text-white border hover:text-primary border-primary gap-2 5 rounded-lg bg-primary hover:bg-white">
                            {loading ? <Spin /> :
                                <h2 className='text-base font-semibold'>Delete</h2>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminFlight
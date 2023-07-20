import Image from 'next/image'
import React from 'react';
import { HiUser } from 'react-icons/hi'
import CalenderIcon from '@/assets/calender-icon.svg';
import { ImLocation } from 'react-icons/im'
import { AiFillRightCircle } from 'react-icons/ai'
import { FlightContext } from '@/context/FlightContext';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';


interface FlightProp {
    item?: any;
}
const Flight = ({ item }: FlightProp) => {
    const [active, setActive] = React.useState(item[0].id);
    const FlightsData = React.useContext(FlightContext);
    const UserData = React.useContext(UserContext);
    const router = useRouter();

    async function handleBook() {
        if (getItem(active).user === UserData?.user?.email) {
            UserData?.messageApi?.open({
                type: 'error',
                content: "You can't book your own flights!"
            });
            return;
        }
        try {
            await axios.put(`/api/flights/update-flight?id=` + getItem(active).id, { bookings: [...getItem(active).bookings, UserData?.user?.email] })
            FlightsData?.setFlights([...FlightsData?.flights.filter(i => i.id !== getItem(active).id), { ...getItem(active), bookings: [...getItem(active).bookings, UserData?.user?.email] }])
            UserData?.messageApi?.open({
                type: 'success',
                content: "Booking success!"
            });
            router.push(`/success`)
        } catch (error) {
            console.log(error)
        }
    }


    function getItem(id: string) {
        return item.filter((i: any) => i.id === id)[0]
    }

    return (
        <div className='flex items-center max-lg:flex-col gap-9'>
            <div className="flex items-center lg:max-w-[600px] max-sm:flex-wrap max-sm:justify-center">
                <div className="drop-shadow-[0px_12px_24px_rgba(0,0,0,0.07)] relative">
                    <div className='flex absolute top-8 left-0 py-1 px-2 justify-center items-center gap-2.5 rounded-tr-xl bg-primary'>
                        <p className='text-xl font-bold text-white max-lg:text-sm'>{getItem(active).bookings.length} Bookings</p>
                    </div>
                    <Image src={getItem(active).image} alt='' className='max-lg:w-[150px] h-full max-w-full' width={293} height={385} />
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
                    <h2 className='text-5xl font-bold text-dark'>{getItem(active)['company-name']}</h2>
                    <div className="flex gap-4 flex-wrap max-lg:justify-center">
                        <div className="flex items-center gap-1 text-primary">
                            <HiUser />
                            <p className='text-sm font-medium text-light-text'>{FlightsData?.flightsCompanies?.filter(i => i.email === getItem(active).user)[0]?.name}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={CalenderIcon.src} alt='' width={24} height={24} />
                            <p className='text-sm font-medium text-light-text'>{new Date(getItem(active).departuretime).getTime() < new Date().getTime() ? getItem(active).returntime : getItem(active).departuretime}</p>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                            <ImLocation />
                            <p className='text-sm font-medium text-light-text'>{new Date(getItem(active).departuretime).getTime() < new Date().getTime() ? getItem(active).arrive : getItem(active).departure}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 max-lg:items-center">
                    <div className='text-light-text break-words text-lg max-w-[300px]'>Lörem ipsum fotobomba minynat. Göra en pudel masar fadogon heteroktigt holatt. </div>
                    <button onClick={handleBook} disabled={!UserData?.user?.email || getItem(active).bookings.includes(UserData?.user?.email)} className="flex disabled:cursor-not-allowed w-fit items-center px-6 py-4 items center text-white border hover:text-primary border-primary gap-2 5 rounded-lg bg-primary hover:bg-white">
                        <h2 className='text-base font-semibold'>Book Now</h2>
                        <AiFillRightCircle />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Flight
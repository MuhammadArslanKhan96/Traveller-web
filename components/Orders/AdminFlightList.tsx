import React from 'react'
import AdminFlight from './AdminFlight'
import { UserContext } from '@/context/UserContext';
import { FlightContext } from '@/context/FlightContext';

export default function AdminFlightList() {
    const UserData = React.useContext(UserContext);
    const FlightData = React.useContext(FlightContext);


    let flights = FlightData?.flights.filter(i => i.bookings.includes(UserData?.user?.email));

    return (
        <div className='flex justify-center flex-col items-center gap-y-10'>
            {
                flights?.length ? flights?.map((item, idx) => (
                    <AdminFlight key={idx} item={item} />
                )) : null
            }
        </div>
    )
}
import React from 'react'
import AdminFlight from './AdminFlight'
import { UserContext } from '@/context/UserContext';
import { FlightContext } from '@/context/FlightContext';

export default function AdminFlightList() {
    const UserData = React.useContext(UserContext);
    const FlightData = React.useContext(FlightContext);
    const [flights, setFlights] = React.useState<any[]>();


    React.useEffect(() => {
        if (UserData?.user) {
            setFlights(FlightData?.flights.filter(i => i.bookings.filter((i: any) => i?.user === UserData?.user?.email).length));
        }
    }, [UserData?.user, FlightData?.flights])

    return (
        <div className='flex justify-center flex-col items-center gap-y-10'>
            {
                flights?.length ? flights?.sort(function (a, b) {
                    return b.bookings.length - a.bookings.length
                }).map((item, idx) => (
                    <AdminFlight key={idx} item={item} />
                )) : <h1>No bookings Yet</h1>
            }
        </div>
    )
}
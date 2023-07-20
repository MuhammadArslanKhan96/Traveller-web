import React from 'react'
import AdminFlight from './AdminFlight'
import { FlightContext } from '@/context/FlightContext'
import { UserContext } from '@/context/UserContext'

export default function AdminFlightList() {
    const FlightsData = React.useContext(FlightContext)
    const UserData = React.useContext(UserContext)
    return (
        <div className='py-44 max-lg:pt-20 flex justify-center flex-col items-center gap-y-10'>
            {FlightsData?.flights.length ? FlightsData?.flights.filter(i => i.user === UserData?.user?.email).map((item, idx) => (
                <div key={idx}>
                    <AdminFlight index={idx} item={item} />
                </div>
            )) : null}
        </div>
    )
}
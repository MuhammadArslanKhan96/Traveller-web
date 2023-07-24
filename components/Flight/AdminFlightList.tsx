import React from 'react'
import AdminFlight from './AdminFlight'
import { FlightContext } from '@/context/FlightContext'
import { UserContext } from '@/context/UserContext'

export default function AdminFlightList() {
    const FlightsData = React.useContext(FlightContext)
    const UserData = React.useContext(UserContext)

    let count = 0;
    let flights = FlightsData?.flights.filter(i => i.user === UserData?.user?.email);
    let result = flights?.reduce(function (accObj, currentObj) {
        accObj[currentObj.user + count] = accObj[currentObj.user + count] || [];
        if (accObj[currentObj.user + count].length === 3) {
            count++;
            accObj[currentObj.user + count] = accObj[currentObj.user + count] || [];
        }
        accObj[currentObj.user + count].push(currentObj);
        return accObj;
    }, {});
    return (
        <div className='py-44 max-lg:pt-20 flex justify-center flex-col items-center gap-y-10'>
            {Object.values(result).length ? Object.values(result).map((item, idx) => (
                <div key={idx}>
                    <AdminFlight item={item} />
                </div>
            )) : null}
        </div>
    )
}
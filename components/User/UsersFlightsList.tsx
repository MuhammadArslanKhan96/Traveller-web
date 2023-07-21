import React from 'react'
import Flight from './Flight'
import { FlightContext } from '@/context/FlightContext';
import { Spin } from 'antd';

export default function UsersFlightsList({ flights, travelers }: { flights?: any; travelers: any; }) {
    const FlightData = React.useContext(FlightContext);
    React.useEffect(() => {
        FlightData?.setLoading?.(false);

        //eslint-disable-next-line
    }, [flights])
    console.log(flights)
    return (
        <div className='py-44 max-lg:pt-20 flex justify-center flex-col lg:pl-32 2xl:items-center 2xl:pl-0 gap-y-10'>
            {!FlightData?.loading ? (flights?.length ? flights?.sort(function (a: any, b: any) {
                return b.totalBookings - a.totalBookings
            }).map((item: any, idx: number) => (
                <div key={idx}>
                    <Flight travelers={travelers} item={item.data} />
                </div>
            )) : <h1>No Flights Found!</h1>) : <Spin className='spinner' />}
        </div>
    )
}
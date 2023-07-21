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
    function splitArray(arr: any[], chunkSize: number) {
        let result = [];

        for (let i = 0; i < arr.length; i += chunkSize) {
            let chunk = arr.slice(i, i + chunkSize);
            result.push(chunk);
        }

        return result;
    }
    return (
        <div className='py-44 max-lg:pt-20 flex justify-center flex-col lg:pl-32 2xl:items-center 2xl:pl-0 gap-y-10'>
            {!FlightData?.loading ? (flights?.length ? flights?.sort(function (a: any, b: any) {
                return b.totalBookings - a.totalBookings
            }).map((item: any, idx: number) => (
                <div key={idx}>
                    {item.data.length > 3 ? splitArray(item.data, 3).map((i: any, idx: number) => (
                        <Flight travelers={travelers} item={i} key={idx} />
                    )) :
                        <Flight travelers={travelers} item={item.data} />
                    }
                </div>
            )) : <h1>No Flights Found!</h1>) : <Spin className='spinner' />}
        </div>
    )
}
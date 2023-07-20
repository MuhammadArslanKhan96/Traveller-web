import React from 'react'
import Flight from './Flight'

export default function UsersFlightsList({ flights }: { flights?: any[] }) {
    return (
        <div className='py-44 max-lg:pt-20 flex justify-center flex-col items-center gap-y-10'>
            {flights?.length ? flights?.map((item, idx) => (
                <div key={idx}>
                    <Flight item={item} />
                </div>
            )) : <h1>No Flights Found!</h1>}
        </div>
    )
}
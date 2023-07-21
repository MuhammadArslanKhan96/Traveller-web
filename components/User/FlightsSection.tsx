import React from 'react'
import UserFlightsCard from './UserFlightsCard'
import UsersFlightsList from './UsersFlightsList'

const FlightsSection = ({ flights, setFilter, setShowPopup, departure, arrival, travelers }: any) => {

    return (
        <div className='flex justify-center flex-col bg-[#F2FBFF] backdrop-blur-3xl'>
            <div className="flex justify-center">
                <UserFlightsCard travelers={travelers} setFilter={setFilter} setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
            </div>
            <UsersFlightsList travelers={travelers} flights={flights} />

        </div>
    )
}

export default FlightsSection
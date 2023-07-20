import React from 'react'
import CardHeader from '../common/CardHeader'
import FlightDetails from './FlightDetails'

const UserFlightsCard = ({ setFilter, setShowPopup, departure, arrival }: any) => {
    return (
        <div className='drop-shadow-[0px_44px_35px_rgba(0,0,0,0.05)] -mt-28 bg-white rounded-3xl'>
            <CardHeader text={'Flights'} />
            <FlightDetails setFilter={setFilter} setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
        </div>
    )
}

export default UserFlightsCard
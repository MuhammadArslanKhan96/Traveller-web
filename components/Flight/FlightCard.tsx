import React from 'react'
import CardHeader from '../common/CardHeader'
import AddFlightDetail from './AddFlightDetail'

interface FlightSectionProps {
    setShowPopup: (val: string) => void;
    departure: string;
    arrival: string;
}
const FlightCard = ({ setShowPopup, departure, arrival }: FlightSectionProps) => {
    return (
        <div className='drop-shadow-[0px_44px_35px_rgba(0,0,0,0.05)] -mt-28 bg-white rounded-3xl'>
            <CardHeader text={'+ Add Flight'} />
            <AddFlightDetail setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
        </div>
    )
}

export default FlightCard
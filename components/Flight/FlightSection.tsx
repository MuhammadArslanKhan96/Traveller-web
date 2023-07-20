import React from 'react'
import FlightCard from './FlightCard'
import AdminFlightList from './AdminFlightList'

interface FlightSectionProps {
    setShowPopup: (val: string) => void;
    departure: string;
    arrival: string;
}

const FlightSection = ({ setShowPopup, departure, arrival }: FlightSectionProps) => {
    return (
        <div className='flex justify-center flex-col bg-[#F2FBFF] backdrop-blur-3xl'>
            <div className="flex justify-center">
                <FlightCard setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
            </div>
            <AdminFlightList />
        </div>
    )
}

export default FlightSection
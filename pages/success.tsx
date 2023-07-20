import BookingSuccessCard from '@/components/Success/BookingSuccessCard'
import React from 'react'

const success = () => {
    return (
        <div className='min-h-screen bg-dark py-10 px-5 flex items-center justify-center backdrop-blur-3xl'>
            <BookingSuccessCard />
        </div>
    )
}

export default success
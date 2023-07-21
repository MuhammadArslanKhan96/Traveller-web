import { UserContext } from '@/context/UserContext';
import React from 'react';
import NumberOfPeople from '../common/NumberOfPeople';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FlightContext } from '@/context/FlightContext';

interface EditCard {
    flight: any;
}

const BookingSuccessCard = ({ flight }: EditCard) => {
    const UserData = React.useContext(UserContext);
    const FlightData = React.useContext(FlightContext);
    let travelers = flight?.bookings.filter((i: any) => i.user === UserData?.user?.email)[0]['travelers']
    const router = useRouter();

    const handleSave = async (val: any) => {
        try {
            await axios.put(`/api/flights/update-flight?id=` + flight.id, {
                bookings: [...flight.bookings.filter((i: any) => i.user !== UserData?.user?.email), {
                    user: UserData?.user?.email,
                    travelers: val
                }]
            });
            FlightData?.setFlights([...FlightData?.flights.filter(i => i.id !== flight.id), {
                ...flight,
                bookings: [...flight.bookings.filter((i: any) => i.user !== UserData?.user?.email), {
                    user: UserData?.user?.email,
                    travelers: val
                }]
            }])
            UserData?.messageApi?.open({
                type: 'success',
                content: `Booking Edited Successfully!`
            });

            router.push(`/orders`);
        } catch (error) {
            UserData?.messageApi?.open({
                type: 'error',
                content: `Something went wrong while editing!`
            })
        }
    }


    return (
        <div className='bg-white flex gap-y-12 flex-col justify-center p-10 lg:p-14 rounded-xl'>
            <p className='text-primary text-2xl lg:text-4xl font-bold'>Edit Flight Booking</p>
            <NumberOfPeople travelers={travelers} selectValue={handleSave} />
        </div>
    )
}

export default BookingSuccessCard
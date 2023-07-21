import EditFlightCard from '@/components/Orders/EditFlightCard'
import { countries } from '@/constants/Cities';
import { FlightContext } from '@/context/FlightContext';
import { UserContext } from '@/context/UserContext';
import { storage } from '@/utils/firebase';
import { isValidImageURL } from '@/utils/validImage';
import { uuid } from 'uuidv4';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import axios from 'axios';

const EditPage = () => {
    const UserData = React.useContext(UserContext);
    const router = useRouter();
    const [flight, setFlight] = React.useState('');
    const FlightData = React.useContext(FlightContext);


    const getFlightData = () => {
        let flight = FlightData?.flights.filter(i => i.id === router.query.id)[0];
        setFlight(flight);
    }

    React.useEffect(() => {
        if (!UserData?.user) {
            router.push(`/`);
        }
        //eslint-disable-next-line
    }, [UserData?.user]);


    React.useEffect(() => {
        if (router) {
            getFlightData();
        }
        //eslint-disable-next-line
    }, [router]);




    if (!flight) return;
    return (
        <div className='min-h-screen bg-dark py-10 px-5 flex items-center justify-center backdrop-blur-3xl'>
            <EditFlightCard flight={flight} />
        </div>
    )
}

export default EditPage
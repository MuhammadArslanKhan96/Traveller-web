import EditFlightCard from '@/components/EditFlight/EditFlightCard'
import { countries } from '@/constants/Cities';
import { FlightContext } from '@/context/FlightContext';
import { UserContext } from '@/context/UserContext';
import { storage } from '@/utils/firebase';
import { isValidImageURL } from '@/utils/validImage';
import { uuid } from 'uuidv4';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React from 'react'
import axios from 'axios';
import LocationSelector from '@/components/User/LocationSelector';

const EditPage = () => {
    const [filterCities, setFilterCities] = React.useState<string>('');
    const [showPopup, setShowPopup] = React.useState<string | boolean>('');
    const [departure, setDeparture] = React.useState('Dubai (DXB)');
    const [arrival, setArrival] = React.useState('Sharjah (SHJ)');
    const UserData = React.useContext(UserContext);
    const router = useRouter();
    const [flight, setFlight] = React.useState<any>('');
    const FlightData = React.useContext(FlightContext);


    const getFlightData = () => {
        let flight = FlightData?.flights.filter(i => i.id === router.query.id)[0];
        setFlight(flight);
        setDeparture(flight.departure)
        setArrival(flight.arrival)
    }

    React.useEffect(() => {
        if (UserData?.user && UserData?.user.role?.toLowerCase() !== 'flight') {
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



    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData);
            const { image, departure, arrival, departuretime, returntime } = formValues;
            if (typeof image !== 'string' && image.size) {
                isValidImageURL(URL.createObjectURL(image as Blob | MediaSource), async function (valid: boolean) {
                    if (valid && departure && arrival && departuretime && returntime && formValues['company-name'] && departure !== arrival && departuretime !== returntime) {

                        // Create a reference to 'mountains.jpg'
                        const mountainsRef = ref(storage, uuid() + '.' + image.name.split('.')[1]);

                        // 'file' comes from the Blob or File API
                        uploadBytes(mountainsRef, image as Blob).then((snapshot) => {
                            getDownloadURL(snapshot.ref).then(async (url) => {
                                let newFlight = { ...formValues, updatedAt: new Date(), image: url };
                                await axios.put(`/api/flights/update-flight?id=` + router.query.id, newFlight);
                                FlightData?.setFlights([...FlightData?.flights.filter(i => i.id !== router.query.id), newFlight]);
                                router.push(`/flight`);
                            })
                        });


                    } else {
                        UserData?.messageApi.open({
                            type: 'error',
                            content: 'Fill all the required fields!',
                        });
                    }
                })
            } else {
                let newFlight = { ...formValues, updatedAt: new Date(), image: flight?.image };
                await axios.put(`/api/flights/update-flight?id=` + router.query.id, newFlight);
                FlightData?.setFlights([...FlightData?.flights.filter(i => i.id !== router.query.id), newFlight]);
                router.push(`/flight`);
            }


        } catch (error) {
            UserData?.messageApi.open({
                type: 'error',
                content: 'Something went wrong while trying to save!',
            });
        }
    }

    let filteredCountries = countries.filter(i => i.toLowerCase().includes(filterCities.toLowerCase()));

    function selectValue(val: string) {
        if (showPopup === 'departure') {
            setDeparture(val);
        } else {
            setArrival(val);
        }
        setShowPopup('');
    }


    if (!flight) return;
    return (
        <form onSubmit={handleSubmit} className='min-h-screen bg-dark py-10 px-5 flex items-center justify-center backdrop-blur-3xl'>
            <EditFlightCard departure={departure} arrival={arrival} setShowPopup={setShowPopup} flight={flight} />
            {showPopup && <div className='fixed top-0 min-h-screen flex justify-center items-center w-[99vw] bg-black/70'>
                <LocationSelector filterCities={filterCities} setFilterCities={setFilterCities} filteredCountries={filteredCountries} selectValue={selectValue} setShowPopup={setShowPopup} />
            </div>}
        </form>
    )
}

export default EditPage
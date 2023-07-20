import axios from "axios";
import FlightAddBottom from "./FlightAddBottom"
import FlightAddTop from "./FlightAddTop"
import React, { useContext } from 'react';
import { UserContext } from "@/context/UserContext";
import { FlightContext } from "@/context/FlightContext";
import { isValidImageURL } from "@/utils/validImage";
import { uuid } from "uuidv4";
import { storage } from '@/utils/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface FlightSectionProps {
    setShowPopup: (val: string) => void;
    departure: string;
    arrival: string;
}

const AddFlightDetail = ({ setShowPopup, departure, arrival }: FlightSectionProps) => {
    const UserData = useContext(UserContext);
    const FlightsData = useContext(FlightContext);

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData);
            const { image, departure, arrival, departuretime, returntime } = formValues;
            isValidImageURL(URL.createObjectURL(image as Blob | MediaSource), async function (valid: boolean) {
                if (valid && departure && arrival && departuretime && returntime && formValues['company-name'] && departure !== arrival && departuretime !== returntime) {

                    // Create a reference to 'mountains.jpg'
                    const mountainsRef = ref(storage, uuid() + '.jpg');

                    // 'file' comes from the Blob or File API
                    uploadBytes(mountainsRef, image as Blob).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then(async (url) => {
                            let newFlight = { ...formValues, user: UserData?.user?.email, createdAt: new Date(), updatedAt: new Date(), image: url, bookings: [] };
                            await axios.post(`/api/flights/add-flight`, newFlight);
                            FlightsData?.setFlights([...FlightsData?.flights, newFlight]);
                        })
                    });


                } else {
                    UserData?.messageApi.open({
                        type: 'error',
                        content: 'Fill all the required fields!',
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FlightAddTop />
                <FlightAddBottom setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
            </form>
        </>
    )
}


export default AddFlightDetail
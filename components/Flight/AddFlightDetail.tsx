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
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true)
            const formData = new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData);
            const { image, departure, arrival, departuretime, returntime } = formValues;
            isValidImageURL(URL.createObjectURL(image as Blob | MediaSource), async function (valid: boolean) {
                if (valid && departure && arrival && departuretime && returntime && formValues['company-name'] && departuretime !== returntime) {
                    if (departure === arrival) {

                        setLoading(false)
                        UserData?.messageApi.open({
                            type: 'error',
                            content: 'Flying from and to cannot be same!',
                        });
                        return;
                    }
                    let newImage = image as any;
                    // Create a reference to 'mountains.jpg'
                    const mountainsRef = ref(storage, uuid() + '.' + newImage.name.split('.')[1]);

                    // 'file' comes from the Blob or File API
                    uploadBytes(mountainsRef, image as Blob).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then(async (url) => {
                            let newFlight = { ...formValues, user: UserData?.user?.email, createdAt: new Date(), updatedAt: new Date(), image: url, bookings: [], id: uuid() };
                            await axios.post(`/api/flights/add-flight`, newFlight);
                            FlightsData?.setFlights?.([...FlightsData?.flights, newFlight]);
                            FlightsData?.setLoading?.(true);
                            UserData?.messageApi.open({
                                type: 'success',
                                content: 'Flight Added!',
                            });
                            setLoading(false)
                        })
                    });


                } else {
                    setLoading(false)
                    UserData?.messageApi.open({
                        type: 'error',
                        content: 'Fill all the required fields!',
                    });
                }
            })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FlightAddTop />
                <FlightAddBottom loading={loading} setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
            </form>
        </>
    )
}


export default AddFlightDetail
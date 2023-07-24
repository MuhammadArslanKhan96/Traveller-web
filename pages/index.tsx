import React from "react";
import HeroSection from "@/components/common/HeroSection";
import FlightsSection from "@/components/User/FlightsSection";
import { countries } from '@/constants/Cities'
import { FlightContext } from "@/context/FlightContext";
import LocationSelector from "@/components/User/LocationSelector";
import NumberOfPeople from "@/components/common/NumberOfPeople";

export default function Home() {
  const [filter, setFilter] = React.useState<any>();
  const [showPopup, setShowPopup] = React.useState<string | boolean>('');
  const [departure, setDeparture] = React.useState('Dubai (DXB)');
  const [arrival, setArrival] = React.useState('Sharjah (SHJ)');
  const [travelers, setTravelers] = React.useState({ adult: 2, children: 3 });
  function selectValue(val: any) {
    if (showPopup === 'departure') {
      setDeparture(val);
    } else
      if (showPopup === 'arrival') {
        setArrival(val);
      } else {
        setTravelers(val);
      }
    setShowPopup('');
  }


  const [filterCities, setFilterCities] = React.useState<string>('');
  let filteredCountries = countries.filter(i => (i.toLowerCase().includes(filterCities.toLowerCase())));
  const FlightsData = React.useContext(FlightContext);

  let flights = filter ? FlightsData?.flights.filter(i => (i.departure === filter.departure && i.departuretime === filter.departuretime && i.returntime === filter.returntime && i.arrival === filter.arrival)) : FlightsData?.flights;
  let result = flights?.length ? flights?.reduce(function (accObj, currentObj) {
    accObj[currentObj.user] = accObj[currentObj.user] || { totalBookings: 0, data: [] };
    accObj[currentObj.user]['totalBookings'] = accObj[currentObj.user]['totalBookings'] + currentObj.bookings.length;
    accObj[currentObj.user]['data'].push(currentObj);
    return accObj;
  }, {}) : {};

  return (
    <>
      <HeroSection />
      <FlightsSection flights={Object.values(result)} setFilter={setFilter} setShowPopup={setShowPopup} departure={departure} travelers={travelers} arrival={arrival} />


      {showPopup && <div className='fixed top-0 min-h-screen flex justify-center items-center w-[99vw] bg-black/70'>
        {showPopup !== 'travelers' ? <LocationSelector setShowPopup={setShowPopup} selectValue={selectValue} setFilterCities={setFilterCities} filterCities={filterCities} filteredCountries={filteredCountries} /> : <NumberOfPeople setShowPopup={setShowPopup} travelers={travelers} selectValue={selectValue} />}
      </div>}
    </>
  )
}

import React from "react";
import HeroSection from "@/components/common/HeroSection";
import FlightsSection from "@/components/User/FlightsSection";
import { AiOutlineSearch } from 'react-icons/ai'
import { countries } from '@/constants/Cities'
import { ImLocation } from 'react-icons/im'
import { FlightContext } from "@/context/FlightContext";

export default function Home() {
  const [filter, setFilter] = React.useState<any>();
  const [showPopup, setShowPopup] = React.useState<string>('');
  const [departure, setDeparture] = React.useState('Dubai (DXB)');
  const [arrival, setArrival] = React.useState('Sharjah (SHJ)');
  function selectValue(val: string) {
    if (showPopup === 'departure') {
      setDeparture(val);
    } else {
      setArrival(val);
    }
    setShowPopup('');
  }


  const [filterCities, setFilterCities] = React.useState<string>('');
  let filteredCountries = countries.filter(i => i.toLowerCase().includes(filterCities.toLowerCase()));
  const FlightsData = React.useContext(FlightContext);

  let flights = filter ? FlightsData?.flights.filter(i => (i.departure === filter.departure && i.departuretime === filter.departuretime && i.returntime === filter.returntime && i.arrival === filter.arrival)) : FlightsData?.flights;
  return (
    <>
      <HeroSection />
      <FlightsSection flights={flights} setFilter={setFilter} setShowPopup={setShowPopup} departure={departure} arrival={arrival} />


      {showPopup && <div className='fixed top-0 min-h-screen flex justify-center items-center w-[99vw] bg-black/70'>
        <div className="flex justify-center flex-col bg-white py-5 lg:min-w-[460px] rounded-3xl border border-stroke  shadow-[0px_12px_24px_0px_rgba(0,0,0,0.07)]">
          <div className="flex pb-2.5 px-10  items-center">
            <div className="flex text-primary items-center gap-2 rounded-lg border border-stroke py-3 px-5">
              <AiOutlineSearch />
              <input type="text" value={filterCities} onChange={e => setFilterCities(e.target.value)} className="outline-none " placeholder="Search country" />
            </div>
          </div>
          <div className="flex px-8 flex-col">
            {filteredCountries.length ? filteredCountries.map((i, idx) => (
              <button onClick={() => selectValue(i)} className="flex items-center gap-3 py-4 text-primary" key={idx}>
                <ImLocation />
                <p className="text-ligher-text text-sm font-medium">{i}</p>
              </button>
            )) : <h1>Not Found!</h1>}
          </div>
        </div>
      </div>}
    </>
  )
}

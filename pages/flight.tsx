import HeroSection from "@/components/common/HeroSection";
import FlightSection from "@/components/Flight/FlightSection";
import { countries } from "@/constants/Cities";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ImLocation } from 'react-icons/im'

export default function Home() {
  const [showPopup, setShowPopup] = React.useState<string>('');
  const [filterCities, setFilterCities] = React.useState<string>('');
  const [departure, setDeparture] = React.useState('Dubai (DXB)');
  const [arrival, setArrival] = React.useState('Sharjah (SHJ)');

  let filteredCountries = countries.filter(i => i.toLowerCase().includes(filterCities.toLowerCase()));

  function selectValue(val: string) {
    if (showPopup === 'departure') {
      setDeparture(val);
    } else {
      setArrival(val);
    }
    setShowPopup('');
  }
  const UserData = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    if (UserData?.user && UserData?.user.role?.toLowerCase() === 'flight') {
      router.push(`/flight`);
    } else {
      router.push(`/`);
    }
    //eslint-disable-next-line
  }, [UserData?.user])

  return (
    <div className="relative">
      <HeroSection />
      <FlightSection setShowPopup={setShowPopup} departure={departure} arrival={arrival} />
      {showPopup && <div className='fixed top-0 min-h-screen flex justify-center items-center w-screen bg-black/70'>
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
    </div>
  )
}

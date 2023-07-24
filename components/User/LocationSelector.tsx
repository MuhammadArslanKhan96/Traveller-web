import useOutside from '@/hooks/useOutside';
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'

interface LocationSelectorProps {
    selectValue: (val: any) => void;
    filterCities: string;
    setFilterCities: (val: string) => void;
    filteredCountries: string[];
    setShowPopup: (val: boolean) => void;
}

const LocationSelector = ({ setShowPopup, selectValue, filterCities, setFilterCities, filteredCountries }: LocationSelectorProps) => {
    const ref = React.useRef(null);
    useOutside(ref, setShowPopup)
    return (
        <div ref={ref} className="flex justify-center flex-col bg-white py-5 lg:min-w-[460px] rounded-3xl border border-stroke  shadow-[0px_12px_24px_0px_rgba(0,0,0,0.07)]">
            <div className="flex pb-2.5 px-10  items-center">
                <div className="flex text-primary items-center gap-2 rounded-lg border border-stroke py-3 px-5">
                    <AiOutlineSearch />
                    <input type="text" value={filterCities} onChange={e => setFilterCities(e.target.value)} className="outline-none " placeholder="Search country" />
                </div>
            </div>
            <div className="flex px-8 flex-col">
                {filteredCountries.length ? filteredCountries.map((i, idx) => (
                    <button type='button' onClick={() => selectValue(i)} className="flex items-center gap-3 py-4 text-primary" key={idx}>
                        <ImLocation />
                        <p className="text-ligher-text text-sm font-medium">{i}</p>
                    </button>
                )) : <h1>Not Found!</h1>
                }
            </div>
        </div>
    )
}

export default LocationSelector
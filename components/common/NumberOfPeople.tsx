import { Spin } from 'antd';
import React from 'react'

interface NumberOfPeopleProps {
    travelers: any;
    selectValue: (val: any) => void;
}


const NumberOfPeople = ({ travelers, selectValue }: NumberOfPeopleProps) => {
    const [currentTraveler, setCurrentTraveler] = React.useState(travelers);
    const [loading, setLoading] = React.useState(false);


    const handleSave = () => {
        setLoading(true);
        selectValue(currentTraveler);
        setLoading(false);
    }

    const handleIncrement = (type: string) => {
        setCurrentTraveler((pre: any) => ({ ...pre, [type]: pre[type] + 1 }))
    }

    const handleDecrement = (type: string) => {
        setCurrentTraveler((pre: any) => ({ ...pre, [type]: pre[type] - 1 }))
    }
    return (
        <div className="bg-white px-2 lg:px-8 py-5 rounded-xl flex-col items-center gap-7 flex">
            <div className="justify-center items-center gap-7 flex max-lg:flex-col">
                <div className=" gap-2.5 flex">
                    <div className="flex-col justify-center gap-2 flex">
                        <p className=" text-dark text-xs font-medium break-words">Adults</p>
                        <div className="px-4 py-2.5 rounded-lg border border-stroke justify-center items-center gap-4 flex">
                            <button disabled={currentTraveler.adult <= 0} type='button' onClick={() => handleDecrement('adult')} className="w-2.5 h-0.5 disabled:cursor-not-allowed bg-primary"></button>
                            <p className=" text-dark text-sm font-medium  break-words">{currentTraveler.adult} Adults</p>
                            <button type='button' onClick={() => handleIncrement('adult')} className="text-primary text-xl font-medium">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" gap-2.5 flex">
                    <div className="flex-col justify-center gap-2 flex">
                        <p className=" text-dark text-xs font-medium break-words">Children</p>
                        <div className="px-4 py-2.5 rounded-lg border border-stroke justify-center items-center gap-2.5 flex">
                            <button disabled={currentTraveler.children <= 0} type='button' onClick={() => handleDecrement('children')} className="w-2.5 h-0.5 disabled:cursor-not-allowed  bg-primary"></button>
                            <p className=" text-dark text-sm font-medium  break-words">{currentTraveler.children} Children</p>
                            <button type='button' onClick={() => handleIncrement('children')} className="text-primary text-xl font-medium">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button disabled={loading} onClick={handleSave} className="w-full py-2.5 bg-primary rounded-lg justify-center items-center gap-2.5 flex">
                {loading ? <Spin /> : <p className=" text-white text-sm font-semibold  break-words">Done</p>}
            </button>
        </div>
    )
}

export default NumberOfPeople
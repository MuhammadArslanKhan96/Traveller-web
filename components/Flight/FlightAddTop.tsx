import Image from 'next/image';
import React, { useState } from 'react'
import { BsImages } from 'react-icons/bs'

const FlightAddTop = () => {
    const [image, setImage] = useState('');
    let ref = React.useRef<any>(null)
    const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg']

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        let file = e.target?.files?.[0];
        if (file && supportedTypes.includes(file.type)) {
            console.log(file.type)
            setImage(URL.createObjectURL(file));
        }
    }


    return (
        <div className='flex gap-8 px-9 pt-3 max-lg:flex-col justify-between'>
            <div className="flex gap-8 items-start max-lg:flex-col">

                {image ? <Image src={image} alt='' width={128} height={128} /> : <div className='bg-[#D9D9D9] rounded-lg w-32 h-32 flex justify-center items-center text-4xl font-bold'>
                    +
                </div>}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <p className='text-dark text-sm font-medium'>Profile picture</p>
                        <p className='text-lighter-text text-sm'>PNG or JPG no bigger than 800px wide and tall.</p>
                    </div>
                    <button type='button' onClick={() => ref.current!.click()} className="flex justify-center hover:bg-primary hover:text-white transition-all duration-300 ease-in-out w-fit items-center gap-1.5 rounded-lg border border-stroke text-primary px-5 py-3">
                        <BsImages />
                        <input accept='image/*' ref={ref} onChange={handleImageChange} type="file" name="image" id='imageElement' className='hidden' />
                        <p className='text-sm font-semibold'>Browse</p>
                    </button>
                </div>
                <div className="w-0.5 h-[50px] bg-stroke max-lg:hidden"></div>
                <div className="flex justify-center flex-col gap-2">
                    <label htmlFor='company-name' className='text-dark text-sm font-medium'>Name</label>
                    <input type='text' name="company-name" id="company-name" className='text-ligher-text outline-none text-sm font-medium' placeholder='Company full name' />
                </div>
            </div>
        </div>
    )
}

export default FlightAddTop
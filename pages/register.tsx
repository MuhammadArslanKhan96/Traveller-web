import Navbar from '@/components/common/Navbar'
import React, { useContext, useEffect } from 'react';
import AuthBg from '@/assets/authbg.svg'
import RegisterForm from '@/components/Auth/RegisterForm';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';

const Register = () => {
    const UserData = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (UserData?.user) {
            if (UserData?.user.role?.toLowerCase() === 'flight') {
                router.push(`/flight`);
            } else {
                router.push(`/`);
            }
        }
        //eslint-disable-next-line
    }, [UserData?.user])
    return (
        <div className='min-h-screen flex flex-col gap-y-12 pb-40 bg-no-repeat bg-cover bg-center' style={{
            backgroundImage: `url(${AuthBg.src})`
        }}>
            <Navbar color='black' className='bg-white  px-6 py-7 lg:px-[8.4rem] text-black' />
            <RegisterForm />
        </div >
    )
}

export default Register
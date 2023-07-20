import Navbar from '@/components/common/Navbar'
import AuthBg from '@/assets/authbg.svg'
import React, { useContext, useEffect } from 'react'
import LoginForm from '@/components/Auth/LoginForm';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
const Login = () => {
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
        <div className='min-h-screen flex flex-col gap-y-32 bg-cover pb-40' style={{
            backgroundImage: `url(${AuthBg.src})`
        }}>
            <Navbar color='black' className='bg-white px-6 py-4 lg:px-[8.4rem] text-black' />
            <LoginForm />
        </div>
    )
}

export default Login
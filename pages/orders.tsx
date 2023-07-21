import AdminFlightList from '@/components/Orders/AdminFlightList';
import Navbar from '@/components/common/Navbar';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const Orders = () => {
    const UserData = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!UserData?.user) {
            router.push(`/`);
        }
        //eslint-disable-next-line
    }, [UserData?.user])
    return (
        <div className='min-h-screen flex flex-col gap-y-12 bg-[#F2FBFF] pb-40'>
            <Navbar color='black' className='bg-white  px-6 py-7 lg:px-[8.4rem] text-black' />
            <AdminFlightList />
        </div>
    )
}

export default Orders
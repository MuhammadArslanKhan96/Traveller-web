import AdminFlightList from '@/components/Orders/AdminFlightList';
import Navbar from '@/components/common/Navbar';

const Orders = () => {
    return (
        <div className='min-h-screen flex flex-col gap-y-32 bg-[#F2FBFF] pb-40'>
            <Navbar color='black' className='bg-white px-6 py-4 lg:px-[8.4rem] text-black' />
            <AdminFlightList />
        </div>
    )
}

export default Orders
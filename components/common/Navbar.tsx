import Image from 'next/image'
import React, { useContext, useEffect } from 'react';
import logo from '@/assets/logo.svg';
import logoDark from '@/assets/logo-dark.svg';
import Link from 'next/link';
import { HiUser } from 'react-icons/hi'
import { useRouter } from 'next/router';
import { UserContext } from '@/context/UserContext';
import { IoMdExit } from 'react-icons/io'
import { auth } from '@/utils/firebase';

interface NavbarProps {
    className: string;
    color: string;
}


const Navbar = ({ className, color }: NavbarProps) => {
    const router = useRouter();
    let show = router.pathname === '/' || router.pathname === '/orders'
    const UserData = useContext(UserContext);


    function SignOut() {
        auth.signOut().finally(() => {
            localStorage.removeItem('rememberUser')
            UserData?.setUser(null);
        });

    }


    return (
        <div className={`flex justify-between ` + className}>
            <div className="flex lg:gap-x-16 gap-x-6 items-center">
                <Link href={'/'}>
                    <Image src={color === 'black' ? logoDark.src : logo.src} alt='' className='w-[45px] h-[25px] lg:w-full lg:h-full' width={70} height={43} /></Link>
                {show &&
                    <Link href={UserData?.user?.email ? '/orders' : '/login'}>
                        Orders
                    </Link>}
            </div>
            <div className="flex gap-x-6 items-center">
                {!UserData?.user ?
                    <>
                        <Link href={'/register'}>
                            Register
                        </Link>
                        <Link href={'/login'} className={`text-${color} hover:bg-${color} hover:text-[#008486] transition-all duration-300 ease-in-out flex items-center gap-1.5 rounded-lg border border-${color} px-2 lg:px-4 py-1 lg:py-2.5 max-md:text-sm`}>
                            <HiUser />
                            <p>Login</p>
                        </Link>
                    </>
                    :
                    <button onClick={SignOut} className={`text-${color} hover:bg-${color} hover:text-[#008486] transition-all duration-300 ease-in-out flex items-center gap-1.5 rounded-lg border border-${color} px-2 lg:px-4 py-1 lg:py-2.5 max-md:text-sm`}>
                        <IoMdExit />
                        <p>SignOut</p>
                    </button>
                }
            </div>
        </div>
    )
}

export default Navbar
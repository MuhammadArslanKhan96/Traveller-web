import { UserContext } from '@/context/UserContext';
import { auth } from '@/utils/firebase';
import { Spin } from 'antd';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React, { FormEvent, useContext } from 'react';
import { HiUser } from 'react-icons/hi';


interface FormValues {
    email?: string;
    password?: string;
    role?: string;
    terms?: string;
}
const LoginForm = () => {
    const UserData = useContext(UserContext);
    const [loading, setLoading] = React.useState(false)


    function validateAllValues({ email, password }: FormValues) {
        if (email && password) {
            if (password.length > 6) {
                return;
            } else {
                throw new Error('Password must be greater than 6!')
            }

        } else {
            throw new Error('Fill all the required fields!')
        }
    }


    async function signInUser({ email, password, role, terms }: FormValues) {
        if (email && password) {
            setLoading(true);
            await axios.get(`/api/users/get-user?email=${email}&role=${role}`).then(({ data }) => {
                signInWithEmailAndPassword(auth, email, password).then(() => {
                    if (terms) {
                        localStorage.setItem('rememberUser', role as string);
                    }
                    UserData?.setUser(data);
                })
                    .catch((error) => {
                        const errorMessage = error.message;
                        if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                            UserData?.messageApi.open({
                                type: 'error',
                                content: 'Invalid Password!',
                            });
                        }
                        if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
                            UserData?.messageApi.open({
                                type: 'error',
                                content: 'User Not Found!',
                            });
                        }
                    });

            }).catch(e => {
                console.log(e)
                UserData?.messageApi.open({
                    type: 'error',
                    content: e?.response?.data,
                });
            });
            setLoading(false);
        }
    }


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        try {
            await validateAllValues(formValues);
            signInUser(formValues)
        } catch (error: any) {
            UserData?.messageApi.open({
                type: 'error',
                content: error?.message,
            });
        }
    }
    return (
        <div className='flex justify-center'>
            <div className="flex items-center justify-center gap-2.5 min-w-[568px] max-lg:min-w-[80vw] py-10 bg-white rounded-2xl shadow-[0px_0px_35px_0px_rgba(0,0,0,0.07)]">
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-8 w-full'>
                    <div className='flex items-center text-white justify-center p-2.5 rounded-full bg-stroke'>
                        <HiUser size={34} />
                    </div>
                    <p className='text-2xl font-semibold text-primary'>Login to Existing User</p>
                    <div className="flex gap-5">
                        <div className="flex items-center gap-2.5">
                            <input type="radio" className='checked:text-primary' defaultChecked id='user' name="role" value={'User'} />
                            <label htmlFor='user' className='text-dark text-base font-medium'>User</label>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <input type="radio" className='checked:text-primary' id='flight' name="role" value={'Flight'} />
                            <label htmlFor='flight' className='text-dark text-base font-medium'>Flight</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full px-16">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className='text-dark text-base font-medium'>Email *</label>
                            <input type="email" id="email" name="email" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='example@gmail.com' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className='text-dark text-base font-medium'>Password *</label>
                            <input type="password" id="password" name="password" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='*****' />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <input type="checkbox" name="terms" id="terms" className='rounded-sm border border-primary bg-primary' />
                                <label htmlFor="terms" className='text-light-text text-xs'>Remember Login Info </label>
                            </div>
                            <div className='text-primary text-xs font-medium'>Forgot Password?</div>
                        </div>
                    </div>
                    <button disabled={loading} className="flex py-3 px-8 justify-center bg-primary rounded-lg shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)] text-white items-center gap-1">
                        {loading ?
                            <Spin />
                            :
                            <p className='text-base font-semibold'>Login</p>
                        }
                    </button>
                    <div className='text-ligher-text text-sm font-semibold'>Don&apos;t Have An Account? <Link className='text-primary' href={'/register'}>Create Account</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
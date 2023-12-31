import { FlightContext } from '@/context/FlightContext';
import { UserContext } from '@/context/UserContext';
import { auth } from '@/utils/firebase';
import { Spin } from 'antd';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React, { FormEvent, useContext } from 'react';


interface FormValues {
    name?: string;
    email?: string;
    password?: string;
    password2?: string;
    terms?: string;
    role?: string;
}

const RegisterForm = () => {
    const UserData = useContext(UserContext);
    const FlightData = useContext(FlightContext);
    const [loading, setLoading] = React.useState(false)


    function validateAllValues({ name, email, password, password2, terms }: FormValues) {
        if (name && email && password && password2) {
            if (terms) {
                if (password === password2) {
                    if (password.length > 6) {
                        return;
                    } else {
                        throw new Error('Password must be greater than 6!')
                    }
                } else {
                    throw new Error('Passwords are not same!')
                }
            } else {
                throw new Error('Please accept our terms and conditions!')
            }
        } else {
            throw new Error('Fill all the required fields!')
        }
    }


    async function signUpUser(formValues: FormValues) {
        if (formValues.email && formValues.password) {
            createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
                .then(async () => {
                    // Signed in 
                    await axios.post(`/api/users/add-user`, formValues);
                    UserData?.setUser(formValues)
                    if (formValues.role === 'Flight') {
                        FlightData?.setFlightsCompanies?.([...FlightData?.flightsCompanies, formValues])
                    }
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                        UserData?.messageApi.open({
                            type: 'error',
                            content: 'Email Already in use!',
                        });
                    }
                    setLoading(false);
                });
        }
    }


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        try {
            await validateAllValues(formValues);

            signUpUser(formValues)
        } catch (error: any) {
            UserData?.messageApi.open({
                type: 'error',
                content: error?.message,
            });
            setLoading(false);
        }
    }


    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2.5 min-w-[568px] max-lg:min-w-[80vw] py-10 bg-white rounded-2xl shadow-[0px_0px_35px_0px_rgba(0,0,0,0.07)]">
                <div className='flex flex-col items-center gap-8 w-full'>
                    <p className='text-2xl font-semibold text-primary'>Register for New User</p>
                    <div className="flex gap-5">
                        <div className="flex items-center gap-2.5">
                            <input type="radio" defaultChecked className='text-primary' id='user' name="role" value="User" />
                            <label htmlFor='user' className='text-dark text-base font-medium'>User</label>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <input type="radio" className='text-primary' id='flight' name="role" value="Flight" />
                            <label htmlFor='flight' className='text-dark text-base font-medium'>Flight</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full px-16">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className='text-dark text-base font-medium'>Name *</label>
                            <input type="text" name="name" id="name" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='Name' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className='text-dark text-base font-medium'>Email *</label>
                            <input type="email" name="email" id="email" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='example@gmail.com' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className='text-dark text-base font-medium'>Password *</label>
                            <input type="password" name="password" id="password" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='*****' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password2" className='text-dark text-base font-medium'>Confirm Password *</label>
                            <input type="password" name="password2" id="password2" className='w-full px-8 py-3 rounded-lg border border-stroke focus:outline-none' placeholder='*****' />
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="terms" id="terms" className='rounded-sm border border-primary bg-primary' />
                            <label htmlFor="terms" className='text-light-text text-xs'>I agree to the terms of service and privacy policy</label>
                        </div>
                    </div>
                    <button disabled={loading} className="flex py-3 px-8 justify-center bg-primary rounded-lg shadow-[0px_15px_20px_0px_rgba(26,151,212,0.20)] text-white items-center gap-1">
                        {loading ?
                            <Spin />
                            :
                            <p className='text-base font-semibold'>Register</p>
                        }
                    </button>
                    <div className='text-ligher-text text-sm font-semibold'>Already have an account? <Link className='text-primary' href={'/login'}>Login</Link></div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
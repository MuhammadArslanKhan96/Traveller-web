import { FlightContext } from '@/context/FlightContext';
import { User, UserContext } from '@/context/UserContext'
import '@/styles/globals.css'
import getUserOnReload from '@/utils/getUserOnReload';
import { message } from 'antd';
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [flights, setFlights] = useState<any[]>([]);
  const [flightsCompanies, setFlightsCompanies] = useState<any[]>([]);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();



  async function getUser() {
    let remember = `${localStorage.getItem('rememberUser')}`;
    if (remember !== `null`) {
      getUserOnReload(setUser, remember)
    }
  }


  async function getFlights() {
    const flights = await axios.get(`/api/flights/get-flights`);
    setFlights(flights.data);
    const flightsCompanies = await axios.get(`/api/users/get-users`);
    setFlightsCompanies(flightsCompanies.data.filter((i: User) => i.role === 'Flight'));
  }



  useEffect(() => {
    if (user) {
      if (user.role?.toLowerCase() === 'flight') {
        router.push(`/flight`);
      } else {
        router.push(`/`);
      }
    }

    //eslint-disable-next-line
  }, [user]);


  useEffect(() => {
    getUser()
    getFlights()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, messageApi }}>
      {contextHolder}
      <FlightContext.Provider value={{ flights, setFlights, flightsCompanies, setFlightsCompanies }}>
        <Component {...pageProps} />
      </FlightContext.Provider>
    </UserContext.Provider>
  )
}

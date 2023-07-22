import { createContext } from "react";
import { User } from "./UserContext";

interface FlightContextType {
  flights: any[];
  setFlights: (value: any[]) => void;
  flightsCompanies: User[];
  setFlightsCompanies?: (val: User[]) => void;
  loading?: boolean;
  setLoading?: (val: boolean) => void;
  getFlights?: any;
}

export const FlightContext = createContext<FlightContextType | null>(null);

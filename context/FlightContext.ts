import { createContext } from "react";
import { User } from "./UserContext";

interface FlightContextType {
  flights: any[];
  setFlights: (value: any[]) => void;
  flightsCompanies: User[];
  setFlightsCompanies?: (val: User[]) => void;
}

export const FlightContext = createContext<FlightContextType | null>(null);

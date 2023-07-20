import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import { User } from "@/context/UserContext";

export default async function getUserOnReload(
  setUser: (value: User) => void,
  role: string
) {
  try {
    onAuthStateChanged(auth, async function (user) {
      if (user !== null) {
        try {
          const user2 = await axios.get(
            `/api/users/get-user?role=${role}&email=${user.email}`
          );
          setUser(user2.data);
        } catch (error) {
          console.log(error?.message);
        }
      }
    });
  } catch (error) {
    console.log(error?.message);
  }
}

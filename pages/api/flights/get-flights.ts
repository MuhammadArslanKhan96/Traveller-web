import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const flights = await getDocs(collection(db, "flights"));
      res
        .status(200)
        .send(flights.docs.map((i: any) => ({ ...i.data(), id: i.id })));
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send({
      message: "Method Not Allowed!",
    });
  }
}

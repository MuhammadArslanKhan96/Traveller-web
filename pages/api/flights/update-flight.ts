import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const flight = req.body;
      await updateDoc(doc(db, "flights", req.query.id as string), flight);
      res.status(200).send("Done");
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send({
      message: "Method Not Allowed!",
    });
  }
}

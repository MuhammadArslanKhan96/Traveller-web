import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebase";
const { uuid } = require("uuidv4");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const flight = req.body;
      await setDoc(doc(db, "flights", uuid()), flight);
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

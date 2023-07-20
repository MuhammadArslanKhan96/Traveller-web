import { deleteDoc, doc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      await deleteDoc(doc(db, "flights", req.query.id as string));
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

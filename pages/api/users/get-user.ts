import { query, collection, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const user = req.query as { role: string; email: string };
      const q = query(collection(db, "Users"), where("role", "==", user.role));
      const querySnapshot = await getDocs(q);
      const docSnap = await querySnapshot.docs.filter(
        (i) => i.data().email.toLowerCase() === user.email.toLowerCase()
      )[0];
      if (!docSnap) {
        res.status(400).send("User Does not Exists!");
        return;
      }

      res.status(200).send(docSnap.data());
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send({
      message: "Method Not Allowed!",
    });
  }
}

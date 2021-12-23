import clientPromise from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db();
  const panes = db.collection("panes");
  // get all panes
  const data = await panes.find({}).toArray();
  res.json(data);
};

import { NextApiRequest, NextApiResponse } from "next";
import { paneCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const col = await paneCollection();
  // get all panes
  const data = await col.find({}).toArray();
  res.json(data);
};

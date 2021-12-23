import clientPromise from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { routeId, rawHTML } = req.body;

  const client = await clientPromise;
  const db = client.db();
  const col = db.collection("panes");

  await col.findOneAndUpdate({ routeId }, { updated_at: Date.now(), rawHTML });
  console.log("Upserted " + routeId);

  res.status(200).json({});
};

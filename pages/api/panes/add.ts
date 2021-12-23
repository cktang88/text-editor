import clientPromise from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { routeId, rawHTML } = req.body;

  const client = await clientPromise;
  const db = client.db();
  const col = db.collection("panes");

  const nowTs = Date.now();
  await col.insertOne({
    routeId,
    created_at: nowTs,
    updated_at: nowTs,
    rawHTML,
  });
  console.log("Upserted " + routeId);

  res.status(200).json({});
};

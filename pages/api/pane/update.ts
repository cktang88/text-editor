import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { paneCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { paneId, routeId, rawHTML, textContent } = JSON.parse(req.body);
  if (!paneId || !rawHTML || !textContent) {
    res.status(400).json({ error: "Invalid input format." });
    return;
  }
  const col = await paneCollection();

  let updates = { updatedAt: Date.now(), rawHTML, textContent };
  if (routeId) {
    updates = { ...updates, routeId };
  }
  await col.findOneAndUpdate({ _id: new ObjectId(paneId) }, { $set: updates });
  console.log("Upserted " + paneId);

  res.status(200).json({});
};

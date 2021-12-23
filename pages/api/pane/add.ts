import { NextApiRequest, NextApiResponse } from "next";
import { paneCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { routeId, rawHTML } = req.body;
  if (!routeId || !rawHTML) {
    res.status(400).json({ error: "Invalid input format." });
    return;
  }

  const col = await paneCollection();

  const nowTs = Date.now();
  await col.insertOne({
    routeId,
    createdAt: nowTs,
    updatedAt: nowTs,
    rawHTML,
  });

  res.status(200).json({});
};

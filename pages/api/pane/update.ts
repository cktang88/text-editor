import { NextApiRequest, NextApiResponse } from "next";
import { paneCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { paneId, routeId, rawHTML } = req.body;
  const col = await paneCollection();

  await col.findOneAndUpdate(
    { id: paneId },
    { routeId, updatedAt: Date.now(), rawHTML }
  );
  console.log("Upserted " + paneId);

  res.status(200).json({});
};

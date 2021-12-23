import { NextApiRequest, NextApiResponse } from "next";
import { folderCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { name, parentId } = req.body;
  if (!name) {
    res.status(400).json({ error: "Invalid input format." });
    return;
  }

  const col = await folderCollection();

  const nowTs = Date.now();
  await col.insertOne({
    name: name,
    parentId: parentId,
    createdAt: nowTs,
    updatedAt: nowTs,
  });

  res.status(200).json({});
};
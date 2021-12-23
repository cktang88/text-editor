import { NextApiRequest, NextApiResponse } from "next";
import { folderCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { folderId, name, parentId } = req.body;
  if (!folderId || !name || !parentId) {
    res.status(400).json({ error: "Invalid input format." });
    return;
  }

  const col = await folderCollection();

  await col.findOneAndUpdate(
    { id: folderId },
    { name, parentId, updatedAt: Date.now() }
  );
  console.log("Upserted " + folderId);

  res.status(200).json({});
};

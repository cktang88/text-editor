import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { folderCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: sanitize + validate (maybe Zod?)
  const { folderId, name, parentId } = JSON.parse(req.body);
  if (!folderId || !name || !parentId) {
    res.status(400).json({ error: "Invalid input format." });
    return;
  }

  const col = await folderCollection();

  const updates = { name, parentId, updatedAt: Date.now() };
  await col.findOneAndUpdate(
    { _id: new ObjectId(folderId) },
    { $set: updates }
  );
  console.log("Upserted " + folderId);

  res.status(200).json({});
};

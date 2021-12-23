import { NextApiRequest, NextApiResponse } from "next";
import { folderCollection } from "../../../db/collections";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const folders = await folderCollection();
  const data = await folders.find({}).toArray();
  res.json(data);
};

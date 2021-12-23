import { Collection } from "mongodb";
import clientPromise from ".";
import { Folder, Pane } from "./types";

export const folderCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("folders") as Collection<Folder>;
};

export const paneCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("panes") as Collection<Pane>;
};

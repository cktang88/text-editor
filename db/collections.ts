import clientPromise from ".";

export const folderCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("folders");
};

export const paneCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("panes");
};

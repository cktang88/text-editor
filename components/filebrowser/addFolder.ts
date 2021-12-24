export const addFolder = async (
  name: string,
  parentId: string,
  refreshFolders: () => void
) => {
  await fetch(`/api/folder/add`, {
    method: "POST",
    body: JSON.stringify({
      name,
      parentId,
    }),
  });
  refreshFolders();
};

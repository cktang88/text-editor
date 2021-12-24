import { FC, useEffect, useState } from "react";
import { Folder } from "../../interfaces";
import { useFolders } from "../hooks";
import { useHotkeys } from "react-hotkeys-hook";
import TreeView from "./TreeView";
import { mutate } from "swr";
import { TreeNode } from "./types";

const FileBrowser: FC<{ onFolderChange: (_: string) => void }> = ({
  onFolderChange,
}) => {
  const [cursor, setCursor] = useState<TreeNode>();
  const { folders, isLoading, isError } = useFolders();
  const [data, setData] = useState<TreeNode[]>([]);

  useHotkeys("ctrl+shift+", () => {
    // new folder
    console.log("new thing");
  });

  useEffect(() => {
    const tree = constructTreeFromFolders(folders);
    setData(tree);
  }, [folders]);

  const refreshFolders = () => {
    mutate("/api/folder/list", folders, true);
  };

  const onToggle = (node: TreeNode, toggled: boolean) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    onFolderChange(node.id!);
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <TreeView data={data} onToggle={onToggle} refreshFolders={refreshFolders} />
  );
};

// creates a tree structure out of folder listings
const makeNode = (f: Folder, children: TreeNode[] = []) => ({
  name: f.name,
  id: f._id,
  children,
  toggled: true,
});

// recursion :)
const getChildren = (allFolders: Folder[], myId: string): TreeNode[] =>
  allFolders
    .filter((e) => e.parentId == myId)
    .map((e) => makeNode(e, getChildren(allFolders, e._id!)));

const constructTreeFromFolders = (folders: Folder[]): TreeNode[] =>
  (folders ?? [])
    .filter((f) => !f.parentId)
    .map((f) => {
      return makeNode(f, getChildren(folders, f._id!));
    });

export default FileBrowser;

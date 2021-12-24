import { FC, useEffect, useState } from "react";
import { Folder } from "../interfaces";
import { useFolders } from "./hooks";
import { useHotkeys } from "react-hotkeys-hook";
import TreeView from "./TreeView";
import { mutate } from "swr";

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
    // creates a tree structure out of folder listings
    const makeNode = (f: Folder, children: TreeNode[] = []) => ({
      name: f.name,
      id: f._id,
      children,
      toggled: true,
    });

    // 1. add roots
    const roots: TreeNode[] = (folders ?? [])
      .filter((f) => !f.parentId)
      .map((f) => {
        // only two levels down, quick hack lol
        const children = folders
          .filter((e) => e.parentId == f._id)
          .map((e) => makeNode(e));
        return makeNode(f, children);
      });
    setData(roots);
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
    onFolderChange(node.id);
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

export type TreeNode = {
  /** The component key. If not defined, an auto - generated index is used. */
  id?: string;
  /** The name prop passed into the Header component. */
  name: string;
  /** The children attached to the node. This value populates the subtree at the specific node.Each child is built from the same basic data structure.
   *
   * Tip: Make this an empty array, if you want to asynchronously load a potential parent. */
  children?: Array<TreeNode>;
  /** Toggled flag. Sets the visibility of a node's children. It also sets the state for the toggle decorator. */
  toggled?: boolean;
  /** Active flag. If active, the node will be highlighted.The highlight is derived from the node.activeLink style object in the theme. */
  active?: boolean;
};

export default FileBrowser;

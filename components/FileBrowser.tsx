import { FC, useEffect, useState } from "react";
import { Folder } from "../interfaces";
import { useFolders } from "./hooks";

const FileBrowser: FC<{ onFolderChange: (_: string) => void }> = ({
  onFolderChange,
}) => {
  const [cursor, setCursor] = useState<TreeNode>();
  const { folders, isLoading, isError } = useFolders();
  const [data, setData] = useState<TreeNode[]>([]);
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

  return <TreeView data={data} onToggle={onToggle} />;
};

const TreeView: FC<{
  data: TreeNode[];
  onToggle: (node: TreeNode, toggled: boolean) => void;
}> = ({ data, onToggle }) => {
  return (
    <div>
      {data.map((node) => (
        <div>
          <div
            style={{
              fontWeight: node.active ? "bold" : "normal",
              fontSize: node.active ? "1.2em" : "1.1em",
              cursor: "default",
              userSelect: "none",
              margin: "5px",
              border: "1px solid #ccc",
            }}
            onClick={(e) => onToggle(node, !node.active)}
          >
            {node.name}
          </div>
          {node.children && (
            <div style={{ paddingLeft: "20px" }}>
              <TreeView data={node.children} onToggle={onToggle} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

type TreeNode = {
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

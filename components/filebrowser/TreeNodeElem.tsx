import { FC } from "react";
import { TreeNode } from "./types";

const TreeNodeElem: FC<{
  node: TreeNode;
  setAddingFolder: (_: boolean) => void;
  onToggle: (_: TreeNode, toggled: boolean) => void;
}> = ({ node, setAddingFolder, onToggle }) => (
  <div
    style={{
      cursor: "default",
      userSelect: "none",
      margin: "5px",
      border: "1px solid #ccc",
      paddingLeft: 5,
      paddingRight: 5,
      display: "flex",
      justifyContent: "space-between",
    }}
    onClick={(e) => {
      setAddingFolder(false);
      onToggle(node, !node.active);
    }}
  >
    <div
      style={{
        fontWeight: node.active ? "bold" : "normal",
        fontSize: node.active ? "1.1em" : "1em",
      }}
    >
      {node.name}
    </div>
    {node.active && (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setAddingFolder(true);
        }}
      >
        + New
      </div>
    )}
  </div>
);
export default TreeNodeElem;

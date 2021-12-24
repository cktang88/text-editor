import { FC, useState } from "react";
import { TreeNode } from "./FileBrowser";

const TreeView: FC<{
  data: TreeNode[];
  refreshFolders: () => void;
  onToggle: (node: TreeNode, toggled: boolean) => void;
}> = ({ data, refreshFolders, onToggle }) => {
  const [addingFolder, setAddingFolder] = useState(false);
  return (
    <div>
      {data.map((node) => (
        <div>
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
          <div style={{ paddingLeft: "24px" }}>
            {node.children && (
              <TreeView
                data={node.children}
                onToggle={onToggle}
                refreshFolders={refreshFolders}
              />
            )}
            {node.active && addingFolder && (
              <input
                style={{
                  fontSize: "1em",
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: "5px",
                  margin: "5px",
                }}
                autoFocus={true}
                placeholder="+ folder"
                onKeyUp={(e) => {
                  if (e.key != "Enter") {
                    return;
                  }
                  addFolder(e.currentTarget.value, node.id, refreshFolders);
                }}
              ></input>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const addFolder = async (
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

export default TreeView;

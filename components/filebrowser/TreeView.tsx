import { FC, useState } from "react";
import { addFolder } from "./addFolder";
import TreeNodeElem from "./TreeNodeElem";
import { TreeNode } from "./types";

const TreeView: FC<{
  data: TreeNode[];
  refreshFolders: () => void;
  onToggle: (_: TreeNode, toggled: boolean) => void;
}> = ({ data, refreshFolders, onToggle }) => {
  const [addingFolder, setAddingFolder] = useState(false);
  return (
    <div>
      {data.map((node) => (
        <div>
          <div style={{ paddingLeft: "24px" }}>
            <TreeNodeElem
              node={node}
              setAddingFolder={setAddingFolder}
              onToggle={onToggle}
            />
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
                  addFolder(e.currentTarget.value, node.id!, refreshFolders);
                }}
              ></input>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TreeView;

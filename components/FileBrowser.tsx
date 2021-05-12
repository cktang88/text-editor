import { useState } from "react";
import { Treebeard, TreeNode } from "react-treebeard";

const rawData = {
  name: "root",
  toggled: true,
  children: [
    {
      name: "parent",
      children: [{ name: "child1" }, { name: "child2" }],
    },
    {
      name: "loading parent",
      loading: true,
      children: [],
    },
    {
      name: "parent",
      children: [
        {
          name: "nested parent",
          children: [{ name: "nested child 1" }, { name: "nested child 2" }],
        },
      ],
    },
  ],
};

const FileBrowser = () => {
  const [data, setData] = useState(rawData);
  const [cursor, setCursor] = useState<TreeNode>();

  const onToggle = (node: TreeNode, toggled: boolean) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
  };

  return <Treebeard data={data} onToggle={onToggle} />;
};
export default FileBrowser;

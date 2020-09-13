import { FixedSizeTree as Tree } from "react-vtree";
import React, { useEffect, useMemo, useState } from "react";

const _data = {
  name: "root",
  id: 1,
  toggled: true,
  children: [
    {
      name: "example",
      children: [
        { name: "app" },
        { name: "data" },
        { name: "index" },
        { name: "styles" },
        { name: "webpack" },
      ],
    },
    // {
    //   name: "node_modules",
    //   loading: true,
    //   children: [],
    // },
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [
            { name: "decorators" },
            { name: "treebeard" },
            { name: "asdfasdf" },
            { name: "ererererer" },
          ],
        },
        { name: "index" },
      ],
    },
    {
      name: "themes",
      children: [{ name: "animations" }, { name: "default" }],
    },
    { name: "file1" },
    { name: "file2" },
    { name: "file3" },
  ],
};
const Tree = () => {
  const [data, setData] = useState(_data);
  const [cursor, setCursor] = useState(false);

  const onToggle = (node, toggled) => {
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

  return <FixedSizeTree data={data} onToggle={onToggle} />;
};

export default Tree;
